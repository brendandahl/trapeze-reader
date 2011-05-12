function PostTable() {
	this._nameMap;
}
PostTable.prototype.setData = function(data) {
	// TODO
	this.format = data.getInt();
	this.italicAngle = data.getInt();
	this.underlinePosition = data.getShort();
	this.underlineThickness = data.getShort();
	this.isFixedPitch = data.getShort();
	data.getShort();
	this.minMemType42 = data.getInt();
	this.maxMemType42 = data.getInt();
	this.minMemType1 = data.getInt();
	this.maxMemType1 = data.getInt();
	// create the map, based on the type
	switch (this.format) {
		case 0x10000:
			// TODO
			this._nameMap = new PostMapFormat0();
			break;
		case 0x20000:
			// TODO
			this._nameMap = new PostMapFormat2();
			break;
		case 0x30000:
			// empty post map.
			this._nameMap = new PostMap();
			break;
		default:
			// TODO
			this._nameMap = new PostMap();
			System.out.println("Unknown post map type: " + 
							   Integer.toHexString(format));
			break;
	}
	
	// fill in the data in the map
	this._nameMap.setData(data);
}
/**
 * Map a character name to a glyphNameIndex
 */
PostTable.prototype.getGlyphNameIndex = function(name) {
	return this._nameMap.getCharIndex(name);
}



/** An empty post map */
function PostMap() {
}
/** map a name to a character index */
PostMap.prototype.getCharIndex = function(charName) {
	return 0;
}
	
/** name a character index to a name */
PostMap.prototype.getCharName = function(charIndex) {
	return null;
}

/** get the length of the data in this map */
PostMap.prototype.getLength = function() {
	return 0;
}

/** get the data in this map as a ByteBuffer */
PostMap.prototype.getData = function() {
	return ByteBuffer.allocate(0);
}

/** set the data in this map from a ByteBuffer */
PostMap.prototype.setData = function(data) {
	// do nothing
	return;
}

 /** A Format 0 post map */
function PostMapFormat0() {
	PostMapFormat0.baseConstructor.call(this);
}
extend(PostMapFormat0, PostMap);
/** the glyph names in standard Macintosh ordering */
PostMapFormat0.stdNames = [
/* 0 */     ".notdef", ".null", "nonmarkingreturn", "space", "exclam", "quotedbl", "numbersign", "dollar",
/* 8 */     "percent", "ampersand", "quotesingle", "parenleft", "parenright", "asterisk", "plus", "comma",
/* 16 */    "hyphen", "period", "slash", "zero", "one", "two", "three", "four",
/* 24 */    "five", "six", "seven", "eight", "nine", "colon", "semicolon", "less", 
/* 32 */    "equal", "greater", "question", "at", "A", "B", "C", "D",
/* 40 */    "E", "F", "G", "H", "I", "J", "K", "L",
/* 48 */    "M", "N", "O", "P", "Q", "R", "S", "T", 
/* 56 */    "U", "V", "W", "X", "Y", "Z", "bracketleft", "ackslash",
/* 64 */    "bracketright", "asciicircum", "underscore", "grave", "a", "b", "c", "d",
/* 72 */    "e", "f", "g", "h", "i", "j", "k", "l", 
/* 80 */    "m", "n", "o", "p", "q", "r", "s", "t",
/* 88 */    "u", "v", "w", "x", "y", "z", "braceleft", "bar",
/* 96 */    "braceright", "asciitilde", "Adieresis", "Aring", "Ccedilla", "Eacute", "Ntilde", "Odieresis",
/* 104 */   "Udieresis", "aacute", "agrave", "acircumflex", "adieresis", "atilde", "aring", "ccedilla",
/* 112 */   "eacute", "egrave", "ecircumflex", "edieresis", "iacute", "igrave", "icircumflex", "idieresis",
/* 120 */   "ntilde", "oacute", "ograve", "ocircumflex", "odieresis", "otilde", "uacute", "ugrave", 
/* 128 */   "ucircumflex", "udieresis", "dagger", "degree", "cent", "sterling", "section", "bullet",
/* 136 */   "paragraph", "germandbls", "registered", "copyright", "trademark", "acute", "dieresis", "notequal",
/* 144 */   "AE", "Oslash", "infinity", "plusminus", "lessequal", "greaterequal", "yen", "mu",
/* 152 */   "partialdiff", "summation", "product", "pi", "integral", "ordfeminine", "ordmasculine", "Omega",
/* 160 */   "ae", "oslash", "questiondown", "exclamdown", "logicalnot", "radical", "florin", "approxequal",
/* 168 */   "Delta", "guillemotleft", "guillemotright", "ellipsis", "nonbreakingspace", "Agrave", "Atilde", "Otilde",
/* 176 */   "OE", "oe", "endash", "emdash", "quotedblleft", "quotedblright", "quoteleft", "quoteright",
/* 184 */   "divide", "lozenge", "ydieresis", "Ydieresis", "fraction", "currency", "guilsinglleft", "guilsinglright",
/* 192 */   "fi", "fl", "daggerdbl", "periodcentered", "quotesinglbase", "quotedblbase", "perthousand", "Acircumflex",
/* 200 */   "Ecircumflex", "Aacute", "Edieresis", "Egrave", "Iacute", "Icircumflex", "Idieresis", "Igrave",
/* 208 */   "Oacute", "Ocircumflex", "apple", "Ograve", "Uacute", "Ucircumflex", "Ugrave", "dotlessi",
/* 216 */   "circumflex", "tilde", "macron", "breve", "dotaccent", "ring", "cedilla", "hungarumlaut",
/* 224 */   "ogonek", "caron", "Lslash", "lslash", "Scaron", "scaron", "Zcaron", "zcaron",
/* 232 */   "brokenbar", "Eth", "eth", "Yacute", "yacute", "Thorn", "thorn", "minus",
/* 240 */   "multiply", "onesuperior", "twosuperior", "threesuperior", "onehalf", "onequarter", "threequarters", "franc",
/* 248 */   "Gbreve", "gbreve", "Idotaccent", "Scedilla", "scedilla", "Cacute", "cacute", "Ccaron",
/* 256 */   "ccaron", "dcroat"
];
	
/** map a name to a character index */
PostMapFormat0.prototype.getCharIndex = function(charName) {
	var length = PostMapFormat0.stdNames.length;
	for (var i = 0; i < length; i++) {
		if (charName == PostMapFormat0.stdNames[i]) {
			return i;
		}
	}
	
	return 0;
}
	
/** name a character index to a name */
PostMapFormat0.prototype.getCharName = function(charIndex) {
	return PostMapFormat0.stdNames[charIndex];
}

/** get the length of the data in this map */
PostMapFormat0.prototype.getLength = function() {
	return 0;
}

/** get the data in this map as a ByteBuffer */
PostMapFormat0.prototype.getData = function() {
	return ByteBuffer.allocate(0);
}

/** set the data in this map from a ByteBuffer */
PostMapFormat0.prototype.setData = function(data) {
	// do nothing
	return;
}



/** an extension to handle format 2 post maps */
function PostMapFormat2() {
	PostMapFormat2.baseConstructor.call(this);
	/** the glyph name index */
	this.glyphNameIndex;
	/** the glyph names */
	this.glyphNames;
}
extend(PostMapFormat2, PostMapFormat0);
	
/** Map a character name to an index */
PostMapFormat2.prototype.getCharIndex = function(charName) {
	// find the index of this character name
	var idx = -1;
	
	// first try the local names map
	var glyphNamesLength = this.glyphNames.length;
	for (var i = 0; i < glyphNamesLength; i++) {
		if (charName == this.glyphNames[i]) {
			// this is the value from the glyph name index
			idx = (PostMapFormat0.stdNames.length + i);
			break;
		}
	}
			
	// if that doesn't work, try the standard names
	if (idx == -1) {
		idx = PostMapFormat2.superClass.getCharIndex.call(this, charName);
	}
	
	// now get the entry in the index
	var glyphNameIndexLength = this.glyphNameIndex.length;
	for (var c = 0; c < glyphNameIndexLength; c++) {
		if (this.glyphNameIndex[c] == idx) {
			return c;
		}
	}
	
	// not found
	return 0;
}

/** Map an index to a character name */
PostMapFormat2.prototype.getCharName = function(charIndex) {
	if (charIndex >= PostMapFormat0.stdNames.length) {
		return this.glyphNames[charIndex - PostMapFormat0.stdNames.length];
	}
	
	return PostMapFormat2.superClass.getCharName(charIndex);
}

/** get the length of this class's data */
PostMapFormat2.prototype.getLength = function() {
	// the size of the header plus the table of mappings
	var size = 2 + (2 * this.glyphNameIndex.length);
	
	// the size of each string -- note the extra byte for a pascal
	// string
	var glyphNamesLength = this.glyphNames.length
	for (var i = 0; i < glyphNamesLength; i++) {
		size += this.glyphNames[i].length + 1;
	}
	
	return size;
}

/** set the contents of this map from a ByteBuffer */
PostMapFormat2.prototype.setData = function(data) {
	var numGlyphs = data.getShort();
	this.glyphNameIndex = new Array(numGlyphs);
	
	// the highest glyph index seen so far
	var maxGlyph = 257;
	for (var i = 0; i < numGlyphs; i++) {
		this.glyphNameIndex[i] = data.getShort();
			
		// see if this is the highest glyph
		if (this.glyphNameIndex[i] > maxGlyph) {
			maxGlyph = this.glyphNameIndex[i];
		}
	}
		
	// subtract off the default glyphs
	maxGlyph -= 257;
	
	// read in any additional names
	this.glyphNames = new Array(maxGlyph);
		
	// read each name from a pascal string
	// the length is stored in the first byte, followed by
	// the data
	for (var i = 0; i < maxGlyph; i++) {
		// size in the first byte
		var size = data.get();
				
		// then the data
		var glyphName = "";
		for(var j = 0; j < size; j++) {
			glyphName += String.fromCharCode(data.get());
		}
				
		this.glyphNames[i] = glyphName;
	}
}