goog.provide("trapeze.function.PDFFunction");
goog.require("trapeze.function.FunctionType0");
trapeze.function.PDFFunction = function() {
}
trapeze.function.PDFFunction.TYPE_0 = 0;
trapeze.function.PDFFunction.TYPE_2 = 2;
trapeze.function.PDFFunction.TYPE_3 = 3;
trapeze.function.PDFFunction.TYPE_4 = 4;
/**
 * Builds the pdf function.
 * @return PDFFunction
 */
trapeze.function.PDFFunction.getFunction = function(obj) {
	var pdfFunction;
	var type;
	var domain = null;
	var range = null;

	// read the function type (required)
	var dictObj = obj.dictionary;
	var typeObj = dictObj.getDictionaryObject ("FunctionType");
	if (typeObj == null) {
		throw new PDFParseException (
				"No FunctionType specified in function!");
	}
	type = typeObj.value;

	// read the function's domain (required)
	var domainObj = dictObj.getDictionaryObject("Domain");
	if (domainObj == null) {
		throw new PDFParseException ("No Domain specified in function!");
	}

	var domainAry = domainObj;
	var domainArySize = domainObj.size();
	domain = new Array(domainArySize);
	for (var i = 0; i < domainArySize; i++) {
		domain[i] = domainAry.getObject(i).value;
	}

	// read the function's range (optional)
	var rangeObj = dictObj.getDictionaryObject("Range");
	if (rangeObj != null) {
		var rangeAry = rangeObj;
		var rangeArySize = rangeObj.size();
		range = new Array(rangeArySize);
		for (var i = 0; i < rangeArySize; i++) {
			range[i] = rangeAry.getObject(i).value;
		}
	}

	// now create the acual function object
	switch (type) {
		case trapeze.function.PDFFunction.TYPE_0:
			if (rangeObj == null) {
				throw new PDFParseException (
						"No Range specified in Type 0 Function!");
			}
			pdfFunction = new trapeze.function.FunctionType0();
			break;
		case trapeze.function.PDFFunction.TYPE_2:
			pdfFunction = new FunctionType2();
			break;
		case trapeze.function.PDFFunction.TYPE_3:
			pdfFunction = new FunctionType3();
			break;
		case trapeze.function.PDFFunction.TYPE_4:
			if (rangeObj == null) {
				throw new PDFParseException (
						"No Range specified in Type 4 Function!");
			}
			pdfFunction = new FunctionType4();
			break;
		default:
			throw new PDFParseException (
					"Unsupported function type: " + type);
	}

	// fill in the domain and optionally the range
	pdfFunction.setDomain(domain);
	if (range != null) {
		pdfFunction.setRange(range);
	}

	// now initialize the function
	pdfFunction.parse (obj);

	return pdfFunction;
}
/**
 * Get the number of inputs, <i>m</i>, required by this function
 *
 * @return the number of input values expected by this function
 */
trapeze.function.PDFFunction.prototype.getNumInputs = function() {
	return (this.domain.length / 2);
}
/**
 * Get the number of outputs, <i>n</i>, returned by this function
 *
 * @return the number of output values this function will return
 */
trapeze.function.PDFFunction.prototype.getNumOutputs = function() {
	if (this.range == null) {
		return 0;
	}
	return (this.range.length / 2);
}
/**
 *  Set the domain of this function
 */
trapeze.function.PDFFunction.prototype.setDomain = function(domain) {
	this.domain = domain;
}
/**
 * Set the range of this function
 */
trapeze.function.PDFFunction.prototype.setRange = function(range) {
	this.range = range;
}