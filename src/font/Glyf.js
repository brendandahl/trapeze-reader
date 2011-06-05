goog.provide("trapeze.font.Glyf");
goog.require("trapeze.font.GlyfSimple");
goog.require("trapeze.font.GlyfCompound");
trapeze.font.Glyf = function() {
}
trapeze.font.Glyf.getGlyf = function(data) {
	var numContours = data.getShort();

	var g = null;
	if (numContours == 0) {
		// no glyph data
		g = new trapeze.font.Glyf();
	} else if (numContours == -1) {
		// compound glyf
		g = new trapeze.font.GlyfCompound();
	} else if (numContours > 0) {
		// simple glyf
		g = new trapeze.font.GlyfSimple();
	} else {
		throw new IllegalArgumentException("Unknown glyf type: " + 
									   numContours);
	}

	g.numContours = numContours;
	g.minX = data.getShort();
	g.minY = data.getShort();
	g.maxX = data.getShort();
	g.maxY = data.getShort();

	// do glyphtype-specific parsing
	g.setData(data);

	return g;
};