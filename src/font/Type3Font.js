goog.provide("trapeze.font.Type3Font");
goog.require("trapeze.font.PDFFont");
goog.require("trapeze.font.PDFGlyph");
goog.require("trapeze.Rectangle2D");
goog.require("trapeze.PDFParser");
goog.require("trapeze.GeneralPath");
goog.require("trapeze.AffineTransform");
goog.require("trapeze.cos.COSDictionary");
trapeze.font.Type3Font = function(baseFont, fontObj, resources, descriptor) {
	trapeze.font.Type3Font.baseConstructor.call(this, baseFont, fontObj, descriptor);
	/** resources for the character definitions */
    this.rsrc;
    /** the character processes, mapped by name */
    this.charProcs;
    /** bounding box for the font characters */
    this.bbox;
    /** affine transform for the font characters */
    this.at;
    /** the widths */
    this.widths;
    /** the start code */
    this.firstChar;
    /** the end code */
    this.lastChar;
	
	this.rsrc = new trapeze.cos.COSDictionary();
	if (resources != null) {
		this.rsrc.addAll(resources.resources);
	}

	// get the transform matrix
	var matrix = fontObj.getDictionaryObject("FontMatrix");
	var matrixAry = [];
	for (var i = 0; i < 6; i++) {
		matrixAry.push(matrix.getObject(i).value);
	}
	this.at = new trapeze.AffineTransform(matrixAry[0], matrixAry[1], matrixAry[2], matrixAry[3], matrixAry[4], matrixAry[5]);

	// get the scale from the matrix
	var scale = matrixAry[0] + matrixAry[2];

	// put all the resources in a Hash
	var rsrcObj = fontObj.getDictionaryObject("Resources");
	if (rsrcObj != null) {
		this.rsrc.addAll(rsrcObj);
	}

	// get the character processes, indexed by name
	this.charProcs = fontObj.getDictionaryObject("CharProcs");

	// get the font bounding box
	var bboxdef = fontObj.getDictionaryObject("FontBBox");
	var bboxfdef = [];
	for (var i = 0; i < 4; i++) {
		bboxfdef.push(bboxdef.getObject(i).value);
	}
	this.bbox = new trapeze.Rectangle2D(bboxfdef[0], bboxfdef[1],
			bboxfdef[2] - bboxfdef[0],
			bboxfdef[3] - bboxfdef[1]);
	if (this.bbox.isEmpty()) {
		this.bbox = null;
	}

	// get the widths
	var widthArray = fontObj.getDictionaryObject("Widths");
	this.widths = [];
	var widthLength = widthArray.size();
	for (var i = 0; i < widthLength; i++) {
		this.widths[i] = widthArray.getObject(i).value;
	}

	// get first and last chars
	this.firstChar = fontObj.getDictionaryObject("FirstChar").value;
	this.lastChar = fontObj.getDictionaryObject("LastChar").value;
}
extend(trapeze.font.Type3Font, trapeze.font.PDFFont);

trapeze.font.Type3Font.prototype.getGlyph = function(src, name) {
	if (name == null) {
		throw new IllegalArgumentException("Glyph name required for Type3 font!" +
				"Source character: " +  src);
	}
	var pageObj = this.charProcs.getDictionaryObject(name);
	if (pageObj == null) {
		// glyph not found.  Return an empty glyph...
		return new trapeze.font.PDFGlyph(src, name, new trapeze.GeneralPath(), new Point2D.Float(0, 0));
	}

		/* var page = new PDFPage(this.bbox, 0);
		page.addXform(at);

		var prc = new trapeze.PDFParser(page, pageObj.getStream(), rsrc);
		prc.go(true); */

		var width = this.widths[src - this.firstChar];

		var advance = {x: width, y: 0};
		advance = this.at.transform(advance);

		return new trapeze.font.PDFGlyph(src, name, pageObj, advance);
};