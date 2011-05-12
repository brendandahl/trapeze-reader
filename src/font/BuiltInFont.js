/**
 * create a new BuiltingFont object based on a description of the
 * font from the PDF file. Parse the description for key information
 * and use that to generate an appropriate font.
 */
function BuiltInFont(baseFont, fontObj, descriptor) {
	BuiltInFont.baseConstructor.call(this, baseFont, fontObj, descriptor);
	
	var fontName = descriptor.fontName;

	// check if it's one of the 14 base fonts
	for (var i = 0; i < BuiltInFont.baseFonts.length; i++) {
		if (fontName.toLowerCase() == BuiltInFont.baseFonts[i].toLowerCase()) {
			this.parseFont(fontName);
			return;
		}
	}

	// check if it's a mapped font
	for (var i = 0; i < BuiltInFont.mappedFonts.length; i += 2) {
		if (fontName.toLowerCase() == BuiltInFont.mappedFonts[i].toLowerCase()) {
			this.parseFont(BuiltInFont.mappedFonts[i + 1]);
			return;
		}
	}

	var flags = descriptor.flags;
	var style = ((flags & PDFFontDescriptor.FORCEBOLD) != 0) ? PDFFontDescriptor.BOLD : PDFFontDescriptor.PLAIN;

	if (fontName.indexOf("Bold") > 0) {
		style |= PDFFontDescriptor.BOLD;
	}
	if ((descriptor.italicAngle != 0) || 
		((flags & PDFFontDescriptor.NONSYMBOLIC) != 0)) {
		style |= PDFFontDescriptor.ITALIC;
	}

	var name = null;

	if ((flags & PDFFontDescriptor.FIXED_PITCH) != 0) { // fixed width
		if (((style & PDFFontDescriptor.BOLD) > 0) && ((style & PDFFontDescriptor.ITALIC) > 0)) {
			name = "Courier-BoldOblique";
		} else if ((style & PDFFontDescriptor.BOLD) > 0) {
			name = "Courier-Bold";
		} else if ((style & PDFFontDescriptor.ITALIC) > 0) {
			name = "Courier-Oblique";
		} else {
			name = "Courier";
		}
	} else if ((flags & PDFFontDescriptor.SERIF) != 0) {  // serif font
		if (((style & PDFFontDescriptor.BOLD) > 0) && ((style & PDFFontDescriptor.ITALIC) > 0)) {
			name = "Times-BoldItalic";
		} else if ((style & PDFFontDescriptor.BOLD) > 0) {
			name = "Times-Bold";
		} else if ((style & PDFFontDescriptor.ITALIC) > 0) {
			name = "Times-Italic";
		} else {
			name = "Times-Roman";
		}
	} else {
		if (((style & PDFFontDescriptor.BOLD) > 0) && ((style & PDFFontDescriptor.ITALIC) > 0)) {
			name = "Helvetica-BoldOblique";
		} else if ((style & PDFFontDescriptor.BOLD) > 0) {
			name = "Helvetica-Bold";
		} else if ((style & PDFFontDescriptor.ITALIC) > 0) {
			name = "Helvetica-Oblique";
		} else {
			name = "Helvetica";
		}
	}

	this.parseFont(name);
}
extend(BuiltInFont, Type1Font);

BuiltInFont.fontStreamCache = {};
/*
 *
 */
BuiltInFont.prototype.getFontStream = function(file) {
	if(BuiltInFont.fontStreamCache[file] != null)
		return BuiltInFont.fontStreamCache[file].subStream(0);
	var stream = StreamBuffer.createFromUrl('font/res/' + file);
	BuiltInFont.fontStreamCache[file] = stream;
	return stream;
};
/**
 * Parse a font given only the name of a builtin font
 */
BuiltInFont.prototype.parseFont = function(baseFont) {
	var props = BaseFontMap;
	// make sure we're a known font
	if (props[baseFont] == null) {
		throw new IllegalArgumentException("Unknown Base Font: " + baseFont);
	}

	// get the font information from the properties file
	var file = props[baseFont]["file"];

	// the size of the file
	var length = props[baseFont]["length"];
	
	// the size of the unencrypted portion
	var length1 = 0;
	// the size of the encrypted portion
	var length2 = 0;

	// read the data from the file
	var data = this.getFontStream(file);
	
	// are we a pfb file?
	if ((data.getByteAt(0) & 0xff) == 0x80) {
		// read lengths from the file
		length1 = (data.getByteAt(2) & 0xff);
		length1 |= (data.getByteAt(3) & 0xff) << 8;
		length1 |= (data.getByteAt(4) & 0xff) << 16;
		length1 |= (data.getByteAt(5) & 0xff) << 24;
		length1 += 6;

		length2 = (data.getByteAt(length1 + 2) & 0xff);
		length2 |= (data.getByteAt(length1 + 3) & 0xff) << 8;
		length2 |= (data.getByteAt(length1 + 4) & 0xff) << 16;
		length2 |= (data.getByteAt(length1 + 5) & 0xff) << 24;
		length1 += 6;
	} else {
		// TODO see if this is even needed, i don't see these props in the prop file.
		throw "Builtin font read from prop file not implemented";
		/*
		// get the values from the properties file
		length1 = Integer.parseInt(props.getProperty(baseFont + ".length1"));

		if (props.containsKey(baseFont + ".length2")) {
			length2 = Integer.parseInt(props.getProperty(baseFont + ".lenth2"));
		} else {
			length2 = length - length1;
		}
		*/
	}

	this.parseFontFromStream(data, length1, length2);
}
/*
 * Statics
 */
BuiltInFont.baseFonts = [
	"Courier", "Courier-Bold", "Courier-BoldOblique", "Courier-Oblique",
	"Helvetica", "Helvetica-Bold", "Helvetica-BoldOblique",
	"Helvetica-Oblique", "Times-Roman", "Times-Bold", "Times-BoldItalic",
	"Times-Italic", "Symbol", "ZapfDingbats"
];

/** fonts others (e.g. Acrobad PDFWriter 3.02 for Windows) assume
 *  are there, even though they're not in the spec.  Grrr...
 *
 * the format is <Name_in_PDF> <Builtin_To_Use>
 */
BuiltInFont.mappedFonts = [
	// map arial to helvetica
	"Arial", "Helvetica",
	"Arial,Bold", "Helvetica-Bold",
	"Arial,BoldItalic", "Helvetica-BoldOblique",
	"Arial,Italic", "Helvetica-Oblique",
	// map TimesNewRoman to Times
	"TimesNewRoman", "Times-Roman",
	"TimesNewRoman,Bold", "Times-Bold",
	"TimesNewRoman,BoldItalic", "Times-BoldItalic",
	"TimesNewRoman,Italic", "Times-Italic"
];