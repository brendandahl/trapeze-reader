function AffineTransform(m00, m10, m01, m11, m02, m12) {
	if(arguments.length == 0) {
		m00 = 1; // Scale X = 		m00
		m10 = 0; // Shear Y = 		m10
		m01 = 0; // Shear X = 		m01
		m11 = 1; // Scale Y = 		m11
		m02 = 0; // Translation X = 	m02
		m12 = 0; // Translation Y = 	m12
	}
	this.m00 = m00; // Scale X = 		m00
	this.m10 = m10; // Shear Y = 		m10
	this.m01 = m01; // Shear X = 		m01
	this.m11 = m11; // Scale Y = 		m11
	this.m02 = m02; // Translation X = 	m02
	this.m12 = m12; // Translation Y = 	m12
}
AffineTransform.prototype = {
	/**
     * This will take the current AffineTransform and multipy it with a AffineTransform that is passed in.
     *
     * @param b The AffineTransform to multiply by.
     *
     * @return The result of the two multiplied matrices.
     */
    multiply: function(b) {
        var result = new AffineTransform();

        if (b != null) 
        {
            result.m00 = this.m00 * b.m00 + this.m01 * b.m10;
            result.m01 = this.m00 * b.m01 + this.m01 * b.m11;
            result.m02 = this.m00 * b.m02 + this.m01 * b.m12 + this.m02;
            result.m10 = this.m10 * b.m00 + this.m11 * b.m10;
            result.m11 = this.m10 * b.m01 + this.m11 * b.m11;
            result.m12 = this.m10 * b.m02 + this.m11 * b.m12 + this.m12;
        }
		else { console.error('no AffineTransform'); }
        return result;
    },
	/**
     * This will return a string representation of the AffineTransform.
     *
     * @return The AffineTransform as a string.
     */
	toString: function() {
        var result = "";
        result += "[[";
        result += this.m00 + ", ";
        result += this.m01 + ", ";
        result += this.m02 + "][";
        result += this.m10 + ", ";
        result += this.m11 + ", " ;
        result += this.m12 + "]]";

        return result;
    },
	getDeterminant: function() {
		return this.m00 * this.m11 - this.m01 * this.m10;
	},
	/*
	this.createInverse = function() {
		new funkytown();
		var result = new AffineTransform();
		var mult = 1 / this.getDeterminant();
		var resultAffineTransform = result.single;
		resultAffineTransform[0] = mult*(single[4]*1-0);
		resultAffineTransform[1] = mult*(0-single[1]*1);
		resultAffineTransform[2] = mult*(single[1]*single[5]-single[2]*single[4]);
		resultAffineTransform[3] = mult*(0-single[3]*single[8]);
		resultAffineTransform[4] = mult*(single[0]*1-0);
		resultAffineTransform[5] = mult*(single[2]*single[3]-single[0]*single[5]);
		resultAffineTransform[6] = mult*(0-0);
		resultAffineTransform[7] = mult*(0-0);
		resultAffineTransform[8] = mult*(single[0]*single[4]-single[1]*single[3]);
		return result;
	};*/

	getScaleX: function() {
		return this.m00;
	},
	getScaleY: function() {
		return this.m11;
	},
	clone: function() {
		return new AffineTransform(this.m00, this.m10, this.m01, this.m11, this.m02, this.m12);
	},
	scale: function(x, y) {
		var scalor = AffineTransform.getScaleInstance(x, y);
		return this.multiply(scalor);
	},
	translate: function(x, y) {
		var scalor = AffineTransform.getTranslatingInstance(x, y);
		return this.multiply(scalor);
	},
	transform: function(pt) {
		return {x: pt.x * this.m00 + pt.y * this.m01 + this.m02,
				y: pt.x * this.m10 + pt.y * this.m11 + this.m12};
	}
}
AffineTransform.getScaleInstance = function(x, y) {
	var affineTransform = new AffineTransform();
	affineTransform.m00 = x;
	affineTransform.m11 = y;
	return affineTransform;
};
AffineTransform.getTranslatingInstance = function(x, y) {
	var affineTransform = new AffineTransform();
	affineTransform.m02 = x;
	affineTransform.m12 = y;
	return affineTransform;
};