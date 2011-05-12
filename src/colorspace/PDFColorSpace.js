function PDFColorSpace(cs) {
	this._cs = cs;
}
/**
 * For now we'll just return the color in RGB
 * Java PDF does a full implementation of this
 * @return array of RGB
 */
PDFColorSpace.prototype.getPaint = function(components) {
	var rgb = this._cs.toRGB(components);
	return rgb;
}
/**
 * Get the number of components expected in the getPaint command
 * @return int
 */
PDFColorSpace.prototype.getNumComponents = function() {
	return this._cs.getNumComponents();
}
/**
 * @return string
 */
PDFColorSpace.prototype.toString = function() {
	var name = 'PDFColorSpace';
	if(this._cs.toString)
		name += '{' + this._cs.toString() + '}';
	return name;
}
PDFColorSpace.prototype.toRGB = function(components) {
	return this._cs.toRGB(components);
}
PDFColorSpace.getColorSpaceByName = function(name) {
	switch (name) {
        case PDFColorSpace.COLORSPACE_GRAY:
            return PDFColorSpace.graySpace;

        case PDFColorSpace.COLORSPACE_RGB:
            return PDFColorSpace.rgbSpace;

        case PDFColorSpace.COLORSPACE_CMYK:
            return PDFColorSpace.cmykSpace;

        case PDFColorSpace.COLORSPACE_PATTERN:
            return PDFColorSpace.patternSpace;

		default:
            throw new IllegalArgumentException("Unknown Color Space name: " +
                name);
	}
}
PDFColorSpace.getColorSpace = function(csobj, resources) {
	var name;
	if(csobj instanceof COSName) {
		name = csobj.name;
		var colorSpaces;
		
		if (resources != null) {
            colorSpaces = resources.resources.getDictionaryObject("ColorSpace");
        }
		
		if (name == "DeviceGray" || name == "G") {
			return PDFColorSpace.getColorSpaceByName(PDFColorSpace.COLORSPACE_GRAY);
		} else if (name == "DeviceRGB" || name == "RGB") {
			return PDFColorSpace.getColorSpaceByName(PDFColorSpace.COLORSPACE_RGB);
		} else if (name == "DeviceCMYK" || name == "CMYK") {
			return PDFColorSpace.getColorSpaceByName(PDFColorSpace.COLORSPACE_CMYK);
		} else if (name == "Pattern") {
			return PDFColorSpace.getColorSpaceByName(PDFColorSpace.COLORSPACE_PATTERN);
		} else if (colorSpaces != null) {
			csobj = colorSpaces.getDictionaryObject(name);
		}
	}
	
	var value = null;

	// csobj is [/name <<dict>>]
	var ary = csobj;
	name = csobj.getObject(0).name;

	if (name == "CalGray") {
		value = new PDFColorSpace(new CalGrayColor(ary.getObject(1)));
	} else if (name == "CalRGB") {
		value = new PDFColorSpace(new CalRGBColor(ary.getObject(1)));
	} else if (name == "Lab") {
		value = new PDFColorSpace(new LabColor(ary.getObject(1)));
	} else if (name == "ICCBased") {
		var streamContents = ary.getObject(1).decode();
		var stream = new StreamBuffer(streamContents);
		//var profile = ICC_Profile.getInstance(bais);
		value = new PDFColorSpace(new ICC_ColorSpace(stream));
	} else if (name == "Separation" || name == "DeviceN") {
		console.warn("Colorspace seperation and DevinceN are not implemented fullly");
		var alternate = PDFColorSpace.getColorSpace(ary.getObject(2), resources);
		var func = PDFFunction.getFunction(ary.getObject(3));

		value = new AlternateColorSpace(alternate, func);
	} else if (name == "Indexed" || name == "I") {
		/**
		 * 4.5.5 [/Indexed baseColor hival lookup]
		 */
		var refspace = PDFColorSpace.getColorSpace(ary.getObject(1), resources);

		// number of indices= ary[2], data is in ary[3];
		var count = ary.getObject(2).value;
		value = new IndexedColor(refspace, count, ary.getObject(3));
	} else if (name == "Pattern") {
		console.warn("Colorspace Pattern is not implemented fullly");
		if (ary.size() == 1) {
			return PDFColorSpace.getColorSpaceByName(PDFColorSpace.COLORSPACE_PATTERN);
		}

		var base = getColorSpace(ary.getObject(1), resources);

		return new PatternSpace(base);
	} else {
		throw new PDFParseException("Unknown color space: " + name +
			" with " + ary[1]);
	}

	//csobj.setCache(value);

	return value;
	throw new UnimplementedException("Only support names color spaces");
}
/** the name of the device-dependent gray color space */
PDFColorSpace.COLORSPACE_GRAY = 0;

/** the name of the device-dependent RGB color space */
PDFColorSpace.COLORSPACE_RGB = 1;

/** the name of the device-dependent CMYK color space */
PDFColorSpace.COLORSPACE_CMYK = 2;

/** the name of the pattern color space */
PDFColorSpace.COLORSPACE_PATTERN = 3;
/**
 * @param c,m,y,k float 0 to 1
 * @return array of [R,G,B] 0 to 255
 */
PDFColorSpace.CMYKtoRGB = function(c, m, y, k) {
	var r = 1 - Math.min( 1, c * ( 1 - k ) + k );
	var g = 1 - Math.min( 1, m * ( 1 - k ) + k );
	var b = 1 - Math.min( 1, y * ( 1 - k ) + k );

	r = Math.round( r * 255 );
	g = Math.round( g * 255 );
	b = Math.round( b * 255 );
	return [r, g, b];
}
PDFColorSpace.rgbSpace = new PDFColorSpace({
	toRGB: function(components) {
		return this.getPaint(components);
	},
	getNumComponents: function() {
		return 3;
	},
	// for now we just return rgb value
	/**
	 * @param array components should be 3 floats 0 to 1
	 */
	getPaint: function(components) {
		var r = Math.round( components[0] * 255 );
		var g = Math.round( components[1] * 255 );
		var b = Math.round( components[2] * 255 );
		return [r, g, b];
	},
	toString: function() {
		return "PDFColorSpace.rgbSpace";
	}
});

PDFColorSpace.cmykSpace = new PDFColorSpace({
	toRGB: function(components) {
		return this.getPaint(components);
	},
	getNumComponents: function() {
		return 4;
	},
	/**
	 * @param array components should be 4 floats 0 to 1
	 */
	getPaint: function(components) {
		return PDFColorSpace.CMYKtoRGB(components[0], components[1], components[2], components[3]);
	},
	toString: function() {
		return "PDFColorSpace.cmykSpace";
	}
});

function PatternSpace(base) {
	PatternSpace.baseConstructor.call(this, null);
	this._base = null;
}
extend(PatternSpace, PDFColorSpace);

/**
 * get the number of components of this colorspace (1)
 */
PatternSpace.prototype.getNumComponents = function() {
	if(this._base == null)
		return 0;
	return this._base.getNumComponents();
}
/*PatternSpace.prototype.getPaint = function(components) {
	throw new IllegalArgumentException("Pattern spaces require a pattern " +
            "name!");
}*/
 /**
 * Get the paint representing a pattern, optionally with the given
 * base paint.
 *
 * @param patternObj the pattern to render
 * @param components the components of the base paint
 */
PatternSpace.prototype.getPaint = function(patternObj, components, resources) {
	var basePaint = null;

	if(this._base != null) {
		basePaint = this._base.getPaint(components);
	}
	debugger;
	zip.func();
	var pattern = patternObj.getCache();
	if (pattern == null) {
		pattern = PDFPattern.getPattern(patternObj, resources);
		patternObj.setCache(pattern);
	}

	return pattern.getPaint(basePaint);
}
PatternSpace.prototype.toRGB = function(components) {
	return this.getPaint(components);
}
PatternSpace.prototype.toString = function() {
	return 'PatternSpace';
}

PDFColorSpace.patternSpace = new PatternSpace();