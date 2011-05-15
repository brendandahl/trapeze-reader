goog.require("trapeze.cos.COSString");
goog.require("trapeze.cos.COSBoolean");
goog.require("trapeze.cos.COSDictionary");
goog.require("trapeze.cos.COSName");
goog.require("trapeze.cos.COSNull");
goog.require("trapeze.cos.COSNumber");
goog.require("trapeze.cos.COSObject");

function BaseParser() {
}

BaseParser.prototype.parseCOSStream = function(dictionary) {
	// Strip off any new line stuff before the string
	this.stream.readLine();
	/*
	 * For some reason we can't just use substring to
	 * get the stream contents for images.  The beginning of the
	 * string gets screwed up in FF, so we have to read char by char.
	 * TODO look into fixing this, may be possible to fix the first
	 * few chars.
	 */
	var length = dictionary.getDictionaryObject('Length').value;
	var streamText = "";
	var start = this.stream.getPosition();
	var offset = start + length;
	for(var i = start; i < offset; i++) {
		streamText += this.stream.read();
	}
	var cosStream = new COSStream(dictionary, streamText);
	
	return cosStream;
};

/**
 * This will parse a PDF dictionary.
 *
 * @return The parsed dictionary.
 *
 * @throws IOException IF there is an error reading the stream.
 */
BaseParser.prototype.parseCOSDictionary = function() {
	// Make sure we start with <<
	var c = this.stream.read();
	if(c != "<")
		throw "Expecting '<'";
	var c = this.stream.read();
	if(c != "<")
		throw "Expecting '<'";
		
	this.skipSpaces();
	var obj = new trapeze.cos.COSDictionary();
	var done = false;
	while( !done )
	{
		this.skipSpaces();
		c = this.stream.read();
		if( c == '>')
		{
			done = true;
		} 
		else 
			if(c != '/') 
			{
				//an invalid dictionary, we are expecting
				//the key, read until we can recover
				console.warn("invalid dicitonary expected '/' found '" + c + "'");
			}
			else
			{
				var key = this.parseCOSName();
				var value = this.parseCOSDictionaryValue();
				this.skipSpaces();

				if( value == null )
				{
					console.warn("Bad Dictionary Declaration. Key: " + key.name);
					//throw new Exception();
				}
				else
				{
					obj.setItem( key, value );
				}
			}
	}
	var ch = this.stream.read();
	if( ch != '>' )
	{
		throw new IOException( "expected='>' actual='" + ch + "'" );
	}
	return obj;
};
BaseParser.prototype.parseCOSDictionaryValue = function() {
	var retval = null;
	var number = this.parseDirObject();
	this.skipSpaces();
	var next = this.stream.peek();
	if( next >= '0' && next <= '9' )
	{
		var generationNumber = this.parseDirObject();
		this.skipSpaces();
		var r = this.stream.read();
		if( r != 'R' )
		{
			throw "Expected='R' actual='" + r + "'";
		}
		var key = new COSObjectKey(number.value, generationNumber.value);
		retval = this.document.getObjectFromPool(key);
	}
	else
	{
		retval = number;
	}
	return retval;
};
/**
 * This will parse a PDF array object.
 * The [ is already read
 *
 * @return The parsed PDF array.
 *
 */
BaseParser.prototype.parseCOSArray = function() {
	var po = new COSArray();
	var pbo = null;
	this.skipSpaces();
	var i = this.stream.peek();
	while( (i != ']') && this.stream.hasRemaining() )
	{
		pbo = this.parseDirObject();
		
		if( pbo instanceof trapeze.cos.COSObject )
		{
			// We have to check if the expected values are there or not PDFBOX-385 
			if (po.get(po.size() - 1) instanceof trapeze.cos.COSNumber)
			{
				var genNumber = po.remove();
				if (po.get(po.size() - 1) instanceof trapeze.cos.COSNumber)
				{
					var number = po.remove();
					var key = new COSObjectKey(number.value, genNumber.value);
					pbo = this.document.getObjectFromPool(key);
				}
				else 
				{
					// the object reference is somehow wrong
					pbo = null;
				}
			}
			else 
			{
				pbo = null;
			}
		}
		if( pbo != null )
		{
			po.add( pbo );
		}
		else
		{
			console.warn("Corrupt object reference" );
			//it could be a bad object in the array which is just skipped
		}
		this.skipSpaces();
		i = this.stream.peek();
	}
	this.stream.read(); //read ']'
	this.skipSpaces();
	return po;
};

/**
 * read a name (sequence of non-PDF-delimiting characters) from the
 * stream.
 */
BaseParser.prototype.parseCOSName = function() {
	var c;
	var sb = "";
	while (this.stream.getPosition() < this.stream.getLimit() && this.isRegularCharacter(c = this.stream.read())) {
		sb += c;
	}
	this.stream.rewindOne();
	return new trapeze.cos.COSName(sb);
}
BaseParser.prototype.parseCOSNumber = function() {
	var c = this.stream.read();
	var neg = c == '-';
	var sawdot = c == '.';
	var dotmult = sawdot ? 0.1 : 1;
	var value = (c >= '0' && c <= '9') ? c - '0' : 0;
	while (true) {
		c = this.stream.read();
		if (c == '.') {
			if (sawdot) {
				this.stream.setPosition(this.stream.getPosition() - 1);
				break;
			}
			sawdot = true;
			dotmult = 0.1;
		} else if (c >= '0' && c <= '9') {
			var val = c - '0';
			if (sawdot) {
				value += val * dotmult;
				dotmult *= 0.1;
			} else {
				value = value * 10 + val;
			}
		} else {
		   this.stream.setPosition(this.stream.getPosition() - 1);
			break;
		}
	}
	if (neg) {
		value = -value;
	}
	return new trapeze.cos.COSNumber(value);
}
	/**
 * <p>read a String from the stream.  Strings begin with a '('
 * character, which has already been read, and end with a balanced ')'
 * character.  A '\' character starts an escape sequence of up
 * to three octal digits.</p>
 *
 * <p>Parenthesis must be enclosed by a balanced set of parenthesis,
 * so a string may enclose balanced parenthesis.</p>
 *
 * @return the string with escape sequences replaced with their
 * values
 */
BaseParser.prototype.parseCOSString = function() {
	var parenLevel = 0;
	var sb = "";
	var openBrace = this.stream.read();
	var closeBrace;
	if(openBrace == '(')	
		closeBrace = ')';
	else
		closeBrace = '>';
		
	while (this.stream.getPosition() < this.stream.getLimit()) {
		var c = this.stream.read();
		if (c == closeBrace) {
			if (parenLevel-- == 0) {
				break;
			}
		} else if (c == openBrace) {
			parenLevel++;
		} else if (c == '\\') {
			// escape sequences
			c = this.stream.read();
			if (c >= '0' && c <= '9') {
				var count = 0;
				var val = 0;
				var zero = '0'.charCodeAt(0);
				while (c >= '0' && c <= '9' && count < 3) {
					val = val * 8 + c.charCodeAt(0) - zero;
					c = this.stream.read();
					count++;
				}
				this.stream.rewindOne();
				c = String.fromCharCode(val);
			} else if (c == 'n') {
				c = '\n';
			} else if (c == 'r') {
				c = '\r';
			} else if (c == 't') {
				c = '\t';
			} else if (c == 'b') {
				c = '\b';
			} else if (c == 'f') {
				c = '\f';
			} else if (c == '\\') {
				c = '\\';
			} else if (c == '(') {
				c = '(';
			} else if (c == ')') {
				c = ')';
			} else if (c == '<') {
				c = '<';
			} else if (c == '>') {
				c = '>';
			}
		}
		sb += c;
	}
	if(openBrace == '<')
		return trapeze.cos.COSString.createFromHexString(sb);
	else
		return new trapeze.cos.COSString(sb);
}
BaseParser.prototype.skipSpaces = function() {
	if(!this.stream.hasRemaining())
		return;
	var c = this.stream.read();
	
	while(this.isWhiteSpace(c) || c == '%') {
		if(c == '%') {
			
			// skip comments
			var comment = "";
			while (this.stream.hasRemaining() && c != '\n') {
				comment += c;
				c = this.stream.read();
			}
			if (this.stream.hasRemaining()) {
				c = this.stream.read();      // eat the newline
				if (c == '\r') {
					c = this.stream.read();  // eat a following return
				}
			}
			//console.log("Read comment: " + comment);
		} else {
			if(!this.stream.hasRemaining())
				return;
			c = this.stream.read();
		}
	}
	this.stream.rewindOne();
}
/**
 * read a floating point number from the stream
 */
BaseParser.prototype.readNum = function() {
	var c = this.stream.read();
	var neg = c == '-';
	var sawdot = c == '.';
	var dotmult = sawdot ? 0.1 : 1;
	var value = (c >= '0' && c <= '9') ? c - '0' : 0;
	while (true) {
		c = this.stream.read();
		if (c == '.') {
			if (sawdot) {
				this.stream.setPosition(this.stream.getPosition() - 1);
				break;
			}
			sawdot = true;
			dotmult = 0.1;
		} else if (c >= '0' && c <= '9') {
			var val = c - '0';
			if (sawdot) {
				value += val * dotmult;
				dotmult *= 0.1;
			} else {
				value = value * 10 + val;
			}
		} else {
			this.stream.setPosition(this.stream.getPosition() - 1);
			break;
		}
	}
	if (neg) {
		value = -value;
	}
	return value;
}
/**
 * Is the argument a white space character according to the PDF spec?.
 * ISO Spec 32000-1:2008 - Table 1
 */
BaseParser.prototype.isWhiteSpace = function(c) {
	switch (c) {
		case ' ':	// Space (SP)
		case '\n':	// Line Feed (LF)
		case '\r':	// Carriage Return (CR)
		case '\0':  // Null (NULL)
		case '\t':	// Horizontal Tab (HT)
		case '\f':	// Form Feed (FF)
			return true;
		default:
			return false;
	}
}


BaseParser.prototype.readString = function() {
	this.skipSpaces();
	var c;
	var sb = "";
	while (this.stream.getPosition() < this.stream.getLimit() && this.isRegularCharacter(c = this.stream.read())) {
		sb += c;
	}
	if(this.stream.getPosition() < this.stream.getLimit())
		this.stream.rewindOne();
	return sb;
}
BaseParser.prototype.parseDirObject = function() {
	this.skipSpaces();
	var c = this.stream.read();
	var peek = this.stream.peek();
	if (c == '[') {
		return this.parseCOSArray();
	} else if (c == '(') {
		this.stream.rewindOne();
		return this.parseCOSString();
	} else if (c == '<' && peek == '<') {
		this.stream.rewindOne();
		return this.parseCOSDictionary();
	} else if (c == '<') {
		this.stream.rewindOne();
		return this.parseCOSString();
	} else if (c == '/') {
		return this.parseCOSName();
	} else if(c == 'R') {
		return new trapeze.cos.COSObject(null);
	} else if (c == '.' || c == '-' || (c >= '0' && c <= '9')) {
		this.stream.rewindOne();
		return this.parseCOSNumber();
	} else if(c == 'n') {
		var st = this.readString();
		if(st != 'ull')
			throw "Expecting null string found " + st;
		return trapeze.cos.COSNull.NULL;
	} else if(c == 't') {
		var st = this.readString();
		if(st != 'rue')
			throw "Expecting null string found " + st;
		return trapeze.cos.COSBoolean.TRUE;
	} else if(c == 'f') {
		var st = this.readString();
		if(st != 'alse')
			throw "Expecting null string found " + st;
		return trapeze.cos.COSBoolean.FALSE;
	}
	return null;
	var d = c + this.stream.read(5);
	console.warn(d);
	// Shouldn't reach here.  So grab the next 5 tokens so we can
	// see what we're really trying to parse
	throw "Unable to parse object. Found token: " + d;
};
	/**
 * return true if the character is neither a whitespace or a delimiter.
 *
 * @param c the character to test
 * @return boolean
 */
BaseParser.prototype.isRegularCharacter = function(c) {
	return !(this.isWhiteSpace(c) || this.isDelimiter(c));
}
/**
 * Is the argument a delimiter according to the PDF spec?<p>
 *
 * ISO 32000-1:2008 - Table 2
 *
 * @param c the character to test
 */
BaseParser.prototype.isDelimiter = function(c) {
	switch (c) {
		case '(':   // LEFT PARENTHESIS
		case ')':   // RIGHT PARENTHESIS
		case '<':   // LESS-THAN-SIGN
		case '>':   // GREATER-THAN-SIGN
		case '[':   // LEFT SQUARE BRACKET
		case ']':   // RIGHT SQUARE BRACKET
		case '{':   // LEFT CURLY BRACKET
		case '}':   // RIGHT CURLY BRACKET
		case '/':   // SOLIDUS
		case '%':   // PERCENT SIGN
			return true;
		default:
			return false;
	}
}
/**
 * Determine if a character terminates a PDF name.
 *
 * @param ch The character
 * @return <code>true</code> if the character terminates a PDF name, otherwise <code>false</code>.
 */
BaseParser.prototype.isEndOfName = function(ch) {
	return (ch == ' ' || ch == '\r'	|| ch == '\n' || ch == '\t' || ch == '>' || ch == '<'
		|| ch == '[' || ch =='/' || ch ==']' || ch ==')' || ch =='(' ||
		ch == -1 //EOF
	);
}

/**
 * Is the argument a white space character according to the PDF spec?.
 * ISO Spec 32000-1:2008 - Table 1
 */
BaseParser.isWhiteSpace = function(c) {
	switch (c) {
		case ' ':	// Space (SP)
		case '\n':	// Line Feed (LF)
		case '\r':	// Carriage Return (CR)
		case '\0':  // Null (NULL)
		case '\t':	// Horizontal Tab (HT)
		case '\f':	// Form Feed (FF)
			return true;
		default:
			return false;
	}
}