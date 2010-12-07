function PDFXrefStreamParser(stream, doc) {
	this.stream = stream;
	this.pdfSource = new StreamBuffer(stream.decode());
	this.document = doc;
}
/**
 * Parses through the unfiltered stream and populates the xrefTable HashMap.
 * @throws IOException If there is an error while parsing the stream.
 */
PDFXrefStreamParser.prototype = {
	parse: function() {
		var dictionary = this.stream.dictionary;
		var xrefFormat = dictionary.getDictionaryObject("W");
		var indexArray = dictionary.getDictionaryObject("Index");
		/*
		 * If Index doesn't exist, we will use the default values. 
		 */
		if(indexArray == null) {
			indexArray = new COSArray();
			indexArray.add(new COSNumber(0));
			indexArray.add(dictionary.getDictionaryObject("Size"));
		}
		
		var objNums = [];
		
		/*
		 * Populates objNums with all object numbers available
		 */
		var indexSize = indexArray.size();
		var index = 0;
		while(index < indexSize) {
			var objID = indexArray.get(index++).value;
			var size = indexArray.get(index++).value;
			for(var i = 0; i < size; i++) {
				objNums.push(parseInt(objID + i));
			}
		}
		var objLength = objNums.length;
		var objIndex = 0;
		
		/*
		 * Calculating the size of the line in bytes
		 */
		var w0 = xrefFormat.get(0).value;
		var w1 = xrefFormat.get(1).value;
		var w2 = xrefFormat.get(2).value;
		var lineSize = w0 + w1 + w2;
		
		while(this.pdfSource.hasRemaining()) {
			var currLine = []; //new byte[lineSize];
			for(var i = 0; i < lineSize; i++) {
				currLine.push(this.pdfSource.get());
			}

			var type = 0;
			/*
			 * Grabs the number of bytes specified for the first column in 
			 * the W array and stores it.
			 */
			for(var i = 0; i < w0; i++) {
				type += (currLine[i] & 0x00ff) << ((w0 - i - 1)* 8);
			}
			//Need to remember the current objID
			var objID = objNums[objIndex++];
			/*
			 * 3 different types of entries. 
			 */
			switch(type) {
				case 0:
					/*
					 * Skipping free objects
					 */
					break;
				case 1:  // Regular cross reference                 
					var offset = 0;
					for(var i = 0; i < w1; i++) {
						offset += (currLine[i + w0] & 0x00ff) << ((w1 - i - 1) * 8);
					}
					var genNum = 0;
					for(var i = 0; i < w2; i++) {
						genNum += (currLine[i + w0 + w1] & 0x00ff) << ((w2 - i - 1) * 8);
					}
					var objKey = new COSObjectKey(objID, genNum);
					this.document.setXRef(objKey, offset);
					break;
				case 2: // Link to a compressed object
					var streamObjectNumber = 0;
					for(var i = 0; i < w1; i++) {
						streamObjectNumber += (currLine[i + w0] & 0x00ff) << ((w1 - i - 1) * 8);
					}
					var index = 0;
					for(var i = 0; i < w2; i++) {
						index += (currLine[i + w0 + w1] & 0x00ff) << ((w2 - i - 1) * 8);
					}
					var objKey = new COSObjectKey(objID, 0);
					this.document.setXRef(objKey, new COSObjectStreamLocation(new COSObjectKey(streamObjectNumber, 0), index));
					break;
				default:
					break;
			}
		}
	}
}