goog.provide("trapeze.cos.COSNumber");
trapeze.cos.COSNumber = function(value) {
	this.value = parseFloat(value);
};
trapeze.cos.COSNumber.prototype = {
	toString: function(depth) {
		depth = depth || 0;
		return "\t".repeat(depth) + "COSNumber: " + this.value;
	}
};