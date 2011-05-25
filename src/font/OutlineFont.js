goog.provide("trapeze.font.OutlineFont");
goog.require("trapeze.font.PDFFont");
goog.require("trapeze.font.PDFGlyph");

/**
 * Supports width operations for Type1, Type1C, TrueType and Type3 fonts
 * @param string baseFont
 * @param {trapeze.cos.COSDictionary} fontObj
 * @param PDFFontDescriptor descriptor
 */
trapeze.font.OutlineFont = function(baseFont, fontObj, descriptor) {
	trapeze.font.PDFFont.call(this, baseFont, descriptor);
	
	this.firstChar = -1;
	this.lastChar = -1;
	this.widths = null;
	
	var firstCharObj = fontObj.getDictionaryObject("FirstChar");
	var lastCharObj = fontObj.getDictionaryObject("LastChar");
	var widthArrayObj = fontObj.getDictionaryObject("Widths");
	
	if (firstCharObj != null) {
		this.firstChar = firstCharObj.value;
	}
	if (lastCharObj != null) {
		this.lastChar = lastCharObj.value;
	}

	if (widthArrayObj != null) {
		this.widths = [];
		var size = widthArrayObj.size();
		for (var i = 0; i < size; i++) {
			this.widths[i] = widthArrayObj.get(i).value / 1000; //this.getDefaultWidth();
		}
	}
}
goog.inherits(trapeze.font.OutlineFont, trapeze.font.PDFFont);
/*
 * Methods
 */
trapeze.font.OutlineFont.prototype.getGlyph = function(src, name) {
	var outline = null;
	var width = this.getWidth(src, name);
	// first try by name
	if (name != null) {
		outline = this.getOutlineByName(name, width);
	}

	// now try by character code (guaranteed to return)
	if (outline == null) {
		outline = this.getOutlineByCode(src, width);
	}

	// calculate the advance
	var advance = {'x': width, 'y': 0};
	return new trapeze.font.PDFGlyph(src, name, outline, advance);
}
trapeze.font.OutlineFont.prototype.getWidth = function(code, name) {
	var charCode = code.charCodeAt(0) & 0xFF;
	var idx = charCode - this.firstChar;

	// make sure we're in range
	if (idx < 0 || this.widths == null || idx >= this.widths.length) {
		// try to get the missing width from the font descriptor
		if (this.descriptor != null) {
			return this.descriptor.missingWidth;
		} else {
			return 0;
		}
	}

	return this.widths[idx];
};
trapeze.font.OutlineFont.prototype.getDefaultWidth = function() {
	return 1000;
};