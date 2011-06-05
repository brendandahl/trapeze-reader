goog.provide("trapeze.colorspace.PDFColorSpace");

trapeze.colorspace.PDFColorSpace = function(cs) {
	this._cs = cs;
};
/**
 * For now we'll just return the color in RGB
 * Java PDF does a full implementation of this
 * @return array of RGB
 */
trapeze.colorspace.PDFColorSpace.prototype.getPaint = function(components) {
	var rgb = this._cs.toRGB(components);
	return rgb;
};
/**
 * Get the number of components expected in the getPaint command
 * @return int
 */
trapeze.colorspace.PDFColorSpace.prototype.getNumComponents = function() {
	return this._cs.getNumComponents();
};
/**
 * @return string
 */
trapeze.colorspace.PDFColorSpace.prototype.toString = function() {
	var name = 'PDFColorSpace';
	if(this._cs.toString)
		name += '{' + this._cs.toString() + '}';
	return name;
};
trapeze.colorspace.PDFColorSpace.prototype.toRGB = function(components) {
	return this._cs.toRGB(components);
};

/** the name of the device-dependent gray color space */
trapeze.colorspace.PDFColorSpace.COLORSPACE_GRAY = 0;

/** the name of the device-dependent RGB color space */
trapeze.colorspace.PDFColorSpace.COLORSPACE_RGB = 1;

/** the name of the device-dependent CMYK color space */
trapeze.colorspace.PDFColorSpace.COLORSPACE_CMYK = 2;

/** the name of the pattern color space */
trapeze.colorspace.PDFColorSpace.COLORSPACE_PATTERN = 3;
/**
 * @param c,m,y,k float 0 to 1
 * @return array of [R,G,B] 0 to 255
 */
trapeze.colorspace.PDFColorSpace.CMYKtoRGB = function(c, m, y, k) {
	var r = 1 - Math.min( 1, c * ( 1 - k ) + k );
	var g = 1 - Math.min( 1, m * ( 1 - k ) + k );
	var b = 1 - Math.min( 1, y * ( 1 - k ) + k );

	r = Math.round( r * 255 );
	g = Math.round( g * 255 );
	b = Math.round( b * 255 );
	return [r, g, b];
};
