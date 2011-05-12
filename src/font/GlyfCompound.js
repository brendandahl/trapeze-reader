function GlyfCompound() {
	/** the flags for each compound glyph */
    this._components;
    
    /** the instructions for the compound as a whole */
    this._instructions;
}
GlyfCompound.ARG_1_AND_2_ARE_WORDS    = 0x1;
GlyfCompound.ARGS_ARE_XY_VALUES       = 0x2;
GlyfCompound.ROUND_XY_TO_GRID         = 0x4;
GlyfCompound.WE_HAVE_A_SCALE          = 0x8;
GlyfCompound.MORE_COMPONENTS          = 0x20;
GlyfCompound.WE_HAVE_AN_X_AND_Y_SCALE = 0x40; 
GlyfCompound.WE_HAVE_A_TWO_BY_TWO     = 0x80;
GlyfCompound.WE_HAVE_INSTRUCTIONS     = 0x100;
GlyfCompound.USE_MY_METRICS 	      = 0x200;
GlyfCompound.OVERLAP_COMPOUND         = 0x400;
GlyfCompound.prototype.setData = function(data) {
	// int pos = data.position();
	// byte[] prdata = new byte[data.remaining()];
	// data.get(prdata);
	// HexDump.printData(prdata);
	// data.position(pos);
		  
	// read the contour end points
	var comps = [];
	var cur = null;
	var hasInstructions = false;
	
	do {
		cur = new GlyfComponent();
		cur.flags = data.getShort();
		cur.glyphIndex = data.getShort();
	  
		// read either e/f or matching points, as shorts or bytes...
		if (((cur.flags & GlyfCompound.ARG_1_AND_2_ARE_WORDS) != 0) &&
			((cur.flags & GlyfCompound.ARGS_ARE_XY_VALUES) != 0)) {
			cur.e = data.getShort();
			cur.f = data.getShort();
		} else if (!((cur.flags & GlyfCompound.ARG_1_AND_2_ARE_WORDS) != 0) &&
					((cur.flags & GlyfCompound.ARGS_ARE_XY_VALUES) != 0)) {
			cur.e = data.get();
			cur.f = data.get();
		} else if ( ((cur.flags & GlyfCompound.ARG_1_AND_2_ARE_WORDS) != 0) &&
				   !((cur.flags & GlyfCompound.ARGS_ARE_XY_VALUES) != 0)) {
			cur.compoundPoint = data.getShort();
			cur.componentPoint = data.getShort();
		} else {
			cur.compoundPoint = data.get();
			cur.componentPoint = data.get();
		}
	 
		// read the linear transform
		if ((cur.flags & GlyfCompound.WE_HAVE_A_SCALE) != 0) {
			cur.a = data.getShort() / (1 << 14);
			cur.d = cur.a;
		} else if ((cur.flags & GlyfCompound.WE_HAVE_AN_X_AND_Y_SCALE) != 0) {
			cur.a = data.getShort() / (1 << 14);
			cur.d = data.getShort() / (1 << 14);
		} else if ((cur.flags & GlyfCompound.WE_HAVE_A_TWO_BY_TWO) != 0) {
			cur.a = data.getShort() / (1 << 14);
			cur.b = data.getShort() / (1 << 14);
			cur.c = data.getShort() / (1 << 14);
			cur.d = data.getShort() / (1 << 14);
		}
	
		if ((cur.flags & GlyfCompound.WE_HAVE_INSTRUCTIONS) != 0) {
			hasInstructions = true;
		}

		comps.push(cur);
	} while ((cur.flags & GlyfCompound.MORE_COMPONENTS) != 0);
	
	this._components = comps;
	
	var instr = null;
	if (hasInstructions) {
		// read the instructions
		var numInstructions = data.getShort();
		instr = new Array(numInstructions);
		for (var i = 0; i < numInstructions; i++) {
			instr[i] = data.get();
		}
	} else {
		instr = [];
	}
	this._instructions = instr;
};
/**
 * Get the number of components in this compound
 */
GlyfCompound.prototype.getNumComponents = function() {
	return this._components.length;
}
/**
 * Get the glyf index for a given glyf
 */
GlyfCompound.prototype.getGlyphIndex = function(index) {
	return this._components[index].glyphIndex;
}
/**
 * Get the base affine transform.  This is based on a whacy formula
 * defined in the true type font spec.
 */
GlyfCompound.prototype.getTransform = function(index) {
	var gc = this._components[index];

	var m = Math.max(Math.abs(gc.a), Math.abs(gc.b));
	if (Math.abs(Math.abs(gc.a) - Math.abs(gc.c)) < (33 / 65536)) {
		m *= 2;
	}

	var n = Math.max(Math.abs(gc.c), Math.abs(gc.d));
	if (Math.abs(Math.abs(gc.c) - Math.abs(gc.d)) < (33 / 65536)) {
		n *= 2;
	}
	
	var e = m * gc.e;
	var f = n * gc.f;
	
	return [gc.a, gc.b, gc.c, gc.d, e, f]; 
}
function GlyfComponent() {
}
