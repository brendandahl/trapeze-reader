goog.provide("trapeze.cos.COSName");
trapeze.cos.COSName = function(name) {
	this.name = name;
};
trapeze.cos.COSName.prototype = {
	toString: function(depth) {
		depth = depth || 0;
		return "\t".repeat(depth) + "COSName: " + this.name;
	}
};