function COSStream(dictionary, file) {
	this.dictionary = dictionary;
	this.file = file;
}
COSStream.prototype = {
	decode: function() {
		var value = this.dictionary.getItem("Filter");
		var filters = [];
		var params = [];
		if(value == null) {// Assume there is no filter
			filters.push('NoFilter');
		} else {
			if(value instanceof COSName) {
				filters.push(value.name);
				params.push(this.dictionary.getDictionaryObject('DecodeParms'));
			} else if(value instanceof COSArray) {
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
			var filter = FilterManager.getFilter(filterName);
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
        var parser = new PDFStreamParser( this );
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
				this.cache = PDFImage.create(this, resources, graphics).getImageString();
			} else {
				console.error("Uknown filter type for image '" + filterType + "'");
				this.cache = "";
			}
		}
		return this.cache;
	}
}