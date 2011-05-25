goog.provide("trapeze.font.PDFFont");
goog.require("trapeze.font.OutlineFont");
goog.require("trapeze.font.Type3Font");
goog.require("trapeze.font.Type1Font");
goog.require("trapeze.font.Type1CFont");
goog.require("trapeze.font.Type0Font");
goog.require("trapeze.font.TTFFont");
goog.require("trapeze.font.PDFFontEncoding");
goog.require("trapeze.font.PDFFontDescriptor");
goog.require("trapeze.font.CIDFontType2");
goog.require("trapeze.font.BuiltInFont");

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
/**
 * Static function to get the right font object.
 *
 */
trapeze.font.PDFFont.getFont = function(obj, resources) {

	if(obj['cachedFont'] != null)
		return obj['cachedFont'];
	var baseFont = null;
	var encoding = null;
	var descriptor = null;

	var subType = obj.getDictionaryObject("Subtype").name;
	if (subType == null) {
		subType = obj.getDictionaryObject("S").name;
	}
	var baseFontObj = obj.getDictionaryObject("BaseFont");
	var encodingObj = obj.getDictionaryObject("Encoding");
	var descObj = obj.getDictionaryObject("FontDescriptor");

	if (baseFontObj != null) {
		baseFont = baseFontObj.name;
	} else {
		baseFontObj = obj.getDictionaryObject("Name");
		if (baseFontObj != null) {
			baseFont = baseFontObj.name;
		}
	}

	if (encodingObj != null) {
		encoding = new trapeze.font.PDFFontEncoding(subType, encodingObj);
	}

	if (descObj != null) {
		descriptor = new trapeze.font.PDFFontDescriptor(descObj);
	} else {
		descriptor = new trapeze.font.PDFFontDescriptor(baseFont);
	}

	if (subType == "Type0") {
		font = new trapeze.font.Type0Font(baseFont, obj, descriptor);
	} else if (subType == "Type1") {
		// load a type1 font
		if (descriptor == null) { // TODO this can't happen remove this
			// it's one of the built-in fonts
			font = new trapeze.font.BuiltInFont(baseFont, obj);
		} else if (descriptor.fontFile != null) {
			// it's a Type1 font, included.
			font = new trapeze.font.Type1Font(baseFont, obj, descriptor);
		} else if (descriptor.fontFile3 != null) {
			// it's a CFF (Type1C) font
			font = new trapeze.font.Type1CFont(baseFont, obj, descriptor);
		} else {
			// no font info. Fake it based on the FontDescriptor
			//		System.out.println("Fakeout native font");
			font = new trapeze.font.BuiltInFont(baseFont, obj, descriptor);
		}
	} else if (subType == "TrueType") {
		if (descriptor.fontFile2 != null) {
			// load a TrueType font
			font = new trapeze.font.TTFFont(baseFont, obj, descriptor);
		} else {
			// fake it with a built-in font
			font = new trapeze.font.BuiltInFont(baseFont, obj, descriptor);
		}
	} else if (subType == "Type3") {
		// load a type 3 font
		font = new trapeze.font.Type3Font(baseFont, obj, resources, descriptor);
	} else if (subType == "CIDFontType2") {
		font = new trapeze.font.CIDFontType2(baseFont, obj, descriptor);
	} else if (subType == "CIDFontType0") {
		font = new trapeze.font.CIDFontType2(baseFont, obj, descriptor);
//            font = new CIDFontType0(baseFont, obj, descriptor);
//            throw new IOException ("CIDFontType0 is unimplemented. " + obj);
	} else {
		throw "Don't know how to handle a '" + 	subType + "' font";
	}

	font.subtype = subType;
	font.encoding = encoding;
	obj['cachedFont'] = font;
	
	return font;
}