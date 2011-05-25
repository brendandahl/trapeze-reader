goog.provide("trapeze.PDFObject");
trapeze.PDFObject = function(type, object) {
	if(typeof(type) == 'undefined')
		throw new Exception("Undefined type");
	this.type = type;
	this.object = object;
}
trapeze.PDFObject.prototype = {
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
			return "\t".repeat(depth) + "PDFObject(" + trapeze.PDFObject.TYPE_MAP[this.type] + "):";
	}
}
/** an indirect reference*/
trapeze.PDFObject.INDIRECT = 0;      // PDFXref
/** a Boolean */
trapeze.PDFObject.BOOLEAN = 1;      // Boolean
/** a Number, represented as a double */
trapeze.PDFObject.NUMBER = 2;       // Double
/** a String */
trapeze.PDFObject.STRING = 3;       // String
/** a special string, seen in PDF files as /Name */
trapeze.PDFObject.NAME = 4;         // String
/** an array of PDFObjects */
trapeze.PDFObject.ARRAY = 5;        // Array of PDFObject
/** a Hashmap that maps String names to PDFObjects */
trapeze.PDFObject.DICTIONARY = 6;   // HashMap(String->PDFObject)
/** a Stream: a Hashmap with a byte array */
trapeze.PDFObject.STREAM = 7;        // HashMap + byte[]
/** the NULL object (there is only one) */
trapeze.PDFObject.NULL = 8;         // null
/** a special PDF bare word, like R, obj, true, false, etc */
trapeze.PDFObject.KEYWORD = 9;      // String

trapeze.PDFObject.TYPE_MAP = ['INDIRECT', 'BOOLEAN', 'NUMBER', 'STRING', 'NAME', 'ARRAY', 'DICTIONARY', 'STREAM', 'NULL', 'KEYWORD'];

trapeze.PDFObject.TRUE_OBJECT = new trapeze.PDFObject(PDFObject.BOOLEAN, true);
trapeze.PDFObject.FALSE_OBJECT = new trapeze.PDFObject(PDFObject.BOOLEAN, false);
trapeze.PDFObject.NULL_OBJECT = new trapeze.PDFObject(PDFObject.NULL, null);