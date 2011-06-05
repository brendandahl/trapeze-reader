goog.provide("trapeze.font.AdobeGlyphList");
goog.require("trapeze.StreamBuffer");
trapeze.font.AdobeGlyphList = function() {
};
trapeze.font.AdobeGlyphList.glyphToUnicodes = null;
trapeze.font.AdobeGlyphList.unicodeToGlyph = null;
/**
 * return a single index for a glyph, though there may be multiples.
 * 
 * @param glyphName
 * @return Integer
 */
trapeze.font.AdobeGlyphList.getGlyphNameIndex = function(glyphName) {
	var unicodes = trapeze.font.AdobeGlyphList.getUnicodeValues(glyphName);
	if (unicodes == null) {
		return null;
	} else {
		return unicodes[0];
	}
};
/**
 * translate a glyph name into the possible unicode values that it
 * might represent. It is possible to have more than one unicode
 * value for a single glyph name.
 *
 * @param glyphName
 * @return int[]
 */
trapeze.font.AdobeGlyphList.getUnicodeValues = function(glyphName) {
    trapeze.font.AdobeGlyphList.intialize();
	return trapeze.font.AdobeGlyphList.glyphToUnicodes[glyphName];
};
trapeze.font.AdobeGlyphList.intialize = function() {
	if(trapeze.font.AdobeGlyphList.glyphToUnicodes != null)
		return;
	trapeze.font.AdobeGlyphList.glyphToUnicodes = {};
	trapeze.font.AdobeGlyphList.unicodeToGlyph = {};
	var reader = trapeze.StreamBuffer.createFromUrl('font/res/glyphlist.txt');
	while(reader.hasRemaining()) {
		var unicodes = [];
		var line = reader.readLine();
		
		line = line.replace(/\s+$/,""); // Trim
		if (line != "" && line.charAt(0) != "#") {
			// ignore comment lines
			var tokens = line.split(';');
			var glyphName = tokens[0];
			var unicodes = tokens[1].split(" ");

			var codes = new Array(unicodes.length);
			for (var i = 0; i < unicodes.length; i++) {
				codes[i] = parseInt(unicodes[i], 16);
				trapeze.font.AdobeGlyphList.unicodeToGlyph[codes[i]] = glyphName;
			}
			trapeze.font.AdobeGlyphList.glyphToUnicodes[glyphName] = codes;
		}
	}
};