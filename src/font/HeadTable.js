function HeadTable() {
	this.setData = function(data) {
		this.version = data.getInt();
        this.fontRevision = data.getInt();
        this.checksumAdjustment = data.getInt();
        this.magicNumber = data.getInt();
        this.flags = data.getShort();
        this.unitsPerEm = data.getShort();
        this.created = data.getLong();
        this.modified = data.getLong();
        this.xMin = data.getShort();
        this.xMax = data.getShort();
        this.yMin = data.getShort();
        this.yMax = data.getShort();
        this.macStyle = data.getShort();
        this.lowestRecPPem = data.getShort();
        this.fontDirectionHint = data.getShort();
        this.indexToLocFormat = data.getShort();
        this.glyphDataFormat = data.getShort();
	};
}