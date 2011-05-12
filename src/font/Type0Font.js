function Type0Font(baseFont, fontObj, descriptor) {
	Type0Font.baseConstructor.call(this, baseFont, fontObj, descriptor);
	var descendantFonts = fontObj.getDictionaryObject("DescendantFonts");
	
	var size = descendantFonts.size();
	this.fonts = new Array(size);
	
	for(var i = 0; i < size; i++) {
		this.fonts[i] = PDFFont.getFont(descendantFonts.getObject(i), null);
	}
}
extend(Type0Font, PDFFont);