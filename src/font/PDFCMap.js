goog.provide("trapeze.font.PDFCMap");
goog.require("trapeze.cos.COSName");
goog.require("trapeze.cos.COSStream");
/**
 * A CMap maps from a character in a composite font to a font/glyph number
 * pair in a CID font.
 *
 */
trapeze.font.PDFCMap = function() {
}
trapeze.font.PDFCMap.prototype.map = function(src) {
	return src;
}
trapeze.font.PDFCMap.prototype.getFontID = function(src) {
	return 0;
}
trapeze.font.PDFCMap.getCMap = function(map) {
	if (map instanceof trapeze.cos.COSName) {
		return new trapeze.font.PDFCMap();
	} else if (map instanceof trapeze.cos.COSStream) {
		throw new UnimplementedException("Parsing a CMAP from a stream is not supported");
	} else {
		throw new IOException("CMap type not Name or Stream!");
	}
}