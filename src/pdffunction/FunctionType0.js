goog.provide("trapeze.pdffunction.FunctionType0");
goog.require("trapeze.pdffunction.PDFFunction");
goog.require("trapeze.StreamBuffer");
trapeze.pdffunction.FunctionType0 = function() {
	trapeze.pdffunction.FunctionType0.baseConstructor.call(this, trapeze.pdffunction.PDFFunction.TYPE0);
};
extend(trapeze.pdffunction.FunctionType0, trapeze.pdffunction.PDFFunction);
trapeze.pdffunction.FunctionType0.prototype.parse = function(obj) {
	// read the size array (required)
	var dictObj = obj.dictionary;
	var sizeObj = dictObj.getDictionaryObject("Size");
	if (sizeObj == null) {
		throw new PDFParseException("Size required for function type 0!");
	}
	var sizeAry = sizeObj.getArray();
	var size = new Array(sizeAry.length);
	for (var i = 0; i < sizeAry.length; i++) {
		size[i] = sizeAry[i].value;
	}
	this.setSize(size);

	// read the # bits per sample (required)
	var bpsObj = dictObj.getDictionaryObject("BitsPerSample");
	if (bpsObj == null) {
		throw new PDFParseException("BitsPerSample required for function type 0!");
	}
	this.setBitsPerSample(bpsObj.value);
	
	// read the order (optional)
	var orderObj = dictObj.getDictionaryObject("Order");
	if (orderObj != null) {
		this.setOrder(orderObj.value);
	}
	
	// read the encode array (optional)
	var encodeObj = dictObj.getDictionaryObject("Encode");
	if (encodeObj != null) {
		var encodeAry = encodeObj.getArray();
		var encode = new Array(encodeAry.length);
		for (var i = 0; i < encodeAry.length; i++) {
			encode[i] = encodeAry[i].value;
		}
		this.setEncode(encode);
	}
	
	// read the decode array (optional)
	var decodeObj = dictObj.getDictionaryObject("Decode");
	if (decodeObj != null) {
		var decodeAry = decodeObj.getArray();
		var decode = new Array(decodeAry.length);
		for (var i = 0; i < decodeAry.length; i++) {
			decode[i] = decodeAry[i].value;
		}
		this.setDecode(decode);
	}
	
	// finally, read the samples
	this.setSamples(this.readSamples(new trapeze.StreamBuffer(obj.decode())));
};
trapeze.pdffunction.FunctionType0.prototype.setSize = function(size) {
	this.size = size;
};
/**
 * Get the size of a given input dimension
 *
 * @param dimension the input dimension to get the size of
 * @return the number of samples in the given dimension
 */
trapeze.pdffunction.FunctionType0.prototype.getSize = function(dimension) {
	return this.size[dimension];
};
/** 
 * Get the number of bits per sample
 */
trapeze.pdffunction.FunctionType0.prototype.getBitsPerSample = function() {
	return this.bitsPerSample;
};
trapeze.pdffunction.FunctionType0.prototype.setBitsPerSample = function(bits) {
	this.bitsPerSample = bits;
};
trapeze.pdffunction.FunctionType0.prototype.setOrder = function(order) {
	this.order = order;
};
trapeze.pdffunction.FunctionType0.prototype.setEncode = function(encode) {
	this.encode = encode;
};
trapeze.pdffunction.FunctionType0.prototype.setDecode = function(decode) {
	this.decode = decode;
};
/**
 * Set the table of samples
 */
trapeze.pdffunction.FunctionType0.prototype.setSamples = function(samples) {
	this.samples = samples;
};
 /**
 * Read the samples from the input stream.  Each sample is made up
 * of <i>n</i> components, each of which has length <i>bitsPerSample</i>
 * bits.  The samples are arranged by dimension, then range
 */
trapeze.pdffunction.FunctionType0.prototype.readSamples = function(buf) {
	// calculate the number of samples in the table
	var size = 1;
	for (var i = 0; i < this.getNumInputs(); i++) {
		size *= this.getSize(i);
	}
	
	// create the samples table
	var samples = new Array(size);
	var outputs = this.getNumOutputs();
	for(var i = 0; i < size; i++) {
		samples[i] = new Array(outputs);
	}
	
	
	// the current location in the buffer, in bits from byteLoc
	var bitLoc = 0;
	  
	// the current location in the buffer, in bytes
	var byteLoc = 0;
  
	// the current index in the samples array
	var index = 0;
	
	for (var i = 0; i < this.getNumInputs(); i++) {
		for (var j = 0; j < this.getSize(i); j++) {
			for (var k = 0; k < this.getNumOutputs(); k++) {
				/** [JK FIXME one bit at a time is really inefficient */
				var value = 0;
				
				var toRead = this.getBitsPerSample();
				var curByte = buf.getAt(byteLoc);
				
				while (toRead > 0) {
					var nextBit = ((curByte >> (7 - bitLoc)) & 0x1);
					value |= nextBit << (toRead - 1);
					
					if (++bitLoc == 8) {
						bitLoc = 0;
						byteLoc++;
						
						if (toRead > 1) {
							curByte = buf.getAt(byteLoc);
						}
					}
					
					toRead--;
				}
				
				samples[index][k] = value;
			}
			
			index++;
		}
	}
	
	return samples;
};