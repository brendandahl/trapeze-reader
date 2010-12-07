function ASCII85Filter() {
	var buf =  null;
	 /**
     * get the next character from the input.
     * @return the next character, or -1 if at end of stream
     */
    function nextChar() {
        // skip whitespace
        // returns next character, or -1 if end of stream
        while (buf.remaining() > 0) {
            var c = buf.get();

            if (!BaseParser.isWhiteSpace(String.fromCharCode(c))) {
                return c;
            }
        }

        // EOF reached
        return -1;
    }
	var TILDY = '~'.charCodeAt(0);
	var GT = '>'.charCodeAt(0);
	var EX = '!'.charCodeAt(0);
	var Z = 'z'.charCodeAt(0);
	var U = 'u'.charCodeAt(0);
	
	/**
     * decode the next five ASCII85 characters into up to four decoded
     * bytes.  Return false when finished, or true otherwise.
     *
     * @param baos the ByteArrayOutputStream to write output to, set to the
     *        correct position
     * @return false when finished, or true otherwise.
     */
    this.decode5 = function(baos) {
        // stream ends in ~>
        var five = new Array(5);
        var i;
        for (i = 0; i < 5; i++) {
            five[i] = nextChar();
            if (five[i] == TILDY) {
                if (nextChar() == GT) {
                    break;
                } else {
                    throw new PDFParseException("Bad character in ASCII85Decode: not ~>");
                }
            } else if (five[i] >= EX && five[i] <= U) {
                five[i] -= EX;
            } else if (five[i] == Z) {
                if (i == 0) {
                    five[i] = 0;
                    i = 4;
                } else {
                    throw new PDFParseException("Inappropriate 'z' in ASCII85Decode");
                }
            } else {
                throw new PDFParseException("Bad character in ASCII85Decode: " + five[i] + " (" + five[i] + ")");
            }
        }

        if (i > 0) {
            i -= 1;
        }

        var value =
                five[0] * 85 * 85 * 85 * 85 +
                five[1] * 85 * 85 * 85 +
                five[2] * 85 * 85 +
                five[3] * 85 +
                five[4];

        for (var j = 0; j < i; j++) {
            var shift = 8 * (3 - j);
            baos.write((value >> shift) & 0xff);
        }

        return (i == 4);
    }
	this.decode = function(stream) {
		buf = new StreamBuffer(stream);
		var baos = {
			output: [],
			write: function(b) {
				this.output.push(b);
			}
		};
		while(this.decode5(baos)) {};
		return String.fromCharCode.apply(this, baos.output);
	};
}