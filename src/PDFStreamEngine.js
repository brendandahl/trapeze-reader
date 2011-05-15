goog.require("trapeze.Commander");
goog.require("trapeze.cos.COSObject");
function PDFStreamEngine(canvas, initialMatrix) {
    this.page;
	this.canvas = canvas;
	this.initialMatrix = initialMatrix;
	this.resources;
	this.processStream = function(aPage, resources, cosStream) {
		this.commander = new trapeze.Commander(this.canvas, resources, this.initialMatrix, this);
		this.map = new PDFOperatorMap(this.commander).map;
		this.resources = resources;
		this.processSubStream(aPage, resources, cosStream);
	};
	/**
     * Process a sub stream of the current stream.
     *
     * @param aPage The page used for drawing.
     * @param resources The resources used when processing the stream.
     * @param cosStream The stream to process.
     *
     * @throws IOException If there is an exception while processing the stream.
     */
    this.processSubStream = function(aPage, resources, cosStream ) {
        this.page = aPage;
		var arguments = [];
		var tokens = cosStream.getStreamTokens();
		//console.time('Process Substream');
		var length = tokens.length;
		for(var i = 0; i < length; i++) {
			var next = tokens[i];
			if( next instanceof trapeze.cos.COSObject ) {
				arguments.push( next.getObject() );
			} else if( next instanceof PDFOperator ) {
				this.processOperator( next, arguments, (i + 1) == length  );
				arguments = [];
			} else {
				arguments.push( next );
			}
		}
		//console.timeEnd('Process Substream');
    }
	/**
     * This is used to handle an operation.
     *
     * @param operator The operation to perform.
     * @param args The list of arguments.
	 * @param last
     *
     * @throws IOException If there is an error processing the operation.
     */
    this.processOperator = function(operator, args, last) {
		var operation = operator.operator;
		var processor = this.map[operation];
		if( processor != null ) {
			this.commander[processor].call(this.commander, args);
		} else {
			console.warn("UNIMPLEMENTED OP '" + operation + "'");
		}
    }
}