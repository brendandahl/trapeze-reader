/**
 * A CMap maps from a character in a composite font to a font/glyph number
 * pair in a CID font.
 *
 */
function PDFCMap() {
}
PDFCMap.prototype.map = function(src) {
	return src;
}
PDFCMap.prototype.getFontID = function(src) {
	return 0;
}
PDFCMap.getCMap = function(map) {
	if (map instanceof COSName) {
		return new PDFCMap();
	} else if (map instanceof COSStream) {
		throw new UnimplementedException("Parsing a CMAP from a stream is not supported");
	} else {
		throw new IOException("CMap type not Name or Stream!");
	}
}