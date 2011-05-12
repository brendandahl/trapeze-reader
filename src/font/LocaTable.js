function LocaTable(ttf) {
	var maxp = ttf.getTable("maxp");
	var numGlyphs = maxp.numGlyphs;

	var head = ttf.getTable("head");
	var format = head.indexToLocFormat;
	this.isLong = (format == 1);

	this.offsets = [];
	
	this.setData = function(data) {
		for (var i = 0; i < (numGlyphs + 1); i++) {
            if (this.isLong) {
                this.offsets[i] = data.getInt();
            } else {
                this.offsets[i] = 2 * ( 0xFFFF & data.getShort());
            }
        }
	};
	/** 
     * get the size, in bytes, of the given glyph 
     */
	this.getSize = function(glyphID) {
        return this.offsets[glyphID + 1] - this.offsets[glyphID];
    }
}