function TrueTypeFont(type) {
	this.tables = {};
	this.type = type;
	
	    
	
	this.parseDirectories = function(data, numTables) {
		for (var i = 0; i < numTables; i++) {
            var tagString = data.read(4);
            var checksum = data.getInt();
            var offset = data.getInt();
            var length = data.getInt();

            // read the data
//            System.out.println ("TTFFont.parseDirectories: checksum: " +
//                    checksum + ", offset: " + offset + ", length: " + length);

            var tableData = data.subStream(offset, length);
            

            //int calcChecksum = calculateChecksum (tagString, tableData);
			this.tables[tagString] = tableData;

            /*if (calcChecksum == checksum) {
                ttf.addTable (tagString, tableData);
            } else {
                 System.out.println("Mismatched checksums on table " + 
                tagString + ": " + calcChecksum + " != " +
                checksum);

                ttf.addTable (tagString, tableData);

            }
            data.reset (); */
        }
	};
	this.getTable = function(tagString) {
		var table = this.tables[tagString];
		if(table == null)
			return null;
		if(table instanceof StreamBuffer) {
			table = TrueTypeTable.createTable(this, tagString, table)
			this.tables[tagString] = table;
			return table;
		} else {
			return table;
		}
	};
}
TrueTypeFont.parseFont = function(stream) {
	var buffer = new StreamBuffer(stream, true);
	
	var type = buffer.getInt();

	var numTables = buffer.getShort();
	var searchRange = buffer.getShort();
	var entrySelector = buffer.getShort();
	var rangeShift = buffer.getShort();

	var font = new TrueTypeFont(type);
	font.parseDirectories (buffer, numTables);

	return font;
}