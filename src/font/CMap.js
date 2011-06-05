goog.provide("trapeze.font.CMap");
goog.require("trapeze.font.CMapFormat4");
goog.require("trapeze.font.CMapFormat0");
trapeze.font.CMap = function() {
}
trapeze.font.CMap.getMap = function(data) {
	var format = data.getShort();
	var length = data.getShort();
	
	data = data.subStream(0, Math.min(data.getLimit(), length));
	data.setPosition(4) // Move past the two already read 
	var language = data.getShort();
	var outMap = this.createMap(format, language);
	if (outMap == null) {
		return null;
	}

	outMap.setData (data.getLimit(), data);

	return outMap;
};
trapeze.font.CMap.createMap = function(format, language) {
	var outMap = null;

	switch (format) {
		case 0: // CMap format 0 - single byte codes
			outMap = new trapeze.font.CMapFormat0(language);
			break;
		case 4: // CMap format 4 - two byte encoding
			outMap = new trapeze.font.CMapFormat4(language);
			break;
		default:
			throw "not done with any other CMaps";
		/* 
		case 6: // CMap format 6 - 16-bit, two byte encoding
			outMap = new CMapFormat6 (language);
			break; */
	}
	return outMap;
};