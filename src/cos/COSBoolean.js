function COSBoolean(value) {
	this.value = value;
}

COSBoolean.prototype.toString = function() {
	return "COSBoolean: " + this.value;
};
COSBoolean.TRUE = new COSBoolean(true);
COSBoolean.FALSE = new COSBoolean(false);