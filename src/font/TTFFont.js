goog.provide("trapeze.font.TTFFont");
goog.require("trapeze.font.OutlineFont");
goog.require("trapeze.font.TrueTypeFont");
goog.require("trapeze.font.AdobeGlyphList");
goog.require("trapeze.font.GlyfSimple");
goog.require("trapeze.font.GlyfCompound");
goog.require("trapeze.GeneralPath");
goog.require("trapeze.AffineTransform");
/**
 * True Type Font
 * @param string baseFont
 * @param {trapeze.cos.COSDictionary} fontObj
 * @param PDFFontDescriptor descriptor
 */
trapeze.font.TTFFont = function(baseFont, fontObj, descriptor) {
	trapeze.font.TTFFont.baseConstructor.call(this, baseFont, fontObj, descriptor);
	
	this.font;
	this.unitsPerEm;
	
	var ttfObj = descriptor.fontFile2;
	if (ttfObj != null) {
		this.font = trapeze.font.TrueTypeFont.parseFont(ttfObj.decode());
		// read the units per em from the head table
		var head = this.font.getTable("head");
		this.unitsPerEm = head.unitsPerEm;
	} else {
		this.font = null;
	}
};
extend(trapeze.font.TTFFont, trapeze.font.OutlineFont);

/*
 * Methods for TTFFont
 */
trapeze.font.TTFFont.prototype.getOutlineByName = function(name, width) {
	var idx;
	var postTable = this.font.getTable("post");
	if (postTable != null) {
		idx = postTable.getGlyphNameIndex(name);
		if (idx != 0) {
			return this.getOutlineById(idx, width);
		}
		return null;
	}
	var res = trapeze.font.AdobeGlyphList.getGlyphNameIndex(name);
	if(res != null) {
		idx = res;
		return this.getOutlineFromCMaps(idx, width);
	}        		        
	return null;
};
trapeze.font.TTFFont.prototype.getOutlineByCode = function(src, width) {
	// find the cmaps
	var cmap = this.font.getTable("cmap");

	// if there are no cmaps, this is (hopefully) a cid-mapped font,
	// so just trust the value we were given for src
   /*  
	// TODO
	if (cmap == null) {
		return getOutline((int) src, width);
	} */

	var maps = cmap.getCMaps();

	// try the maps in order
	for (var i = 0; i < maps.length; i++) {
		var idx = maps[i].map(src);
		if (idx != 0) {
			return this.getOutlineById(idx, width);
		}
	}

	// not found, return the empty glyph
	return this.getOutlineById(0, width);
};
trapeze.font.TTFFont.prototype.getOutlineById = function(glyphId, width) {
	// find the glyph itself
	var glyf = this.font.getTable("glyf");
   var g = glyf.getGlyf(glyphId);

	var gp = null;
	if (g instanceof trapeze.font.GlyfSimple) {
		gp = this.renderSimpleGlyph(g);
	} else if (g instanceof trapeze.font.GlyfCompound) {
		gp = this.renderCompoundGlyph(glyf, g);
	} else {
		gp = new trapeze.GeneralPath();
	}

	// calculate the advance
	var hmtx = this.font.getTable("hmtx");
	var advance = hmtx.getAdvance(glyphId) / this.unitsPerEm;

	// scale the glyph to match the desired advance
	var widthfactor = width / advance;

	// the base transform scales the glyph to 1x1
	var at = trapeze.AffineTransform.getScaleInstance(1 / this.unitsPerEm,
			1 / this.unitsPerEm);
	at = at.multiply(trapeze.AffineTransform.getScaleInstance(widthfactor, 1));

	gp.transform(at);

	return gp;
};
/**
 * lookup the outline using the CMAPs, as specified in 32000-1:2008,
 * 9.6.6.4, when an Encoding is specified.
 * 
 * @param val
 * @param width
 * @return GeneralPath
 */
trapeze.font.TTFFont.prototype.getOutlineFromCMaps = function(val, width) {
	// find the cmaps
	var cmap = this.font.getTable("cmap");

	if (cmap == null) {
		return null;
	}

	// try maps in required order of (3, 1), (1, 0)
	var map = cmap.getCMap(3, 1);
	if (map == null) {
		map = cmap.getCMap(1, 0);
	}
	var idx = map.map(val);
	if (idx != 0) {
		return this.getOutlineById(idx, width);
	}

	return null;
};
  /**
 * Render a simple glyf
 */
trapeze.font.TTFFont.prototype.renderSimpleGlyph = function(g) {
	// the current contour
	var curContour = 0;

	// the render state
	var rs = new RenderState();
	rs.gp = new trapeze.GeneralPath();

	for (var i = 0; i < g.getNumPoints(); i++) {
		var rec = new PointRec(g, i);

		if (rec.onCurve) {
			this.addOnCurvePoint(rec, rs);
		} else {
			this.addOffCurvePoint(rec, rs);
		}

		// see if we just ended a contour
		if (i == g.getContourEndPoint(curContour)) {
			curContour++;

			if (rs.firstOff != null) {
				this.addOffCurvePoint(rs.firstOff, rs);
			}

			if (rs.firstOn != null) {
				this.addOnCurvePoint(rs.firstOn, rs);
			}

			rs.firstOn = null;
			rs.firstOff = null;
			rs.prevOff = null;
		}
	}

	return rs.gp;
};
 /**
     * Render a compound glyf
     */
trapeze.font.TTFFont.prototype.renderCompoundGlyph = function(glyf, g) {
	var gp = new trapeze.GeneralPath();

	for (var i = 0; i < g.getNumComponents(); i++) {
		// find and render the component glyf
		var gs = glyf.getGlyph(g.getGlyphIndex(i));
		var path = this.renderSimpleGlyph(gs);

		// multiply the translations by units per em
		var matrix = g.getTransform(i);

		// transform the path
		path.transform(new trapeze.AffineTransform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]));

		// add it to the global path
		gp.append(path);
	}

	return gp;
};
trapeze.font.TTFFont.prototype.addOnCurvePoint = function(rec, rs) {
	// if the point is on the curve, either move to it,
	// or draw a line from the previous point
	if (rs.firstOn == null) {
		rs.firstOn = rec;
		rs.gp.moveTo(rec.x, rec.y);
	} else if (rs.prevOff != null) {
		rs.gp.quadTo(rs.prevOff.x, rs.prevOff.y, rec.x, rec.y);
		rs.prevOff = null;
	} else {
		rs.gp.lineTo(rec.x, rec.y);
	}
};
trapeze.font.TTFFont.prototype.addOffCurvePoint = function(rec, rs) {
	if (rs.prevOff != null) {
		var oc = new PointRec((rec.x + rs.prevOff.x) / 2,
				(rec.y + rs.prevOff.y) / 2,
				true);
		this.addOnCurvePoint(oc, rs);
	} else if (rs.firstOn == null) {
		rs.firstOff = rec;
	}
	rs.prevOff = rec;
};


function RenderState() {
	// the shape itself
	this.gp;
	// the first off and on-curve points in the current segment
	this.firstOn;
	this.firstOff;
	// the previous off and on-curve points in the current segment
	this.prevOff;
}
/** a point on the stack of points */
function PointRec(a, b, c) {
	if(a instanceof trapeze.font.GlyfSimple) {
		this.x = a.getXCoord(b);
		this.y = a.getYCoord(b);
		this.onCurve = a.onCurve(b);
	} else {
		this.x = a;
		this.y = b;
		this.onCurve = c;
	}
}