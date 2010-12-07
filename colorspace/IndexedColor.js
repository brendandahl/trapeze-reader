/**
 * create a new IndexColor PDFColorSpace based on another PDFColorSpace,
 * a count of colors, and a stream of values.  Every consecutive n bytes
 * of the stream is interpreted as a color in the base ColorSpace, where
 * n is the number of components in that color space.
 *
 * @param PDFColorSpace base the color space in which the data is interpreted
 * @param int count the number of colors in the table
 * @param PDFObject stream a stream of bytes.  The number of bytes must be count*n,
 * where n is the number of components in the base colorspace.
 */
function IndexedColor(base, count, stream) {
	IndexedColor.baseConstructor.call(this, null);
	/**
     * r,g,and b components of the color table as a single array, for
     * Java's IndexColorModel */
    this.finalcolors;
    /** the color table */
    this.table;
    /** size of the color table */
    this.count;
    /** number of channels in the base Color Space (unused) */
    this.nchannels = 1;

	count++;
	this.count = count;
	var value;
	if(stream instanceof COSString)
		value = stream.value;
	else if(stream instanceof COSStream)
		value = stream.decode();
	else
		throw new UnimplementedException("Unknown type of indexed colorspace");

	var data = new StreamBuffer(value);
	this.nchannels = base.getNumComponents();
	var offSized = (data.getLimit() / this.nchannels) < count;
	this.finalcolors = new Array(3 * count);
	this.table = new Array(count);
	var comps = new Array(this.nchannels);
	var loc = 0;
	var finalloc = 0;
	var temp = data.toByteArray();
	for (var i = 0; i < count; i++) {
		for (var j = 0; j < comps.length; j++) {
			if (loc < data.getLimit()) { // added convert to int
				comps[j] = (data.getByteAt(loc++) & 0xff) / 255.0;
			} else {
				comps[j] = 1.0;
			}
		}
		this.table[i] = base.getPaint(comps); //.getPaint();
		this.finalcolors[finalloc++] = this.table[i][0];//.getRed();
		this.finalcolors[finalloc++] = this.table[i][1];//.getGreen();
		this.finalcolors[finalloc++] = this.table[i][2];//.getBlue();
	}
}
extend(IndexedColor, PDFColorSpace);
/**
 * get the number of components of this colorspace (1)
 */
IndexedColor.prototype.getNumComponents = function() {
	return 1;
}
/**
 * get the color represented by the index.
 * @param components an array of exactly one integer number whose
 * value is between 0 and the size of the color table - 1.
 */
IndexedColor.prototype.getPaint = function(components) {
	if(!this.table[components[0]])
		throw new ParseException("Unknown indexed color for index " + components[0]);
	return this.table[components[0]];
}
IndexedColor.prototype.toRGB = function(components) {
	return this.getPaint(components);
}
IndexedColor.prototype.toString = function() {
	return 'IndexedColor';
}