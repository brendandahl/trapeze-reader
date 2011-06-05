goog.provide("trapeze.cos.COSStreamArray");
goog.require("trapeze.PDFStreamParser");
trapeze.cos.COSStreamArray = function(base) {
	this.streams = base;
	
	this.decode = function() {
		var out = "";
		for(var i = 0; i < this.streams.size(); i++) {
			out += this.streams.getObject(i).decode();
		}
		return out;
	};
	this.getStreamTokens = function() {
		var parser = new trapeze.PDFStreamParser( this );
        parser.parse();
        return parser.getTokens();
	};
};
