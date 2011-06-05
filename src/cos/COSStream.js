goog.provide("trapeze.cos.COSStream");
goog.require("trapeze.filter.FilterManager");
goog.require("trapeze.PDFStreamParser");
goog.require("trapeze.PDFImage");
goog.require("trapeze.cos.COSName");
goog.require("trapeze.cos.COSArray");
trapeze.cos.COSStream = function(dictionary, file) {
	this.dictionary = dictionary;
	this.file = file;
};
trapeze.cos.COSStream.prototype = {
	decode: function() {
		var value = this.dictionary.getItem("Filter");
		var filters = [];
		var params = [];
		if(value == null) {// Assume there is no filter
			filters.push('NoFilter');
		} else {
			if(value instanceof trapeze.cos.COSName) {
				filters.push(value.name);
				params.push(this.dictionary.getDictionaryObject('DecodeParms'));
			} else if(value instanceof trapeze.cos.COSArray) {
				var paramsArray = this.dictionary.getDictionaryObject('DecodeParms');
				for(var i = 0; i < value.size(); i++) {
					filters.push(value.getObject(i).name);
					if(paramsArray != null)
						params.push(paramsArray.getObject(i));
				}
			} else {
				throw "Bad COS type for filter name";
			}
		}
		var buf = this.file;
		for(var i = 0; i < filters.length; i++) {
			var filterName = filters[i];
			var filter = trapeze.filter.FilterManager.getFilter(filterName);
			buf = filter.decode(buf, params[i]);
		}
		return buf;
	},
	/**
     * This will get all the tokens in the stream.
     *
     * @return All of the tokens in the stream.
     *
     * @throws IOException If there is an error parsing the stream.
     */
    getStreamTokens: function() {
        var parser = new trapeze.PDFStreamParser( this );
        parser.parse();
        return parser.getTokens();
    },
	toString: function(depth) {
		depth = depth || 0;
		return "\t".repeat(depth) + "COSStream:";
	},
	getImageString: function(resources, graphics) {
		/*
		 * For now I'll cache the image in case its used multiple times.
		 */
		if(this.cache == null) {
			var filterType = this.dictionary.getDictionaryObject('Filter').name;
			if(filterType == 'DCTDecode') { // Jpeg Image
				this.cache = 'data:image/jpeg;base64,' + base64.encode(this.file);
			} else if(filterType == 'FlateDecode'  || filterType == "Fl") {
				this.cache = trapeze.PDFImage.create(this, resources, graphics).getImageString();
			} else {
				console.error("Uknown filter type for image '" + filterType + "'");
				this.cache = "";
			}
		}
		return this.cache;
	}
};