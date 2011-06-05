goog.provide("trapeze.font.HmtxTable");
trapeze.font.HmtxTable = function(ttf) {
	// the number of glyphs stored in the maxp table may be incorrect
	// in the case of subsetted fonts produced by some pdf generators
	var maxp = ttf.getTable("maxp");
	var numGlyphs = maxp.numGlyphs;

	var hhea = ttf.getTable("hhea");
	var numOfLongHorMetrics = hhea.numOfLongHorMetrics;

	this.advanceWidths = []; //new short[numOfLongHorMetrics];
	this.leftSideBearings = []; //new short[numGlyphs]; 
	this.setData = function(data) {
		// some PDF writers subset the font but don't update the number of glyphs in the maxp table,
        // this would appear to break the TTF spec.
        // A better solution might be to try and override the numGlyphs in the maxp table based
        // on the number of entries in the cmap table or by parsing the glyf table, but this
        // appears to be the only place that gets affected by the discrepancy... so far!...
        // so updating this allows it to work.
        var i;
        // only read as much data as is available
        for (i = 0; i < numGlyphs && data.hasRemaining(); i++) {
            if (i < numOfLongHorMetrics) {
                this.advanceWidths[i] = data.getShort();
            }
            
            this.leftSideBearings[i] = data.getShort();
        }
        // initialise the remaining advanceWidths and leftSideBearings to 0
        if (i < numOfLongHorMetrics) {
            for(var j = i; j < numOfLongHorMetrics; j++)
				this.advanceWidths[i] = 0;
        }
        if (i < numGlyphs) {
            for(var j = i; j < numGlyphs; j++)
				this.leftSideBearings[i] = 0;
        }
	};
	/** get the advance of a given glyph */
    this.getAdvance = function(glyphID) {
        if (glyphID < this.advanceWidths.length) {
            return this.advanceWidths[glyphID];
        } else {
            return this.advanceWidths[this.advanceWidths.length - 1];
        }
    };
};