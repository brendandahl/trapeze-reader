goog.require("trapeze.cos.COSObject");
goog.require("trapeze.cos.COSObjectKey");
function PDFObjectStreamParser(stream, doc) {
	PDFObjectStreamParser.baseConstructor.call(this);
	this.dictionary = stream.dictionary;
	this.stream = new StreamBuffer(stream.decode());
	this.document = doc;
	this.streamObjects = [];
	this.objectNumbers = [];
}
extend(PDFObjectStreamParser, BaseParser);

	/**
     * This will parse the tokens in the stream.  This will close the
     * stream when it is finished parsing.
     *
     * @throws IOException If there is an error while parsing the stream.
     */
PDFObjectStreamParser.prototype.parse = function() {
	//need to first parse the header.
	var numberOfObjects = this.dictionary.getDictionaryObject("N").value;
	this.objectNumbers = [];
	this.streamObjects = [];
	for(var i=0; i<numberOfObjects; i++ ) {
		var objectNumber = this.readNum();
		var offset = this.readNum();
		this.objectNumbers.push(objectNumber);
	}
	var object = null;
	var cosObject = null;
	var objectCounter = 0;
	while(this.stream.hasRemaining() && (cosObject = this.parseDirObject()) != null ) {
		var key = new trapeze.cos.COSObjectKey(this.objectNumbers[objectCounter], 0);
		object = new trapeze.cos.COSObject(cosObject, key);
		this.streamObjects.push( object );
		objectCounter++;
	}
}