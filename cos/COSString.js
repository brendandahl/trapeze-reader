function COSString(value) {
	this.value = value;
}
COSString.prototype = {
	toString: function(depth) {
		depth = depth || 0;
		return "\t".repeat(depth) + "COSString: " + this.value;
	}
}
/**
 * This will create a COS string from a string of hex characters.
 *
 * @param hex A hex string.
 * @return A cos string with the hex characters converted to their actual bytes.
 * @throws IOException If there is an error with the hex string.
 */
COSString.createFromHexString = function(hex) {
	var retval = "";
	// First make sure we only have hex chars in the string
	// TODO we could probably stream line this
	var hexBuffer = "";
	var len = hex.length;
	for(var i=0; i < len; i++) {
		var c = hex.charAt(i);
		if((c >= '0' && c <= '9') || (c >= 'a' && c <= 'f') || (c >= 'A' && c <= 'F'))
			hexBuffer += c;
	}
	//if odd number then the last hex digit is assumed to be 0
	if( hexBuffer.length % 2 == 1 ) {
		hexBuffer += "0";
	}
	
	for(var i=0; i<hexBuffer.length;) {
		var hexChars = hexBuffer.charAt( i++ ) + hexBuffer.charAt( i++ );
		retval += String.fromCharCode(parseInt(hexChars, 16));
	}
	var cosString = new COSString(retval);
	// TODO remove this after we make sure the above is correct
	cosString.cameFromHEX = true;
	return cosString;
}