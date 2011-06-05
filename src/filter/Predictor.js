goog.provide("trapeze.filter.Predictor");
goog.require("trapeze.filter.PNGPredictor");
trapeze.filter.Predictor = function() {
	/** the algorithm to use */
	this._algorithm;

	/** the number of colors per sample */
	this._colors = 1;

	/** the number of bits per color component */
	this._bpc = 8;

	/** the number of columns per row */
	this._columns = 1;
};
/**
 * Get the algorithm in use
 *
 * @return one of the known algorithm types
 */
trapeze.filter.Predictor.prototype.getAlgorithm = function() {
	return this._algorithm;
};

/**
 * Get the number of colors per sample
 */
trapeze.filter.Predictor.prototype.getColors = function() {
	return this._colors;
};

/**
 * Set the number of colors per sample
 */
trapeze.filter.Predictor.prototype.setColors = function(colors) {
	this._colors = colors;
};

/**
 * Get the number of bits per color component
 */
trapeze.filter.Predictor.prototype.getBitsPerComponent = function() {
	return this._bpc;
};

/**
 * Set the number of bits per color component
 */
trapeze.filter.Predictor.prototype.setBitsPerComponent = function(bpc) {
	this._bpc = bpc;
};

/**
 * Get the number of columns
 */
trapeze.filter.Predictor.prototype.getColumns = function() {
	return this._columns;
};

/**
 * Set the number of columns
 */
trapeze.filter.Predictor.prototype.setColumns = function(columns) {
	this._columns = columns;
};

trapeze.filter.Predictor.getPredictor = function(params) {
 // get the algorithm (required)
	var algorithmObj = params.getDictionaryObject("Predictor");
	if (algorithmObj == null) {
		// no predictor
		return null;
	}
	var algorithm = algorithmObj.value;

	// create the predictor object
	var predictor = null;
	switch (algorithm) {
		case 1:
			// no predictor
			return null;
		case 2:
			throw new UnimplementedException("Tiff Predictor not supported");
		case 10:
		case 11:
		case 12:
		case 13:
		case 14:
		case 15:
			predictor = new trapeze.filter.PNGPredictor();
			break;
		default:
			throw new PDFParseException("Unknown predictor: " + algorithm);
	}
	
	// read the colors (optional)
	var colorsObj = params.getDictionaryObject("Colors");
	if (colorsObj != null) {
		predictor.setColors(colorsObj.value);
	}
	
	// read the bits per component (optional)
	var bpcObj = params.getDictionaryObject("BitsPerComponent");
	if (bpcObj != null) {
		predictor.setBitsPerComponent(bpcObj.value);
	}
	
	// read the columns (optional)
	var columnsObj = params.getDictionaryObject("Columns");
	if (columnsObj != null) {
		predictor.setColumns(columnsObj.value);
	}
	
	// all set
	return predictor;
};