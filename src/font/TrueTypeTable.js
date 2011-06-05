goog.provide("trapeze.font.TrueTypeTable");
goog.require("trapeze.font.PostTable");
goog.require("trapeze.font.MaxpTable");
goog.require("trapeze.font.LocaTable");
goog.require("trapeze.font.HmtxTable");
goog.require("trapeze.font.HheaTable");
goog.require("trapeze.font.HeadTable");
goog.require("trapeze.font.GlyfTable");
goog.require("trapeze.font.CmapTable");
trapeze.font.TrueTypeTable = function() {
};
/**
 * Get a new instance of a table with provided data
 *
 * @param ttf the font that contains this table
 * @param tagString the tag for this table, as a 4 character string
 *        (e.g. head or cmap)
 * @param data the table data
 */
trapeze.font.TrueTypeTable.createTable = function(ttf, tagString, data) {
	var outTable = null;

	//int tag = stringToTag(tagString);

	switch (tagString) {
 		case "cmap": // CMAP_TABLE: // cmap table
			outTable = new trapeze.font.CmapTable();
			break;
		case "glyf":
			outTable = new trapeze.font.GlyfTable(ttf);
			break;
		case "head": // head table
			outTable = new trapeze.font.HeadTable();
			break;
		case "hhea":  // hhea table
			outTable = new trapeze.font.HheaTable();
			break;
		case "hmtx":
			outTable = new trapeze.font.HmtxTable(ttf);
			break;
		case "loca":
			outTable = new trapeze.font.LocaTable(ttf);
			break;
		case "maxp":  // maxp table
			outTable = new trapeze.font.MaxpTable();
			break;
		case "name": // name table
			outTable = new NameTable();
			break;
		case "post": // post table
			outTable = new trapeze.font.PostTable();
			break;
 		default:
			outTable = new trapeze.font.TrueTypeTable(tag);
			break;
	}

	if (data != null) {
		outTable.setData(data);
	}

	return outTable;
};