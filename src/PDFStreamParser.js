function PDFStreamParser(stream) {
	var streamText = stream.decode();
	this.stream = new StreamBuffer(streamText);
	//console.log("stream");
	//console.log(streamText);
	this.streamObjects = [];
}
extend(PDFStreamParser, BaseParser);

/**
 * This will parse the tokens in the stream.  This will close the
 * stream when it is finished parsing.
 *
 * @throws IOException If there is an error while parsing the stream.
 */
PDFStreamParser.prototype.parse = function() {
	var token = null;
	while( (token = this.parseNextToken()) != null )
	{
		this.streamObjects.push( token );
		//logger().fine( "parsed=" + token );
	}
}
PDFStreamParser.prototype.getTokens = function() {
	return this.streamObjects;
};
/**
 * This will parse the next token in the stream.
 *
 * @return The next token in the stream or null if there are no more tokens in the stream.
 *
 * @throws IOException If an io error occurs while parsing the stream.
 */
PDFStreamParser.prototype.parseNextToken = function() {
	var retval = null;
	if(this.stream.getPosition() >= this.stream.getLimit())
		return null;
	this.skipSpaces();
	var nextByte = this.stream.peek();
	if( nextByte == -1 )
	{
		return null;
	}
	var c = nextByte;
	switch(c)
	{
		case '<':
		{
			var leftBracket = this.stream.read();//pull off first left bracket
			c = this.stream.peek(); //check for second left bracket
			this.stream.rewindOne(); //put back first bracket
			if(c == '<')
			{
				var pod = this.parseCOSDictionary();
				this.skipSpaces();
				if(this.stream.peek() == 's')
				{
					retval = this.parseCOSStream( pod, file );
				}
				else
				{
					retval = pod;
				}
			}
			else
			{
				retval = this.parseCOSString();
			}
			break;
		}
		case '[': // array
		{
			this.stream.read();
			retval = this.parseCOSArray();
			break;
		}
		case '(': // string
			retval = this.parseCOSString();
			break;
		case '/':   // name
			this.stream.read();
			retval = this.parseCOSName();
			break;
		case 'n':   // null
		{
			var nullString = this.readString();
			if( nullString == "null" )
			{
				retval = new COSNull();
			}
			else
			{
				retval = PDFOperator.getOperator( nullString );
			}
			break;
		}
		case 't':
		case 'f':
		{
			var next = this.readString();
			if( next == "true" )
			{
				retval = COSBoolean.TRUE;
				break;
			}
			else if( next == "false" )
			{
				retval = COSBoolean.FALSE;
			}
			else
			{
				retval = PDFOperator.getOperator( next );
			}
			break;
		}
		case 'R':
		{
			var line = this.readString();
			if( line == "R" )
			{
				retval = new COSObject( null );
			}
			else
			{
				retval = PDFOperator.getOperator( line );
			}
			break;
		}
		case '0':
		case '1':
		case '2':
		case '3':
		case '4':
		case '5':
		case '6':
		case '7':
		case '8':
		case '9':
		case '-':
		case '+':
		case '.':
		{
			// We will be filling buf with the rest of the number.  Only
			// allow 1 "." and "-" and "+" at start of number. 
			var buf = "";
			buf += ( c );
			this.stream.read();

			var dotNotRead = (c != '.');
			while( isDigit(( c = this.stream.peek()) ) || (dotNotRead && (c == '.')) )
			{
				buf += c;
				this.stream.read();

				if (dotNotRead && (c == '.'))
				{
					dotNotRead = false;
				}
			}
			retval = new COSNumber( buf );
			break;
		}
		case 'B':
		{
			var next = this.readString();
			retval = PDFOperator.getOperator( next );

			if(next == "BI")
			{

				var image = this.parseInlineImage();
				retval = image;
			}
			break;
		}
		case ']':
		{
			// some ']' around without its previous '['
			// this means a PDF is somewhat corrupt but we will continue to parse.
			this.stream.read();
			retval = COSNull.NULL;  // must be a better solution than null...
			break;
		}
		default:
		{
			//we must be an operator
			var operator = this.readOperator();
			if( operator.length == 0 )
			{
				//we have a corrupt stream, stop reading here
				retval = null;
			}
			else
			{
				retval = PDFOperator.getOperator( operator );
			}
		}

	}

	return retval;
}
PDFStreamParser.prototype.parseInlineImage = function() {
	// build dictionary until ID, then read image until EI
	var hm = {};
	while (true) {
		var t = this.parseNextToken();
		if(t instanceof PDFOperator && t.operator == "ID") {
			break;
		}
		// it should be a name;
		var name = t.name;
		//debug("ParseInlineImage, token: " + name, 1000);
		if (name == "BPC") {
			name = "BitsPerComponent";
		} else if (name == "CS") {
			name = "ColorSpace";
		} else if (name == "D") {
			name = "Decode";
		} else if (name == "DP") {
			name = "DecodeParms";
		} else if (name == "F") {
			name = "Filter";
		} else if (name == "H") {
			name = "Height";
		} else if (name == "IM") {
			name = "ImageMask";
		} else if (name == "W") {
			name = "Width";
		} else if (name  == "I") {
			name = "Interpolate";
		}
		var vobj = this.parseNextToken();
		hm[name] = vobj;
	}
	var loc = this.stream.getPosition()
	if (this.stream.readAt(loc) == "\r") {
		loc++;
	}
	if (this.stream.readAt(loc) == "\n" || this.stream.readAt(loc) == ' ') {
		loc++
	}

	var imObj = hm["ImageMask"];
	if(imObj != null && imObj == COSBoolean.TRUE) {
		// [PATCHED by michal.busta@gmail.com] - default value according to PDF spec. is [0, 1]
		// there is no need to swap array - PDF image should handle this values
		var decode = [0, 1];

		var decodeObj = hm.get["Decode"];
		if (decodeObj != null) {
			decode[0] = decodeObj.getObject(0).value;
			decode[1] = decodeObj.getObject(1).value;
		}

		hm["Decode"] = decode;
	}

	
	var dstart = loc;
	// now skip data until a whitespace followed by EI
	while (!this.isWhiteSpace(this.stream.readAt(loc)) ||
			this.stream.readAt(loc + 1) != 'E' ||
			this.stream.readAt(loc + 2) != 'I') {
		loc++;
	}

	// data runs from dstart to loc
	// TODO this is similar to in the base parser when i copy all the stream text i could probably just make cost stream support having
	// a stream passed to it.
	var streamText = "";
	for(var i = dstart; i < loc; i++) {
		streamText += this.stream.readAt(i);
	}

	var obj = new COSStream(new COSDictionary(hm), streamText);
	loc += 1;
	this.stream.setPosition(loc);
	return obj;
}
/**
 * This will read an operator from the stream.
 *
 * @return The operator that was read from the stream.
 *
 * @throws IOException If there is an error reading from the stream.
 */
PDFStreamParser.prototype.readOperator = function() {
	this.skipSpaces();
	var buffer = "";
	var c = this.stream.peek();
	while(
		c != -1 &&
		!this.isWhiteSpace(c) &&
		c != ']' &&
		c != '[' &&
		c != '<' &&
		c != '(' &&
		c != '/' &&
		(c < '0' || c > '9' ) 
	)
	{
		buffer += this.stream.read();
		c = this.stream.peek();
	}
	return buffer;
}