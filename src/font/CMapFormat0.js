goog.provide("trapeze.font.CMapFormat0");
trapeze.font.CMapFormat0 = function(languange) {
	this.glyphIndex;
}
trapeze.font.CMapFormat0.prototype.setData = function(length, data) {
	if (length != 262) {
		throw new IllegalArgumentException("Bad length for CMap format 0");
	}
	var pos = data.getPosition();
	this.glyphIndex = data;
}
trapeze.font.CMapFormat0.prototype.map = function(src) {
	var i = src.charCodeAt(0) & 0xFF;;
	return this.glyphIndex.getByteAt(i + 6);
}