goog.provide("trapeze.font.Type0Font");

trapeze.font.Type0Font = function(baseFont, fontObj, descriptor) {
	trapeze.font.Type0Font.baseConstructor.call(this, baseFont, fontObj, descriptor);
	var descendantFonts = fontObj.getDictionaryObject("DescendantFonts");
	
	var size = descendantFonts.size();
	this.fonts = new Array(size);
	
	for(var i = 0; i < size; i++) {
		this.fonts[i] = trapeze.font.FontManager.getFont(descendantFonts.getObject(i), null);
	}
};
extend(trapeze.font.Type0Font, trapeze.font.PDFFont);