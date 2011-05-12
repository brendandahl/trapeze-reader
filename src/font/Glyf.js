function Glyf() {
}
Glyf.getGlyf = function(data) {
	var numContours = data.getShort();

	var g = null;
	if (numContours == 0) {
		// no glyph data
		g = new Glyf();
	} else if (numContours == -1) {
		// compound glyf
		g = new GlyfCompound();
	} else if (numContours > 0) {
		// simple glyf
		g = new GlyfSimple();
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
}