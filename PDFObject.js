function PDFObject(type, object) {
	if(typeof(type) == 'undefined')
		throw new Exception("Undefined type");
	this.type = type;
	this.object = object;
}
PDFObject.prototype = {
	getBooleanValue: function() {
		if(this.type == 0) {
			return this.dereference().getBooleanValue();
		}
		return this.object;
	},
	getIntValue: function() {
		if(this.type == 0) {
			return this.dereference().getIntValue();
		}
		return this.object;
	},
	is: function(type) {
		if(this.type == 0) {
			return this.dereference().is();
		}
		return this.type == type;
	},
	toString: function(depth) {
		depth = depth || 0;
		if(this.object != null)
			return "\t".repeat(depth) + "PDFObject(" + PDFObject.TYPE_MAP[this.type] + "):";
	}
}
/** an indirect reference*/
PDFObject.INDIRECT = 0;      // PDFXref
/** a Boolean */
PDFObject.BOOLEAN = 1;      // Boolean
/** a Number, represented as a double */
PDFObject.NUMBER = 2;       // Double
/** a String */
PDFObject.STRING = 3;       // String
/** a special string, seen in PDF files as /Name */
PDFObject.NAME = 4;         // String
/** an array of PDFObjects */
PDFObject.ARRAY = 5;        // Array of PDFObject
/** a Hashmap that maps String names to PDFObjects */
PDFObject.DICTIONARY = 6;   // HashMap(String->PDFObject)
/** a Stream: a Hashmap with a byte array */
PDFObject.STREAM = 7;        // HashMap + byte[]
/** the NULL object (there is only one) */
PDFObject.NULL = 8;         // null
/** a special PDF bare word, like R, obj, true, false, etc */
PDFObject.KEYWORD = 9;      // String

PDFObject.TYPE_MAP = ['INDIRECT', 'BOOLEAN', 'NUMBER', 'STRING', 'NAME', 'ARRAY', 'DICTIONARY', 'STREAM', 'NULL', 'KEYWORD'];

PDFObject.TRUE_OBJECT = new PDFObject(PDFObject.BOOLEAN, true);
PDFObject.FALSE_OBJECT = new PDFObject(PDFObject.BOOLEAN, false);
PDFObject.NULL_OBJECT = new PDFObject(PDFObject.NULL, null);