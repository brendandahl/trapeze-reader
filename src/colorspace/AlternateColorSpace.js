goog.provide("trapeze.colorspace.AlternateColorSpace");
goog.require("trapeze.colorspace.PDFColorSpace");
/**
 * A color space that uses another color space to return values, and a
 * function to map between values in the input and input values to the
 * alternate color space
 */ 
trapeze.colorspace.AlternateColorSpace = function(alternate, pdfFunction) {
	// TODO
	trapeze.colorspace.AlternateColorSpace.baseConstructor.call(this, null);
	this.alternate = alternate;
	this.pdfFunction = pdfFunction;
	this._cs = {
		toRGB: function() {
			return [0,0,0];
		}
	}
}
extend(trapeze.colorspace.AlternateColorSpace, trapeze.colorspace.PDFColorSpace);

/**
 * get the number of components expected in the getPaint command
 * @Override
 */
trapeze.colorspace.AlternateColorSpace.prototype.getNumComponents = function() {
	if (this.pdfFunction != null) {
		return this.pdfFunction.getNumInputs();
	} else {
		return this.alternate.getNumComponents();
	}
}
trapeze.colorspace.AlternateColorSpace.prototype.toString = function() {
	return 'AlternateColorSpace';
}