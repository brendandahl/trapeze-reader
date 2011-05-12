function AdobeGlyphList() {
}
AdobeGlyphList.glyphToUnicodes = null;
AdobeGlyphList.unicodeToGlyph = null;
/**
 * return a single index for a glyph, though there may be multiples.
 * 
 * @param glyphName
 * @return Integer
 */
AdobeGlyphList.getGlyphNameIndex = function(glyphName) {
	var unicodes = AdobeGlyphList.getUnicodeValues(glyphName);
	if (unicodes == null) {
		return null;
	} else {
		return unicodes[0];
	}
}
/**
 * translate a glyph name into the possible unicode values that it
 * might represent. It is possible to have more than one unicode
 * value for a single glyph name.
 *
 * @param glyphName
 * @return int[]
 */
AdobeGlyphList.getUnicodeValues = function(glyphName) {
    AdobeGlyphList.intialize();
	return AdobeGlyphList.glyphToUnicodes[glyphName];
}
AdobeGlyphList.intialize = function() {
	if(AdobeGlyphList.glyphToUnicodes != null)
		return;
	AdobeGlyphList.glyphToUnicodes = {};
	AdobeGlyphList.unicodeToGlyph = {};
	var reader = StreamBuffer.createFromUrl('font/res/glyphlist.txt');
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
				AdobeGlyphList.unicodeToGlyph[codes[i]] = glyphName;
			}
			AdobeGlyphList.glyphToUnicodes[glyphName] = codes;
		}
	}
}