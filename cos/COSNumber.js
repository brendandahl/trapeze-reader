function COSNumber(value) {
	this.value = parseFloat(value);
}
COSNumber.prototype = {
	toString: function(depth) {
		depth = depth || 0;
		return "\t".repeat(depth) + "COSNumber: " + this.value;
	}
}