function HheaTable() {
	this.setData = function(data) {
		/* if (data.remaining() != 36) {
            throw new IllegalArgumentException("Bad Head table size");
        } */
        this.version = data.getInt();
        this.ascent = data.getShort();
        this.descent = data.getShort();
        this.lineGap = data.getShort();
        this.advanceWidthMax = data.getShort();
        this.minLeftSideBearing = data.getShort();
        this.minRightSideBearing = data.getShort();
        this.xMaxExtent = data.getShort();
        this.caretSlopeRise = data.getShort();
        this.caretSlopeRun = data.getShort();
        this.caretOffset = data.getShort();
        
        // padding
        data.getShort();
        data.getShort();
        data.getShort();
        data.getShort();
        
        this.metricDataFormat = data.getShort();
        this.numOfLongHorMetrics = data.getShort();
	};
}