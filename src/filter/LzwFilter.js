goog.provide("trapeze.filter.LzwFilter");
goog.require("trapeze.StreamBuffer");
trapeze.filter.LzwFilter = function() {
	var buf;
	var bytepos;
	var bitpos;
	var dict = new Array(4096);
	var dictlen = 0;
	var bitspercode = 9;
	var STOP = 257;
	var CLEARDICT = 256;
	for (var i = 0; i < 256; i++) {
		dict[i] = new Array(1);
		dict[i][0] = i;
	}
	dictlen = 258;
	bitspercode = 9;
	bytepos = 0;
	bitpos = 0;
	
	this._nextCode = function() {
		var fillbits = bitspercode;
        var value = 0;
        if (bytepos >= buf.getLimit() - 1) {
            return -1;
        }
        while (fillbits > 0) {
            var nextbits = buf.getAt(bytepos);  // bitsource
            var bitsfromhere = 8 - bitpos;  // how many bits can we take?
            if (bitsfromhere > fillbits) { // don't take more than we need
                bitsfromhere = fillbits;
            }
            value |= ((nextbits >> (8 - bitpos - bitsfromhere)) &
                    (0xff >> (8 - bitsfromhere))) << (fillbits - bitsfromhere);
            fillbits -= bitsfromhere;
            bitpos += bitsfromhere;
            if (bitpos >= 8) {
                bitpos = 0;
                bytepos++;
            }
        }
        return value;
	};
	this._resetDict = function() {
		dictlen = 258;
        bitspercode = 9;
	};
	this.decode = function(stream) {
		buf = new trapeze.StreamBuffer(stream);
		
		// algorithm derived from:
        // http://www.rasip.fer.hr/research/compress/algorithms/fund/lz/lzw.html
        // and the PDFReference
        var cW = CLEARDICT;
        var baos = {
			output: [],
			write: function(b, offset, length) {
				for(var i = offset; i < (offset + length); i++) {
					this.output.push(b[i]);
				}
			}
		};
		function arrayCopy(src, srcPos, dest, destPos, len) {
			for(var i = 0; i < len; i++) {
				dest[destPos + i] = src[srcPos + i];
			}
		}
        while (true) {
            var pW = cW;
            cW = this._nextCode();
            if (cW == -1) {
                throw new PDFParseException("Missed the stop code in LZWDecode!");
            }
            if (cW == STOP) {
                break;
            } else if (cW == CLEARDICT) {
                this._resetDict();
            } else if (pW == CLEARDICT) {
                baos.write(dict[cW], 0, dict[cW].length);
            } else {
                if (cW < dictlen) {  // it's a code in the dictionary
                    baos.write(dict[cW], 0, dict[cW].length);
                    var p = new Array(dict[pW].length + 1);
                    arrayCopy(dict[pW], 0, p, 0, dict[pW].length);
                    p[dict[pW].length] = dict[cW][0];
                    dict[dictlen++] = p;
                } else {
                    var p = new Array(dict[pW].length + 1);
                    arrayCopy(dict[pW], 0, p, 0, dict[pW].length);
                    p[dict[pW].length] = p[0];
                    baos.write(p, 0, p.length);
                    dict[dictlen++] = p;
                }
                if (dictlen >= (1 << bitspercode) - 1 && bitspercode < 12) {
                    bitspercode++;
                }
            }
        }
        return String.fromCharCode.apply(this, baos.output);
	};
}