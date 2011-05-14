goog.provide("trapeze.cos.COSBoolean");
trapeze.cos.COSBoolean = function(value) {
	this.value = value;
}

trapeze.cos.COSBoolean.prototype.toString = function() {
	return "COSBoolean: " + this.value;
};
trapeze.cos.COSBoolean.TRUE = new trapeze.cos.COSBoolean(true);
trapeze.cos.COSBoolean.FALSE = new trapeze.cos.COSBoolean(false);