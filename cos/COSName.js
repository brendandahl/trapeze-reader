function COSName(name) {
	this.name = name;
}
COSName.prototype = {
	toString: function(depth) {
		depth = depth || 0;
		return "\t".repeat(depth) + "COSName: " + this.name;
	}
};