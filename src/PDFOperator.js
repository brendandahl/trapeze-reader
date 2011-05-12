function PDFOperator(operator) {
	this.operator = operator;
}
PDFOperator.getOperator = function(operator) {
	return new PDFOperator(operator);
}