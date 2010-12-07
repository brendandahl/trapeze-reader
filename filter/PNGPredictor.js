function PNGPredictor() {
	PNGPredictor.baseConstructor.call(this);
}
extend(PNGPredictor, Predictor);
/**
 * Undo data based on the png algorithm
 */
PNGPredictor.prototype.unpredict = function(imageData) {
	var rows = [];
	
	var curLine = null;
	var prevLine = null;
	imageData = new StreamBuffer(imageData);
	// get the number of bytes per row
	var rowSize = this.getColumns() * this.getColors() * this.getBitsPerComponent();
	rowSize = Math.ceil(rowSize / 8.0);
	
	while(imageData.remaining() >= rowSize + 1) {
		// the first byte determines the algorithm
		var pos = imageData.getPosition();
		var algorithm = imageData.getByteAt(pos++); // convert to unsigned byte
		imageData.setPosition(pos);
		
		// read the rest of the line
		curLine = new Array(rowSize);
		imageData.getBulk(curLine);
		
		// use the algorithm, Luke
		switch (algorithm) {
			case 0:
				// none
				break;
			case 1:
				this.doSubLine(curLine);
				break;
			case 2:
				this.doUpLine(curLine, prevLine);
				break;
			case 3:
				this.doAverageLine(curLine, prevLine);
				break;
			case 4:
				this.doPaethLine(curLine, prevLine);
				break;
		}
		
		rows.push(curLine);
		prevLine = curLine;
	}
	// turn into byte array
	var outBuf = new Array(rows.length * rowSize);
	var outBufLength = outBuf.length;
	var numberOfRows = rows.length;
	var index = 0;
	for (var i = 0; i < numberOfRows; i++) {
		for(var j = 0; j < rowSize; j++) {
			var value = rows[i][j];
/* 			if(value < 0)
				outBuf[index] = value + 256;
			else */
				outBuf[index] = value;
			index++;
		}
	}
	
	// reset start pointer
	//outBuf.flip();
	
	return String.fromCharCode.apply(this, outBuf);
	
}

/**
 * Return the value of the Sub algorithm on the line (compare bytes to
 * the previous byte of the same color on this line).
 */
PNGPredictor.prototype.doSubLine = function(curLine) {
	// get the number of bytes per sample
	var sub = Math.ceil((this.getBitsPerComponent() * this.getColors()) / 8.0); 
	
	for (var i = 0; i < curLine.length; i++) {
		var prevIdx = i - sub;
		if (prevIdx >= 0) {
			curLine[i] += curLine[prevIdx];
		}
	}
}

/**
 * Return the value of the up algorithm on the line (compare bytes to
 * the same byte in the previous line)
 */
PNGPredictor.prototype.doUpLine = function(curLine, prevLine) {
	if (prevLine == null) {
		// do nothing if this is the first line
		return;
	}
	
	for (var i = 0; i < curLine.length; i++) {
		curLine[i] += prevLine[i];
	}
}

/**
 * Return the value of the average algorithm on the line (compare
 * bytes to the average of the previous byte of the same color and 
 * the same byte on the previous line)
 */
PNGPredictor.prototype.doAverageLine = function(curLine, prevLine) {
	 // get the number of bytes per sample
	var sub = Math.ceil((this.getBitsPerComponent() * this.getColors()) / 8.0); 
	
	for (var i = 0; i < curLine.length; i++) {
		var raw = 0;
		var prior = 0;
		
		// get the last value of this color
		var prevIdx = i - sub;
		if (prevIdx >= 0) {
			raw = curLine[prevIdx] & 0xff;
		}
		
		// get the value on the previous line
		if (prevLine != null) {
			prior = prevLine[i] & 0xff;
		}
		
		// add the average
		curLine[i] += Math.floor((raw + prior) / 2); // cast to (byte)
	}      
}

 /**
 * Return the value of the average algorithm on the line (compare
 * bytes to the average of the previous byte of the same color and 
 * the same byte on the previous line)
 */
PNGPredictor.prototype.doPaethLine = function(curLine, prevLine) {
	 // get the number of bytes per sample
	var sub = Math.ceil((this.getBitsPerComponent() * this.getColors()) / 8.0); 
	
	for (var i = 0; i < curLine.length; i++) {
		var left = 0;
		var up = 0;
		var upLeft = 0;
		
		// get the last value of this color
		var prevIdx = i - sub;
		if (prevIdx >= 0) {
			left = curLine[prevIdx] & 0xff;
		}
		
		// get the value on the previous line
		if (prevLine != null) {
			up = prevLine[i] & 0xff;
		}
		
		if (prevIdx > 0 && prevLine != null) {
			upLeft = prevLine[prevIdx] & 0xff;
		}
		
		// add the average
		curLine[i] += this.paeth(left, up, upLeft); // cast to (byte)
	}      
}

/**
 * The paeth algorithm
 */
PNGPredictor.prototype.paeth = function(left, up, upLeft) {
	var p = left + up - upLeft;
	var pa = Math.abs(p - left);
	var pb = Math.abs(p - up);
	var pc = Math.abs(p - upLeft);
	
	if ((pa <= pb) && (pa <= pc)) {
		return left;
	} else if (pb <= pc) {
		return up;
	} else {
		return upLeft;
	}
}