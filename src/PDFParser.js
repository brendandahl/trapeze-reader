goog.require("trapeze.cos.COSDictionary");
goog.require("trapeze.cos.COSDocument");
goog.require("trapeze.cos.COSObjectKey");
function PDFParser(stream) {
	this.stream = stream;
	this.document = new trapeze.cos.COSDocument();
	this.document.parser = this;
}
extend(PDFParser, BaseParser);

PDFParser.prototype.parse = function() {
	// Find the end start xref
	var startXrefPos = this.stream.lastIndexOf("startxref");
	if(startXrefPos == -1)
		throw new ParseException("Could not find the startxref");
		
	this.stream.setPosition(startXrefPos + 9);
	this.skipSpaces();
	var xrefPos = this.readNum();
	while(true) {
		this.stream.setPosition(xrefPos);
		// We can encounter a regular cross reference table or a cross reference stream
		this.skipSpaces();
		var peek = this.stream.peek();
		var trailer = null;
		if(peek == 'x') { // Should be a trailer(table)
			this.parseXrefTable();
			trailer = this.parseTrailer();
		} else { // Should be a cross ref stream
			trailer = this.parseXrefStream();
		}
		var prev = trailer.getDictionaryObject('Prev');
		if(prev) {
			xrefPos = prev.value;
		} else {
			break;
		}
	}
};
PDFParser.prototype.parseHeader = function() {
	var header = this.stream.readLine();
	// "%PDF-"
	var version = header.substring(5);
	this.document.version = version;
};
PDFParser.prototype.parseObject = function() {
	if(!this.stream.hasRemaining())
		return true;
	this.skipSpaces();
	var peek = this.stream.peek();
	if(peek == 'e') {
		this.readString();
		this.skipSpaces();
	} else if(peek == 'x') {
		this.parseXrefTable();
	} else if (peek == 't' || peek == 's') {
		if(peek == 't')
		{
			this.parseTrailer();
			peek = this.stream.peek(); 
		}
		if (peek == 's')
		{  
			this.parseStartXref();
			//verify that EOF exists 
			//this.skipSpaces();
			//this.skipSpaces();
			//var e = this.stream.read(7); // read the %%EOF
			this.skipSpaces();
			//alert(e);
			if(this.stream.hasRemaining())
			{
				//throw "expecting EOF"; // TODO
			}
			return true;
		}
	} else { // Normal object!
		var objectNumber = this.readNum();
		this.skipSpaces();
		var genNumber = this.readNum();
		this.skipSpaces();
		var objectKey = this.stream.read(3);
		//console.log("--Parsing Object: " + objectNumber + " " + genNumber);
		var pb = this.parseDirObject();
		var endObjectKey = this.readString();
		if(endObjectKey == "stream") {
			if( pb instanceof trapeze.cos.COSDictionary )
			{
				pb = this.parseCOSStream(pb);
			} 
			else
			{
				throw new Exception("Previous must be a dictionary");
			}
			endObjectKey  = this.readString();
		}
		//console.log("--Object was: " + pb);
		var key = new trapeze.cos.COSObjectKey(objectNumber, genNumber);
		var pdfObject = this.document.getObjectFromPool(key);
		pdfObject.setObject(pb);
		return pb;
	}
	return false;
};

/**
 * This will parse the xref table from the stream and add it to the state
 * The XrefTable contents are ignored.
 *            
 * @return false on parsing error 
 * @throws IOException If an IO error occurs.
 */
PDFParser.prototype.parseXrefStream = function() {
	var obj = this.parseObject();
	var parser = new PDFXrefStreamParser(obj, this.document);
	parser.parse();
	var parsedTrailer = obj.dictionary;
	var docTrailer = this.document.getTrailer();
	if( docTrailer == null )
	{
		this.document.setTrailer( parsedTrailer );
	}
	else
	{
		docTrailer.addAll( parsedTrailer );
	}
	return parsedTrailer;
}
/**
 * This will parse the xref table from the stream and add it to the state
 * The XrefTable contents are ignored.
 *            
 * @return false on parsing error 
 * @throws IOException If an IO error occurs.
 */
PDFParser.prototype.parseXrefTable = function() {
	var xref = this.readString();
	if( xref != "xref") 
	{
		return false;
	}
	this.skipSpaces();
	/*
	 * Xref tables can have multiple sections. 
	 * Each starts with a starting object id and a count.
	 */
	while(true)
	{
		var currObjID = this.readNum(); // first obj id
		var count = this.readNum(); // the number of objects in the xref table
		this.skipSpaces();
		for(var i = 0; i < count; i++)
		{
			if(!this.stream.hasRemaining() || this.isEndOfName(this.stream.peek()))
			{
				break;
			}
			if(this.stream.peek() == 't')
			{
				break;
			}
			//Ignore table contents
			var currentLine = this.stream.readLine().replace(/\s+$/,""); // TODO look into why i need to trim here ( shouldn't have to)
			var splitString = currentLine.split(" ");

			if (splitString.length < 3)
			{
				console.warn("invalid xref line: " + currentLine);
				break;
			}
			/* This supports the corrupt table as reported in 
			 * PDFBOX-474 (XXXX XXX XX n) */
			if(splitString[splitString.length-1] == "n")
			{
				var currOffset = splitString[0];
				var currGenID = splitString[1];
				//console.log("adding key: " + currObjID + " " + currGenID);
				var objKey = new trapeze.cos.COSObjectKey(currObjID, currGenID);
				this.document.setXRef(objKey, currOffset);
			}
			else if(splitString[2] != "f")
			{
				throw "Corrupt XRefTable Entry - ObjID:" + currObjID;
			}
			currObjID++;
			this.skipSpaces();
		}
		this.skipSpaces();
		var c = this.stream.peek();
		if(c < '0' || c > '9')
		{
			break;
		}
	}
	return true;
};
PDFParser.prototype.parseTrailer = function() {
	var nextLine = this.stream.read(7);
	if(nextLine != "trailer")
		throw new ParseException("Expected trailer found '" + nextLine + "'");
		
	this.skipSpaces();

	var parsedTrailer = this.parseCOSDictionary();
	var docTrailer = this.document.getTrailer();
	if( docTrailer == null )
	{
		this.document.setTrailer( parsedTrailer );
	}
	else
	{
		docTrailer.addAll( parsedTrailer );
	}
	this.skipSpaces();
	return parsedTrailer;
};
PDFParser.prototype.parseStartXref = function() {
	var startXRef = this.stream.readLine();
	if( startXRef != "startxref")
	{
		throw "blah";
	}
	this.skipSpaces();
	/* This integer is the byte offset of the first object referenced by the xref or xref stream
	 * Not needed for PDFbox
	 */
	this.readNum();
	return true;
};
PDFParser.prototype.getPDDocument = function() {
	return new PDDocument(this.document);
};