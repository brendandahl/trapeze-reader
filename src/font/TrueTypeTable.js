function TrueTypeTable() {
}
/**
 * Get a new instance of a table with provided data
 *
 * @param ttf the font that contains this table
 * @param tagString the tag for this table, as a 4 character string
 *        (e.g. head or cmap)
 * @param data the table data
 */
TrueTypeTable.createTable = function(ttf, tagString, data) {
	var outTable = null;

	//int tag = stringToTag(tagString);

	switch (tagString) {
 		case "cmap": // CMAP_TABLE: // cmap table
			outTable = new CmapTable();
			break;
		case "glyf":
			outTable = new GlyfTable(ttf);
			break;
		case "head": // head table
			outTable = new HeadTable();
			break;
		case "hhea":  // hhea table
			outTable = new HheaTable();
			break;
		case "hmtx":
			outTable = new HmtxTable(ttf);
			break;
		case "loca":
			outTable = new LocaTable(ttf);
			break;
		case "maxp":  // maxp table
			outTable = new MaxpTable();
			break;
		case "name": // name table
			outTable = new NameTable();
			break;
		case "post": // post table
			outTable = new PostTable();
			break;
 		default:
			outTable = new TrueTypeTable(tag);
			break;
	}

	if (data != null) {
		outTable.setData(data);
	}

	return outTable;
}