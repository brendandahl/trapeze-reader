goog.provide("trapeze.font.Type1Font");
goog.require("trapeze.font.OutlineFont");
goog.require("trapeze.font.PSParser");
goog.require("trapeze.font.FontSupport");
goog.require("trapeze.StreamBuffer");
goog.require("trapeze.GeneralPath");
goog.require("trapeze.AffineTransform");

trapeze.font.Type1Font = function(baseFont, fontObj, descriptor) {
	trapeze.font.OutlineFont.call(this, baseFont, fontObj, descriptor);
	this.name2width;
	this.char2name;
	this.password = 0;
	this.at;
	this.subrs;
	this.lenIV;
	this.name2outline;
	/** the Type1 stack of command values */
    this.stack = [];
    /** the current position in the Type1 stack */
    this.sloc = 0;
    /** the stack of postscript commands (used by callothersubr) */
    this.psStack = [];
    /** the current position in the postscript stack */
    this.psLoc = 0;
	this.callcount = 0;
	
	if (descriptor != null && descriptor.fontFile != null) {
		// parse that file, filling name2outline and chr2name
		var start = descriptor.fontFile.dictionary.getDictionaryObject("Length1").value;
		var len = descriptor.fontFile.dictionary.getDictionaryObject("Length2").value;
		var font = new trapeze.StreamBuffer(descriptor.fontFile.decode());

		this.parseFontFromStream(font, start, len);
	}
}
goog.inherits(trapeze.font.Type1Font, trapeze.font.OutlineFont);


trapeze.font.Type1Font.prototype.parseFontFromStream = function(font, start, len) {
	this.name2width = {};

	var data = null;

	if (this.isASCII(font, start)) {
		//var bData = readASCII(font, start, start + len);
		//data = decrypt(bData, 0, bData.length, 55665, 4);
		// TODO
		throw "not done in type1font ascii";
	} else {
		data = trapeze.font.Type1Font.decrypt(font, start, start + len, 55665, 4);
	}
	var fontArray = [];
	var i = 0;
	while(font.hasRemaining())
	{
		font.setPosition(i);
		fontArray.push(font.getByteAt(i++));
	}
	// encoding is in cleartext area
	this.chr2name = this.readEncoding(fontArray);
	var lenIVLoc = this.findSlashName(data, "lenIV");
	
	var psp = new trapeze.font.PSParser(data, 0);
	if (lenIVLoc < 0) {
		this.lenIV = 4;
	} else {
		psp.setLoc(lenIVLoc + 6);
		this.lenIV = parseInt(psp.readThing());
	}
	this.password = 4330;
	var matrixloc = this.findSlashName(fontArray, "FontMatrix");
	if (matrixloc < 0) {
		System.out.println("No FontMatrix!");
		this.at = new trapeze.AffineTransform(0.001, 0, 0, 0.001, 0, 0);
	} else {
		var psp2 = new trapeze.font.PSParser(fontArray, matrixloc + 11);
		// read [num num num num num num]
		var xf = psp2.readArray(6);
		//	    System.out.println("FONT MATRIX: "+xf);
		this.at = new trapeze.AffineTransform(xf[0], xf[1], xf[2], xf[3], xf[4], xf[5]);
	}

	this.subrs = this.readArray(data, "Subrs", "index");
	this.name2outline = this.readChars(data);
};
/** 
 * Determine if data is in ASCII or binary format.  According to the spec,
 * if any of the first 4 bytes are not character codes ('0' - '9' or
 * 'A' - 'F' or 'a' - 'f'), then the data is binary.  Otherwise it is
 * ASCII
 */
trapeze.font.Type1Font.prototype.isASCII = function(data, start) {
	// look at the first 4 bytes
	for (var i = start; i < start + 4; i++) {
		// get the byte as a character
		var c = data.getByteAt(i);

		if (c >= '0' && c <= '9') {
			continue;
		} else if (c >= 'a' && c <= 'f') {
			continue;
		} else if (c >= 'A' && c <= 'F') {
			continue;
		} else {
			// out of range
			return false;
		}
	}
};

/**
 * parse the encoding portion of the font definition
 * @param d the font definition stream
 * @return an array of the glyphs corresponding to each byte
 */
trapeze.font.Type1Font.prototype.readEncoding = function(d) {
	var ary = this.readArray(d, "Encoding", "def");
	return ary;
	/*
	// TODO strip slash like below
	var res = []; //new String[256];
	for (int i = 0; i < ary.length; i++) {
		if (ary[i] != null) {
			if (ary[i][0] == '/') {
				res[i] = new String(ary[i]).substring(1);
			} else {
				res[i] = new String(ary[i]);
			}
		} else {
			res[i] = null;
		}
	}
	return res;
	*/
}
/**
 * read a named array out of the font definition.
 * <p>
 * this function attempts to parse an array out of a postscript
 * definition without doing any postscript.  It's actually looking
 * for things that look like "dup <i>id</i> <i>elt</i> put", and
 * placing the <i>elt</i> at the <i>i</i>th position in the array.
 * @param d the font definition stream
 * @param key the name of the array
 * @param end a string that appears at the end of the array
 * @return an array consisting of a byte array for each entry
 */
trapeze.font.Type1Font.prototype.readArray = function(d, key, end) {
	var i = this.findSlashName(d, key);
	if (i < 0) {
		// not found.
		return [[]]; //new byte[0][];
	}
	// now find things that look like "dup id elt put"
	// end at "def"
	var psp = new trapeze.font.PSParser(d, i);
	var type = psp.readThing();     // read the key (i is the start of the key)
	var val;
	type = psp.readThing();
	if (type == "StandardEncoding") {
		var stdenc = [];
		var length = trapeze.font.FontSupport.standardEncoding.length;
		for (i = 0; i < length; i++) {
			stdenc[i] = trapeze.font.FontSupport.getName(trapeze.font.FontSupport.standardEncoding[i]); //.getBytes();
		}
		return stdenc;
	}
	
	var len = parseInt(type);
	var out = []; //new byte[len][];
	var line;
	while (true) {
		var s = psp.readThing();
		if (s == "dup") {
			var id = parseInt(psp.readThing());
			var elt = psp.readThing();
			line = getBytes(elt);
			if (isDigit(elt.charAt(0))) {
				var hold = parseInt(elt);
				var special = psp.readThing();
				if (special == "-|" || special == "RD") {
					psp.setLoc(psp.getLoc() + 1);
					line = psp.getNEncodedBytes(hold, this.password, this.lenIV);
				}
			}
			out[id] = line;
		} else if (s  == end) {
			break;
		}
	}
	return out;
}
/**
 * get the index into the byte array of a slashed name, like "/name".
 * @param d the search array
 * @param name the name to look for, without the initial /
 * @return the index of the first occurance of /name in the array.
 */
trapeze.font.Type1Font.prototype.findSlashName = function(d, name) {
	var i;
	for (i = 0; i < d.length; i++) {
		if (d[i] == '/'.charCodeAt(0)) {
			// check for key
			var found = true;
			for (var j = 0; j < name.length; j++) {
				if (d[i + j + 1] != name.charCodeAt(j)) {
					found = false;
					break;
				}
			}
			if (found) {
				return i;
			}
		}
	}
	return -1;
}
/**
 * get the character definitions of the font.
 * @param d the font data
 * @return a HashMap that maps string glyph names to byte arrays of
 * decoded font data.
 */
trapeze.font.Type1Font.prototype.readChars = function(d) {
	// skip thru data until we find "/"+key
	var hm = {};
	var i = this.findSlashName(d, "CharStrings");
	if (i < 0) {
		// not found
		return hm;
	}
	var psp = new trapeze.font.PSParser(d, i);
	// read /name len -| [len bytes] |-
	// until "end"
	while (true) {
		var s = psp.readThing();
		var c = s.charAt(0);
		if (c == '/') {
			var len = parseInt(psp.readThing());
			var go = psp.readThing();  // it's -| or RD
			if (go == "-|" || go == "RD") {
				psp.setLoc(psp.getLoc() + 1);
				var line = psp.getNEncodedBytes(len, this.password, this.lenIV);
				hm[s.substring(1)] = line;
			}
		} else if (s == "end") {
			break;
		}
	}
	return hm;
}
/** 
 * Get the width of a given character
 *
 * This method is overridden to work if the width array hasn't been
 * populated (as for one of the 14 base fonts)
 */
trapeze.font.Type1Font.prototype.getWidth = function(code, name) {
	// we don't have first and last chars, so therefore no width array
	if (this.firstChar == -1 || this.lastChar == -1) {
		var key = this.chr2name[toSignedByte(code)];

		// use a name if one is provided
		if (name != null) {
			key = name;
		}

		if (key != null && this.name2outline[key] != null) {
			if (this.name2width[key] == null) {
				// glyph has not yet been parsed
				// getting the outline will force it to get read
				this.getOutlineByName(key, 0);
			}

			var width = this.name2width[key];
			if (width != null) {
				return width.x / this.getDefaultWidth();
			}
		}

		return 0;
	}

	// return the width that has been specified
	return trapeze.font.Type1Font.superClass_.getWidth.call(this, code, name);
}
/**
 * Get a glyph outline by name
 *
 * @param name the name of the desired glyph
 * @return the glyph outline, or null if unavailable
 */
trapeze.font.Type1Font.prototype.getOutlineByName = function(name, width) {
	// make sure we have a valid name
	if (name == null || this.name2outline[name] == null) {
		name = ".notdef";
	}

	// get whatever is stored in name. Could be a GeneralPath, could be byte[]
	var obj = this.name2outline[name];

	// if it's a byte array, it needs to be parsed
	// otherwise, just return the path
	if (obj instanceof trapeze.GeneralPath) {
		return obj;
	} else {
		var cs = obj;
		var advance = {};

		var gp = this.parseGlyph(cs, advance, this.at);

		if (width != 0 && advance.x != 0) {
			// scale the glyph to fit in the width
			var p = {"x": advance.x, "y": advance.y};
			p = this.at.transform(p);

			var scale = width / p.x;
			var xform = trapeze.AffineTransform.getScaleInstance(scale, 1.0);
			gp.transform(xform);
		}

		// put the parsed object in the cache
		this.name2outline[name] = gp;
		this.name2width[name] = advance;
		return gp;
	}
};
/**
 * Get a glyph outline by character code
 *
 * Note this method must always return an outline 
 *
 * @param src the character code of the desired glyph
 * @return the glyph outline
 */
trapeze.font.Type1Font.prototype.getOutlineByCode = function(src, width) {
	return this.getOutlineByName(this.chr2name[toSignedByte(src)], width);
}
 /**
 * Decrypt a glyph stored in byte form
 */
trapeze.font.Type1Font.prototype.parseGlyph = function(cs, advance, at) {
	var gp = new trapeze.GeneralPath();
	var curpoint = {"x": null, "y": null};

	this.sloc = 0;
	this.parse(cs, gp, curpoint, advance);

	gp.transform(at);
	return gp;
};
 /**
 * pop the next item off the stack
 */
trapeze.font.Type1Font.prototype.pop = function() {
	var val = 0;
	if (this.sloc > 0) {
		val = this.stack[--this.sloc];
	}
	return val;
}
/**
 * build an accented character out of two pre-defined glyphs.
 * @param x the x offset of the accent
 * @param y the y offset of the accent
 * @param a the index of the accent glyph
 * @param b the index of the base glyph
 * @param gp the GeneralPath into which the combined glyph will be
 * written.
 */
trapeze.font.Type1Font.prototype.buildAccentChar = function(x, y, a, b, gp) {
	// get the outline of the accent
	console.warn("build aaccent char not finished yet");
	/*
	var pathA = this.getOutlineByCode(String.fromCharCode(a), this.getWidth(String.fromCharCode(a), null));

	var xformA = this.at.createInverse();
	xformA = xformA.translate(x, y);
	pathA.transform(xformA);

	var pathB = this.getOutlineByCode(String.fromCharCode(b), this.getWidth(String.fromCharCode(b), null));

	var xformB = this.at.createInverse();
	pathB.transform(xformB);

	gp.append(pathB, false);
	gp.append(pathA, false); */
}
/**
 * parse glyph data into a GeneralPath, and return the advance width.
 * The working point is passed in as a parameter in order to allow
 * recursion.
 * @param cs the decrypted glyph data
 * @param gp a GeneralPath into which the glyph shape will be stored
 * @param pt a FlPoint object that will be used to generate the path
 * @param wid a FlPoint into which the advance width will be placed.
 */
trapeze.font.Type1Font.prototype.parse = function(cs, gp, pt, wid) {
	//	System.out.println("--- cmd length is "+cs.length);
	var loc = 0;
	var x1, x2, x3, y1, y2, y3;
	while (loc < cs.length) {
		var v = cs[loc++] & 0xff;
		if (v == 255) {
			this.stack[this.sloc++] = (((cs[loc]) & 0xff) << 24) +
					((( cs[loc + 1]) & 0xff) << 16) +
					((( cs[loc + 2]) & 0xff) << 8) +
					((( cs[loc + 3]) & 0xff));
			loc += 4;
//		System.out.println("Pushed long "+stack[sloc-1]);
		} else if (v >= 251) {
			this.stack[this.sloc++] = -((v - 251) << 8) - ((cs[loc]) & 0xff) - 108;
			loc++;
//		System.out.println("Pushed lo "+stack[sloc-1]);
		} else if (v >= 247) {
			this.stack[this.sloc++] = ((v - 247) << 8) + ((cs[loc]) & 0xff) + 108;
			loc++;
//		System.out.println("Pushed hi "+stack[sloc-1]);
		} else if (v >= 32) {
			this.stack[this.sloc++] = v - 139;
//		System.out.println("Pushed "+stack[sloc-1]);
		} else {
			//		System.out.println("CMD: "+v+" (stack is size "+sloc+")");
			switch (v) {
				case 0:   // x
					throw new RuntimeException("Bad command (" + v + ")");
				case 1:   // hstem
					this.sloc = 0;
					break;
				case 2:   // x
					throw new RuntimeException("Bad command (" + v + ")");
				case 3:   // vstem
					this.sloc = 0;
					break;
				case 4:   // y vmoveto
					pt.y += this.pop();
					gp.moveTo(pt.x, pt.y);
					this.sloc = 0;
					break;
				case 5:   // x y rlineto
					pt.y += this.pop();
					pt.x += this.pop();
					gp.lineTo(pt.x, pt.y);
					this.sloc = 0;
					break;
				case 6:   // x hlineto
					pt.x += this.pop();
					gp.lineTo(pt.x, pt.y);
					this.sloc = 0;
					break;
				case 7:   // y vlineto
					pt.y += this.pop();
					gp.lineTo(pt.x, pt.y);
					this.sloc = 0;
					break;
				case 8:   // x1 y1 x2 y2 x3 y3 rcurveto
					y3 = this.pop();
					x3 = this.pop();
					y2 = this.pop();
					x2 = this.pop();
					y1 = this.pop();
					x1 = this.pop();
					gp.curveTo(pt.x + x1, pt.y + y1,
							pt.x + x1 + x2, pt.y + y1 + y2,
							pt.x + x1 + x2 + x3, pt.y + y1 + y2 + y3);
					pt.x += x1 + x2 + x3;
					pt.y += y1 + y2 + y3;
					this.sloc = 0;
					break;
				case 9:   // closepath
					gp.closePath();
					this.sloc = 0;
					break;
				case 10:  // n callsubr
					var n = this.pop();
					if (this.subrs[n] == null) {
						System.out.println("No subroutine #" + n);
					} else {
						this.callcount++;
						if (this.callcount > 10) {
							System.out.println("Call stack too large");
						//			    throw new RuntimeException("Call stack too large");
						} else {
							this.parse(this.subrs[n], gp, pt, wid);
						}
						this.callcount--;
					}
					break;
				case 11:  // return
					return;
				case 12:  // ext...
					v = (cs[loc++]) & 0xff;
					if (v == 6) {  // s x y a b seac
						var b = this.pop();
						var a = this.pop();
						var y = this.pop();
						var x = this.pop();
						this.buildAccentChar(x, y, a, b, gp);
						this.sloc = 0;
					} else if (v == 7) {  // x y w h sbw
						wid.y = this.pop();
						wid.x = this.pop();
						pt.y = this.pop();
						pt.x = this.pop();
						this.sloc = 0;
					} else if (v == 12) {  // a b div -> a/b
						var b = this.pop();
						var a = this.pop();
						this.stack[this.sloc++] = a / b;
					} else if (v == 33) {  // a b setcurrentpoint
						pt.y = this.pop();
						pt.x = this.pop();
						gp.moveTo(pt.x, pt.y);
						this.sloc = 0;
					} else if (v == 0) { // dotsection
						this.sloc = 0;
					} else if (v == 1) {  // vstem3
						this.sloc = 0;
					} else if (v == 2) {  // hstem3
						this.sloc = 0;
					} else if (v == 16) {  // n callothersubr
						var cn = this.pop();
						var countargs = this.pop();

						//    System.out.println("Called othersubr with index "+cn);

						switch (cn) {
							case 0:
								// push args2 and args3 onto stack
								this.psStack[this.psLoc++] = this.pop();
								this.psStack[this.psLoc++] = this.pop();
								this.pop();
								break;
							case 3:
								// push 3 onto the postscript stack
								this.psStack[this.psLoc++] = 3;
								break;
							default:
								// push arguments onto the postscript stack
								for (var i = 0; i > countargs; i--) {
									this.psStack[this.psLoc++] = this.pop();
								}
								break;
						}
					} else if (v == 17) {  // pop
						// pop from the postscript stack onto the type1 stack
						this.stack[this.sloc++] = this.psStack[this.psLoc - 1];
						this.psLoc--;
					} else {
						throw new RuntimeException("Bad command (" + v + ")");
					}
					break;
				case 13:  // s w hsbw
					wid.x = this.pop();
					wid.y = 0;
					pt.x = this.pop();
					pt.y = 0;
					//		    gp.moveTo(pt.x, pt.y);
					this.sloc = 0;
					break;
				case 14:  // endchar
					//		    return;
					break;
				case 15:  // x
				case 16:  // x
				case 17:  // x
				case 18:  // x
				case 19:  // x
				case 20:  // x
					throw new RuntimeException("Bad command (" + v + ")");
				case 21:  // x y rmoveto
					pt.y += this.pop();
					pt.x += this.pop();
					gp.moveTo(pt.x, pt.y);
					this.sloc = 0;
					break;
				case 22:  // x hmoveto
					pt.x += this.pop();
					gp.moveTo(pt.x, pt.y);
					this.sloc = 0;
					break;
				case 23:  // x
				case 24:  // x
				case 25:  // x
				case 26:  // x
				case 27:  // x
				case 28:  // x
				case 29:  // x
					throw new RuntimeException("Bad command (" + v + ")");
				case 30:  // y1 x2 y2 x3 vhcurveto
					x3 = this.pop();
					y2 = this.pop();
					x2 = this.pop();
					y1 = this.pop();
					x1 = y3 = 0;
					gp.curveTo(pt.x, pt.y + y1,
							pt.x + x2, pt.y + y1 + y2,
							pt.x + x2 + x3, pt.y + y1 + y2);
					pt.x += x2 + x3;
					pt.y += y1 + y2;
					this.sloc = 0;
					break;
				case 31:  // x1 x2 y2 y3 hvcurveto
					y3 = this.pop();
					y2 = this.pop();
					x2 = this.pop();
					x1 = this.pop();
					y1 = x3 = 0;
					gp.curveTo(pt.x + x1, pt.y,
							pt.x + x1 + x2, pt.y + y2,
							pt.x + x1 + x2, pt.y + y2 + y3);
					pt.x += x1 + x2;
					pt.y += y2 + y3;
					this.sloc = 0;
					break;
			}
		}
	}
}
/**
 * decrypt an array using the Adobe Type 1 Font decryption algorithm.
 * @param d the input array of bytes
 * @param start where in the array to start decoding
 * @param end where in the array to stop decoding
 * @param key the decryption key
 * @param skip how many bytes to skip initially
 * @return the decrypted bytes.  The length of this array will be
 * (start-end-skip) bytes long
 */
trapeze.font.Type1Font.decrypt = function(d, start, end, key, skip) {
	if (end - start - skip < 0) {
		skip = 0;
	}
	var o = []; //new byte[end - start - skip];
	var r = key;
	var ipos;
	var c1 = 52845;
	var c2 = 22719;
	for (ipos = start; ipos < end; ipos++) {
		var c;
		if(d instanceof trapeze.StreamBuffer)
			c = d.getByteAt(ipos) & 0xff;
		else
			c = d[ipos] & 0xff;
		var p = (c ^ (r >> 8)) & 0xff;
		r = ((c + r) * c1 + c2) & 0xffff;
		if (ipos - start - skip >= 0) {
			if(p > 127)
				p = p - 256;
			else
				p = p;
			o[ipos - start - skip] = p;
		}
	}
	return o;
}