goog.provide("trapeze.font.PSParser");
goog.require("trapeze.font.Type1Font");
/**
 * PostScript reader (not a parser, as the name would seem to indicate).
 */
/**
 * create a PostScript reader given some data and an initial offset
 * into that data.
 * @param data the bytes of the postscript information
 * @param start an initial offset into the data
 */
trapeze.font.PSParser = function(data, start) {

	this.data = data;
	this.loc = start;

	/**
	 * get the next postscript "word".  This is basically the next
	 * non-whitespace block between two whitespace delimiters.
	 * This means that something like " [2 4 53]" will produce
	 * three items, while " [2 4 56 ]" will produce four.
	 */
	this.readThing = function() {
		// skip whitespace
		while (this.isWhiteSpace(data[this.loc])) {
			this.loc++;
		}
		// read thing
		var start = this.loc;
		var s = "";
		while (!this.isWhiteSpace(data[this.loc])) {
			s += String.fromCharCode(data[this.loc]);
			this.loc++;
			if (!this.isRegularCharacter(data[this.loc])) {
				break;  // leave with the delimiter included
			}
		}
		//	    System.out.println("Read: "+s);
		return s;
	}

	/**
	 * read a set of numbers from the input.  This method doesn't
	 * pay any attention to "[" or "]" delimiters, and reads any
	 * non-numeric items as the number 0.
	 * @param count the number of items to read
	 * @return an array of count floats
	 */
	this.readArray = function(count) {
		var ary = []; //new float[count];
		var idx = 0;
		while (idx < count) {
			var thing = this.readThing();
			if (thing.charAt(0) == '[') {
				thing = thing.substring(1);
			}
			if (thing.charAt(thing.length - 1) == "]") {
				thing = thing.substring(0, thing.length - 1);
			}
			if (thing.length > 0) {
				ary[idx++] = parseFloat(thing);
			}
		}
		return ary;
	}

	/**
	 * get the current location within the input stream
	 */
	this.getLoc = function() {
		return this.loc;
	}

	/**
	 * set the current location within the input stream
	 */
	this.setLoc = function(loc) {
		this.loc = loc;
	}

	/**
	 * treat the next n bytes of the input stream as encoded
	 * information to be decrypted.
	 * @param n the number of bytes to decrypt
	 * @param key the decryption key
	 * @param skip the number of bytes to skip at the beginning of the
	 * decryption
	 * @return an array of decrypted bytes.  The length of the array
	 * will be n-skip.
	 */
	this.getNEncodedBytes = function(n, key, skip) {
		var result = trapeze.font.Type1Font.decrypt(this.data, this.loc, this.loc + n, key, skip);
		this.loc += n;
		return result;
	}
	/**
     * return true if the character is neither a whitespace or a delimiter.
     *
     * @param c the character to test
     * @return boolean
     */
    this.isRegularCharacter = function(c) {
        return !(this.isWhiteSpace(c) || this.isDelimiter(c));
    }
	/**
     * Is the argument a delimiter according to the PDF spec?<p>
     *
     * ISO 32000-1:2008 - Table 2
     *
     * @param c the character to test
     */
    this.isDelimiter = function(c) {
        c = String.fromCharCode(c);
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
     * Is the argument a white space character according to the PDF spec?.
     * ISO Spec 32000-1:2008 - Table 1
     */
    this.isWhiteSpace = function(c) {
        c = String.fromCharCode(c);
		switch (c) {
            //case NUL_CHAR:  // Null (NULL)
            case '\t':      // Horizontal Tab (HT)
            case '\n':      // Line Feed (LF)
            //case FF_CHAR:   // Form Feed (FF)
            case '\r':      // Carriage Return (CR)
            case ' ':       // Space (SP)
                return true;
            default:
                return false;
        }
    }
}