function ICC_ColorSpace() {
}
ICC_ColorSpace.prototype.getNumComponents = function() {
	// TODO
	// For now this is faked and assumend just be an RGB
	return 3;
}
ICC_ColorSpace.prototype.toRGB = function(colorValue) {
	// TODO
	// For now this is faked and assumend just be an RGB
	return colorValue;
}
ICC_ColorSpace.prototype.getPaint = function(colorValue) {
	// TODO
	// For now this is faked and assumend just be an RGB
	return colorValue;
}
ICC_ColorSpace.prototype.toString = function(colorValue) {
	// TODO
	// For now this is faked and assumend just be an RGB
	return 'ICC_ColorSpace';
}