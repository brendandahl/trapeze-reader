goog.provide("trapeze.filter.FlateFilter");
goog.require("trapeze.filter.Predictor");
trapeze.filter.FlateFilter = function() {
	this.decode = function(stream, params) {
		var inflator = new Inflator(new function() {
			var filePointer = 2;
			var fileSize = stream.length - 4;
			
			this.readByte = function(){
				if(filePointer >= fileSize)
					return -1;
				return stream.charCodeAt(filePointer++) & 0xff;
			}
		});
		
		var textReader = new TextReader(new DefaultTranslator(inflator));
        var outBytes = textReader.readToEnd();
		// undo a predictor algorithm, if any was used
		if(params != null)
			var predictor = params.getDictionaryObject("Predictor");
		if (params != null && predictor != null) {
            var predictor = trapeze.filter.Predictor.getPredictor(params);
            if (predictor != null) {
                outBytes = predictor.unpredict(outBytes);
            }
        }
		return outBytes;
	};
};