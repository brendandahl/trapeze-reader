goog.provide("trapeze.font.PDFGlyph");
goog.require("trapeze.cos.COSStream");
trapeze.font.PDFGlyph = function(src, name, shape, advance) {
	this.shape = shape;
	this.advance = advance;
	this.src = src;
	this.name = name;
};
trapeze.font.PDFGlyph.prototype.render = function(graphics, engine) {
	// first do the affine transformation
	if(this.shape instanceof trapeze.cos.COSStream) { // Type3Font stream of pdf commands
		console.warn("todo type3font");
		//engine.streamEngine.processSubStream( null, null, this.shape);
	} else {
		if(this.shape.commands != null) {
			for(var i = 0; i < this.shape.commands.length; i++) {
				command = this.shape.commands[i];
				graphics[command[0]].apply(graphics, command[1]);
			}
		}
	}
	return this.advance;
};
trapeze.font.PDFGlyph.prototype.getChar = function() {
	return this.src;
};