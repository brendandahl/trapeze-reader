goog.require("trapeze.cos.COSArray");
goog.require("trapeze.cos.COSStreamArray");
function PDStream(stream) {
	this.stream = stream;
	this.getStream = function() {
		return this.stream;
	};
}
/**
 * Create a pd stream from either a regular COSStream on a COSArray of cos streams.
 * @param base Either a COSStream or COSArray.
 * @return A PDStream or null if base is null.
 * @throws IOException If there is an error creating the PDStream.
 */
PDStream.createFromCOS = function(base) {
	var retval = null;
	if( base instanceof trapeze.cos.COSStream) {
		retval = new PDStream(base);
	} else if(base instanceof trapeze.cos.COSArray) {
		retval = new PDStream( new trapeze.cos.COSStreamArray( base ) );
	} else {
		if(base != null) {
			throw new IOException("Contents are unknown type:" + base.getClass().getName());
		}
	}
	return retval;
}