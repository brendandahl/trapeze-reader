goog.provide("trapeze.font.MaxpTable");
trapeze.font.MaxpTable = function() {
	this.setData = function(data) {
		this.version = data.getInt();
        this.numGlyphs = data.getShort();
        this.maxPoints = data.getShort();
        this.maxContours = data.getShort();
        this.maxComponentPoints = data.getShort();
        this.maxComponentContours = data.getShort();
        this.axZones = data.getShort();
        this.maxTwilightPoints = data.getShort();
        this.maxStorage = data.getShort();
        this.maxFunctionDefs = data.getShort();
        this.maxInstructionDefs = data.getShort();
        this.maxStackElements = data.getShort();
        this.maxSizeOfInstructions = data.getShort();
        this.maxComponentElements = data.getShort();
        this.maxComponentDepth = data.getShort();
	}
}
