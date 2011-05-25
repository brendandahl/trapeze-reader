goog.provide("trapeze.pdmodel.PDStream");
goog.require("trapeze.cos.COSArray");
goog.require("trapeze.cos.COSStreamArray");
trapeze.pdmodel.PDStream = function(stream) {
	this.stream = stream;
	this.getStream = function() {
		return this.stream;
	};
}
/**
 * Create a pd stream from either a regular COSStream on a COSArray of cos streams.
 * @param base Either a COSStream or COSArray.
 * @return A PDStream or null if base is null.
 * @throws IOException If there is an error creating the trapeze.pdmodel.PDStream.
 */
trapeze.pdmodel.PDStream.createFromCOS = function(base) {
	var retval = null;
	if( base instanceof trapeze.cos.COSStream) {
		retval = new trapeze.pdmodel.PDStream(base);
	} else if(base instanceof trapeze.cos.COSArray) {
		retval = new trapeze.pdmodel.PDStream( new trapeze.cos.COSStreamArray( base ) );
	} else {
		if(base != null) {
			throw new IOException("Contents are unknown type:" + base.getClass().getName());
		}
	}
	return retval;
}