goog.provide("trapeze.PDFOperator");
trapeze.PDFOperator = function(operator) {
	this.operator = operator;
};
trapeze.PDFOperator.getOperator = function(operator) {
	return new trapeze.PDFOperator(operator);
};