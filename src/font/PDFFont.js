goog.provide("trapeze.font.PDFFont");

/**
 * The base object that all other fonts inherit from.
 */
trapeze.font.PDFFont = function(baseFont, descriptor) {
	this.baseFont = baseFont;
	this.descriptor = descriptor;
	this.subType;
	this.encoding;
	this.glyphCache = {};
}
/**
 * Get the glyphs associated with a given String in this font
 *
 * @param text the text to translate into glyphs
 * @return array of PDFGlyph
 */
trapeze.font.PDFFont.prototype.getGlyphs = function(text) {
	if(this.encoding != null) {
		return this.encoding.getGlyphs(this, text);
	} else {
		// use the default mapping
		var outList = [];

		for (var i = 0; i < text.length; i++) {
			// only look at 2 bytes when there is no encoding
			var src = text.charAt(i);
			outList.push(this.getCachedGlyph(src, null));
		}
		return outList;
	}
}
/**
 * Get a glyph for a given character code.  The glyph is returned
 * from the cache if available, or added to the cache if not
 *
 * @param src the character code of this glyph
 * @param name the name of the glyph, or null if the name is unknown
 * @return PDFGlyph a glyph for this character
 */
trapeze.font.PDFFont.prototype.getCachedGlyph = function(src, name) {
	if(this.glyphCache[src] != null) {
		return this.glyphCache[src];
	}
	var glyph = this.getGlyph(src, name);
	this.glyphCache[src] = glyph;
	return glyph;
}