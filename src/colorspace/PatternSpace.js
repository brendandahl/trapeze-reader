goog.provide("trapeze.colorspace.PatternSpace");
goog.require("trapeze.colorspace.PDFColorSpace");
trapeze.colorspace.PatternSpace = function(base) {
	trapeze.colorspace.PatternSpace.baseConstructor.call(this, null);
	this._base = null;
}
extend(trapeze.colorspace.PatternSpace, trapeze.colorspace.PDFColorSpace);

/**
 * get the number of components of this colorspace (1)
 */
trapeze.colorspace.PatternSpace.prototype.getNumComponents = function() {
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
trapeze.colorspace.PatternSpace.prototype.getPaint = function(patternObj, components, resources) {
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
trapeze.colorspace.PatternSpace.prototype.toRGB = function(components) {
	return this.getPaint(components);
}
trapeze.colorspace.PatternSpace.prototype.toString = function() {
	return 'PatternSpace';
}

