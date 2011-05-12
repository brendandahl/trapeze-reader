function GlyfTable(ttf) {
	this.loca = ttf.getTable("loca");

	this.maxp = ttf.getTable("maxp");
	var numGlyphs = this.maxp.numGlyphs;

	this.glyfs = [];
	
	this.setData = function(data) {
        for (var i = 0; i < numGlyphs; i++) {
            var location = this.loca.offsets[i];
            var length = this.loca.getSize(i);
            
            if (length == 0) {
                // undefined glyph
                continue;
            }
            
            this.glyfs[i] = data.subStream(location, length);
        }
	};
	this.getGlyph = this.getGlyf = function(index) {
		var o = this.glyfs[index];
        if (o == null) {
            return null;
        }
        
        if (o instanceof StreamBuffer) {
            var g = Glyf.getGlyf(o);
            this.glyfs[index] = g;
            return g;
        } else {
            return o;
        }
	};
}