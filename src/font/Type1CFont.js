function Type1CFont(baseFont, fontObj, descriptor) {
	Type1CFont.baseConstructor.call(this, baseFont, fontObj, descriptor);
	this.pos = 0;
	this.data = new StreamBuffer(descriptor.fontFile3.decode());
	
	this.gsubrbase = 0;

    this.lsubrbase = 0;

    this.gsubrsoffset = 0;

    this.lsubrsoffset = 0;
	
	this.num;
	this.type;
	this.charstringtype;
	this.stack = [];
	this.stackptr = 0;
	this.myEncoding = [];
	this.at = new AffineTransform(0.001, 0, 0, 0.001, 0, 0);
	// Top DICT: NAME    CODE   DEFAULT
    // charstringtype    12 6    2
    // fontmatrix        12 7    0.001 0 0 0.001
    // charset           15      - (offset)  names of glyphs (ref to name idx)
    // encoding          16      - (offset)  array of codes
    // CharStrings       17      - (offset)
    // Private           18      - (size, offset)
    // glyph at position i in CharStrings has name charset[i]
    // and code encoding[i]
	this.charstringtype = 2;
    this.charsetbase = 0;
    this.encodingbase = 0;
    this.charstringbase = 0;
    this.privatebase = 0;
    this.privatesize = 0;
    this.gsubrbase = 0;
    this.lsubrbase = 0;
    this.gsubrsoffset = 0;
    this.lsubrsoffset = 0;
    this.nglyphs = 1;

	this.parse();
}
extend(Type1CFont, OutlineFont);
Type1CFont.CMD = 0;
Type1CFont.NUM = 1;
Type1CFont.FLT = 2;

var temp = {
	parse: function() {
		var majorVersion = this.readByte();
        var minorVersion = this.readByte();
        var hdrsz = this.readByte();
        var offsize = this.readByte();
        // jump over rest of header: base of font names index
        var fnames = hdrsz;
        // offset in the file of the array of font dicts
        var topdicts = fnames + this.getIndexSize(fnames);
        // offset in the file of local names
        var theNames = topdicts + this.getIndexSize(topdicts);
        // offset in the file of the array of global subroutines
        this.gsubrbase = theNames + this.getIndexSize(theNames);
        this.gsubrsoffset = this.calcoffset(this.gsubrbase);
        // read extra names
        this.readNames(theNames);
        // does this file have more than one font?
        this.pos = topdicts;
		this.data.setPosition(this.pos);
        if (this.readInt(2) != 1) {
            throw "More than one font in this file!";
        }
        var r = this.getIndexEntry (fnames, 0);
		var p = this.pos;
		this.data.setPosition(r.start);
        this.fontname = this.data.read(r.len);
		this.data.setPosition(this.pos);
        // read first dict
        //	System.out.println("TOPDICT[0]:");
        this.readDict(this.getIndexEntry(topdicts, 0));
        // read the private dictionary
        //	System.out.println("PRIVATE DICT:");
        this.readDict ({start: this.privatebase, len: this.privatesize});
        // calculate the number of glyphs
        this.pos = this.charstringbase;
		this.data.setPosition(this.pos);
        this.nglyphs = this.readInt(2);
        // now get the glyph names
        //	System.out.println("GLYPHNAMES:");
        this.readGlyphNames(this.charsetbase);
		// now figure out the encoding
        //	System.out.println("ENCODING:");
        this.readEncodingData(this.encodingbase);
	},
	// count(2) offsize [offset offset ... offset] data
    // offset array has count+1 entries
    // data starts at 3+(count+1)*offsize
    // offset for data is offset+2+(count+1)*offsize
    /**
     * get the size of the dictionary located within the stream at
     * some offset.
     * @param loc the index of the start of the dictionary
     * @return the size of the dictionary, in bytes.
     */
    getIndexSize: function(loc) {
        //	System.out.println("Getting size of index at "+loc);
        var hold = this.pos;
        this.pos = loc;
		this.data.setPosition(loc);
        var count = this.readInt(2);
        if (count <= 0) {
            return 2;
        }
        var encsz = this.readByte();
        if (encsz < 1 || encsz > 4) {
            throw new Exception("Offsize: " + encsz +
                    ", must be in range 1-4.");
        }
        // pos is now at the first offset.  last offset is at count*encsz
        this.pos += count * encsz;
		this.data.setPosition(this.pos);
        var end = this.readInt(encsz);
        this.pos = hold;
		this.data.setPosition(hold);
        return 2 + (count + 1) * encsz + end;
    },
	readByte: function() {
		this.pos++;
		return this.data.get();
	},
	/**
     * read an integer from the input stream
     * @param len the number of bytes in the integer
     * @return the integer
     */
    readInt: function(len) {
        var n = 0;
        for (var i = 0; i < len; i++) {
            this.pos++;
			n = (n << 8) | (this.data.get() & 0xff);
        }
        return n;
    },
	    /**
     * calculate an offset code for a dictionary. Uses the count of entries
     * to determine what the offset should be.
     *
     * @param base the index of the start of the dictionary
     */
    calcoffset: function(base) {
        var len = this.getTableLength(base);
        if (len < 1240) {
            return 107;
        } else if (len < 33900) {
            return 1131;
        } else {
            return 32768;
        }
    },
	/**
     * return the number of entries in an Index table.
     *
     * @param loc
     * @return
     */
    getTableLength: function(loc) {
        var hold = this.pos;
        this.pos = loc;
		this.data.setPosition(this.pos);
        var count = this.readInt(2);
        if (count <= 0) {
            return 2;
        }
        this.pos = hold;
		this.data.setPosition(this.pos);
        return count;
    },
	/**
     * read a list of names
     * @param base the start of the name table
     */
    readNames: function(base) {
        this.pos = base;
		this.data.setPosition(this.pos);
        var nextra = this.readInt(2);
        this.names = [];
        //	safenames= new String[nextra];
		var p = this.data.getPosition();
        for(var i = 0; i < nextra; i++) {
            var r = this.getIndexEntry(base, i);
			this.data.setPosition(r.start);
			this.names.push(this.data.read(r.len));
        }
		this.data.setPosition(p);
    },
	    /**
     * Get the range of a particular index in a dictionary.
     * @param index the start of the dictionary.
     * @param id the index of the entry in the dictionary
     * @return a range describing the offsets of the start and end of
     * the entry from the start of the file, not the dictionary
     */
    getIndexEntry: function(index, id) {
        var hold = this.pos;
        this.pos = index;
		this.data.setPosition(this.pos);
        var count = this.readInt(2);
        var encsz = this.readByte();
        if (encsz < 1 || encsz > 4) {
            throw new Exception("Offsize: " + encsz +
                    ", must be in range 1-4.");
        }
        this.pos += encsz * id;
		this.data.setPosition(this.pos);
        var from = this.readInt(encsz);
        var r = {
			start: from + 2 + index + encsz * (count + 1),
			len: this.readInt(encsz) - from
		};
        this.pos = hold;
		this.data.setPosition(this.pos);
        return r;
    },
	/**
     * read a dictionary that exists within some range, parsing the entries
     * within the dictionary.
     */
    readDict: function(r) {
        //	System.out.println("reading dictionary from "+r.getStart()+" to "+r.getEnd());
        this.pos = r.start;
		this.data.setPosition(this.pos);
        var end = r.len + r.start;
		while (this.pos < end) {
            var cmd = this.readCommand(false);
            if (cmd == 1006) { // charstringtype, default=2
                this.charstringtype = this.stack[0];
            } else if (cmd == 1007) { // fontmatrix
                if (this.stackptr == 4) {
                    this.at = new AffineTransform (this.stack[0], this.stack[1],
                            this.stack[2], this.stack[3],
                            0, 0);
                } else {
                    this.at = new AffineTransform(this.stack[0], this.stack[1],
                            this.stack[2], this.stack[3],
                            this.stack[4], this.stack[5]);
                }
            } else if (cmd == 15) { // charset
               this.charsetbase = this.stack[0];
            } else if (cmd == 16) { // encoding
                this.encodingbase = this.stack[0];
            } else if (cmd == 17) { // charstrings
                this.charstringbase = this.stack[0];
            } else if (cmd == 18) { // private
               this.privatesize = this.stack[0];
               this.privatebase = this.stack[1];
            } else if (cmd == 19) { // subrs (in Private dict)
                this.lsubrbase = this.privatebase + this.stack[0];
                this.lsubrsoffset = this.calcoffset (this.lsubrbase);
            }
            this.stackptr = 0;
        }
		this.data.setPosition(this.pos);
    },
	/**
     * read a complete command.  this may involve several numbers
     * which go onto a stack before an actual command is read.
     * @param charstring ????
     * @return the command.  Some numbers may also be on the stack.
     */
    readCommand: function(charstring) {
        while (true) {
            var t = this.readNext(charstring);
            if (t == Type1CFont.CMD) {
                /*
                System.out.print("CMD= "+num+", args=");
                for (int i=0; i<stackptr; i++) {
                System.out.print(" "+stack[i]);
                }
                System.out.println();
                 */
                return this.num;
            } else {
                this.stack[this.stackptr++] = (t == Type1CFont.NUM) ? this.num : this.fnum;
            }
        }
    },
	/**
     * read the next decoded value from the stream
     * @param charstring ????
     */
    readNext: function(charstring) {
        this.num = this.data.getByteAt(this.pos++);
        if (this.num == 30 && !charstring) { // goofy floatingpoint rep
            this.readFNum();
            return this.type = Type1CFont.FLT;
        } else if (this.num == 28) {
			// This is kind of funky because the first byte isn't cast to an int in the java pdf stuff
			// There's probably a better/different way to do this.
			this.num = (this.data.getAt(this.pos) << 8) + (this.data.getByteAt(this.pos + 1) & 0xff);
            this.pos += 2;
            return this.type = Type1CFont.NUM;
        } else if (this.num == 29 && !charstring) {
            this.num = ((this.data.getByteAt(this.pos) & 0xff) << 24) |
                    ((this.data.getByteAt(this.pos + 1) & 0xff) << 16) |
                    ((this.data.getByteAt(this.pos + 2) & 0xff) << 8) |
                    ((this.data.getByteAt(this.pos + 3) & 0xff));
            this.pos += 4;
            return this.type = Type1CFont.NUM;
        } else if (this.num == 12) {  // two-byte command
            this.num = 1000 + (this.data.getByteAt(this.pos) & 0xff);
			this.pos++;
            return this.type = Type1CFont.CMD;
        } else if (this.num < 32) {
            return this.type = Type1CFont.CMD;
        } else if (this.num < 247) {
            this.num -= 139;
            return this.type = Type1CFont.NUM;
        } else if (this.num < 251) {
            this.num = (this.num - 247) * 256 + (this.data.getByteAt(this.pos) & 0xff) + 108;
			this.pos++;
            return this.type = Type1CFont.NUM;
        } else if (this.num < 255) {
            this.num = -(this.num - 251) * 256 - (this.data.getByteAt(this.pos) & 0xff) - 108;
			this.pos++;
            return this.type = Type1CFont.NUM;
        } else if (!charstring) { // dict shouldn't have a 255 code
            printData ();
            throw new RuntimeException ("Got a 255 code while reading dict");
        } else { // num was 255
            this.fnum = (((this.data.getByteAt(this.pos) & 0xff) << 24) |
                    (( this.data.getByteAt(this.pos + 1) & 0xff) << 16) |
                    (( this.data.getByteAt(this.pos + 2)& 0xff) << 8) |
                    (( this.data.getByteAt(this.pos + 3) & 0xff))) / 65536;
            this.pos += 4;
            return this.type = Type1CFont.FLT;
        }
    },
	    /**
     * read the next funky floating point number from the input stream.
     * value gets put into the fnum field.
     */
    readFNum: function() {
        // work in nybbles: 0-9=0-9, a=. b=E, c=E-, d=rsvd e=neg f=end
        var f = 0;
        var neg = false;
        var exp = 0;
        var eval = 0;
        var mul = 1;
		this.data.setPosition(this.pos);
        var work = this.readByte();//this.data.getByteAt(this.pos++);
        while (true) {
            if (work == 0xdd) {
                work = this.readByte();
            }
            var nyb = (work >> 4) & 0xf;
            work = ((work << 4) | 0xd) & 0xff;
            if (nyb < 10) {
                if (exp != 0) {         // working on the exponent
                    eval = eval * 10 + nyb;
                } else if (mul == 1) {  // working on an int
                    f = f * 10 + nyb;
                } else {              // working on decimal part
                    f += nyb * mul;
                    mul /= 10;
                }
            } else if (nyb == 0xa) {    // decimal
                mul = 0.1;
            } else if (nyb == 0xb) {    // E+
                exp = 1;
            } else if (nyb == 0xc) {    // E-
                exp = -1;
            } else if (nyb == 0xe) {      // neg
                neg = true;
            } else {
                break;
            }
        }
        this.fnum = (neg ? -1 : 1) * f * Math.pow (10, eval * exp);
    },
  /**
     * read the names of the glyphs.
     * @param base the start of the glyph name table
     */
    readGlyphNames: function(base) {
        if (base == 0) {
            this.glyphnames = new Array(229);//[]; //new int[229];
            for (var i = 0; i < 229; i++) {
                this.glyphnames[i] = i;
            }
            return;
        } else if (base == 1) {
            this.glyphnames = FontSupport.type1CExpertCharset;
            return;
        } else if (base == 2) {
            this.glyphnames = FontSupport.type1CExpertSubCharset;
            return;
        }
        // nglyphs has already been set.
        this.glyphnames = [];//new int[nglyphs];
        this.glyphnames[0] = 0;
        this.pos = base;
		this.data.setPosition(this.pos);
        var t = this.readByte();
        if (t == 0) {
            for (var i = 1; i < this.nglyphs; i++) {
                this.glyphnames[i] = this.readInt(2);
            }
        } else if (t == 1) {
            var n = 1;
            while (n < this.nglyphs) {
                var sid = this.readInt (2);
                var range = this.readByte() + 1;
                for (var i = 0; i < range; i++) {
                    this.glyphnames[n++] = sid++;
                }
            }
        } else if (t == 2) {
            var n = 1;
            while (n < this.nglyphs) {
                var sid = this.readInt (2);
                var range = this.readInt (2) + 1;
                for (var i = 0; i < range; i++) {
                    ths.glyphnames[n++] = sid++;
                }
            }
        }
    },
	/**
     * parse information about the encoding of this file.
     * @param base the start of the encoding data
     */
    readEncodingData: function(base) {
		if (base == 0) {  // this is the StandardEncoding
            //	    System.out.println("**** STANDARD ENCODING!");
            this.myEncoding = FontSupport.standardEncoding;
        } else if (base == 1) {  // this is the expert encoding
            System.out.println ("**** EXPERT ENCODING!");
            // TODO: copy ExpertEncoding
        } else {
            this.pos = base;
            this.data.setPosition(this.pos);
			var encodingtype = this.readByte();
            if ((encodingtype & 127) == 0) {
                var ncodes = this.readByte ();
                for (var i = 1; i < ncodes + 1; i++) {
                    var idx = this.readByte () & 0xff;
                    this.myEncoding[idx] = i;
                }
            } else if ((encodingtype & 127) == 1) {
                var nranges = this.readByte ();
                var p = 1;
                for (var i = 0; i < nranges; i++) {
                    var start = this.readByte ();
                    var more = this.readByte ();
                    for (var j = start; j < start + more + 1; j++) {
                        this.myEncoding[j] = p++;
                    }
                }
            } else {
                System.out.println ("Bad encoding type: " + encodingtype);
            }
            // TODO: now check for supplemental encoding data
        }
    },
	/**
     * Get a glyph outline by name
     *
     * @param name the name of the desired glyph
     * @return the glyph outline, or null if unavailable
     */
    getOutlineByName: function(name, width) {
        // first find the index of this name
        var index = this.getNameIndex(name);

        // now find the glyph with that name
        for (var i = 0; i < this.glyphnames.length; i++) {
            if (this.glyphnames[i] == index) {
                return this.readGlyph(this.charstringbase, i);
            }
        }

        // not found -- return the unknown glyph
        return this.readGlyph(this.charstringbase, 0);
    },
	/**
     * Get a glyph outline by character code
     *
     * Note this method must always return an outline 
     *
     * @param src the character code of the desired glyph
     * @return the glyph outline
     */
    getOutlineByCode: function(src, width) {
        // ignore high bits
        var index = toSignedByte(src);// & 0xff);

        // if we use a standard encoding, the mapping is from glyph to SID
        // therefore we must find the glyph index in the name table
        if (this.encodingbase == 0 || this.encodingbase == 1) {
            for (var i = 0; i < this.glyphnames.length; i++) {
                if (this.glyphnames[i] == this.myEncoding[index]) {
                    return this.readGlyph(this.charstringbase, i);
                }
            }
        } else {
            // for a custom encoding, the mapping is from glyph to GID, so
            // we can just map the glyph directly
            if (index > 0 && index < this.myEncoding.length) {
                return this.readGlyph(this.charstringbase, this.myEncoding[index]);
            }
        }

        // for some reason the glyph was not found, return the empty glyph
        return this.readGlyph(this.charstringbase, 0);
    },
	 /**
     * get the index of a particular name.  The name table starts with
     * the standard names in FontSupport.stdNames, and is appended by
     * any names in the name table from this font's dictionary.
     */
    getNameIndex: function(name) {
        var val = FontSupport.findName (name, FontSupport.stdNames);
        if (val == -1) {
            val = FontSupport.findName (name, this.names) + FontSupport.stdNames.length;
        }
        if (val == -1) {
            val = 0;
        }
        return val;
    },
	 /**
     * Read the data for a glyph from the glyph table, and transform
     * it based on the current transform.
     *
     * @param base the start of the glyph table
     * @param offset the index of this glyph in the glyph table
     */
    readGlyph: function(base, offset) {
        var pt = {x: 0, y: 0, open: false}; //new FlPoint ();

        // find this entry
        var r = this.getIndexEntry(base, offset);

        // create a path
        var gp = new GeneralPath();


        // rember the start position (for recursive calls due to seac)
        var hold = this.pos;

        // read the glyph itself
        this.stackptr = 0;
        this.parseGlyph(r, gp, pt);

        // restore the start position
        this.pos = hold;
		this.data.setPosition(this.pos);
		
        gp.transform(this.at);

        return gp;
    },
	  /**
     * parse a glyph defined in a particular range
     * @param r the range of the glyph definition
     * @param gp a GeneralPath in which to store the glyph outline
     * @param pt a FlPoint representing the end of the current path
     */
    parseGlyph: function(r, gp, pt) {
        this.pos = r.start;
        var i;
        var x1, y1, x2, y2, x3, y3, ybase;
        var hold;
        var stemhints = 0;
		var end = r.start + r.len;
        while (this.pos < end) {
            var cmd = this.readCommand (true);
            hold = 0;
            switch (cmd) {
                case 1: // hstem
                case 3: // vstem
                    this.stackptr = 0;
                    break;
                case 4: // vmoveto
                    if (this.stackptr > 1) {  // this is the first call, arg1 is width
                        this.stack[0] = this.stack[1];
                    }
                    pt.y += this.stack[0];
                    if (pt.open) {
                        gp.closePath ();
                    }
                    pt.open = false;
                    gp.moveTo (pt.x, pt.y);
                    this.stackptr = 0;
                    break;
                case 5: // rlineto
                    for (i = 0; i < this.stackptr;) {
                        pt.x += this.stack[i++];
                        pt.y += this.stack[i++];
                        gp.lineTo (pt.x, pt.y);
                    }
                    pt.open = true;
                    this.stackptr = 0;
                    break;
                case 6: // hlineto
                    for (i = 0; i < this.stackptr;) {
                        if ((i & 1) == 0) {
                            pt.x += this.stack[i++];
                        } else {
                            pt.y += this.stack[i++];
                        }
                        gp.lineTo (pt.x, pt.y);
                    }
                    pt.open = true;
                    this.stackptr = 0;
                    break;
                case 7: // vlineto
                    for (i = 0; i < this.stackptr;) {
                        if ((i & 1) == 0) {
                            pt.y += this.stack[i++];
                        } else {
                            pt.x += this.stack[i++];
                        }
                        gp.lineTo (pt.x, pt.y);
                    }
                    pt.open = true;
                    this.stackptr = 0;
                    break;
                case 8: // rrcurveto
                    for (i = 0; i < this.stackptr;) {
                        x1 = pt.x + this.stack[i++];
                        y1 = pt.y + this.stack[i++];
                        x2 = x1 + this.stack[i++];
                        y2 = y1 + this.stack[i++];
                        pt.x = x2 + this.stack[i++];
                        pt.y = y2 + this.stack[i++];
                        gp.curveTo (x1, y1, x2, y2, pt.x, pt.y);
                    }
                    pt.open = true;
                    this.stackptr = 0;
                    break;
                case 10: // callsubr
                    hold = this.pos;
                    i = this.stack[--this.stackptr] + this.lsubrsoffset;
                    var lsubr = this.getIndexEntry(this.lsubrbase, i);
                    this.parseGlyph(lsubr, gp, pt);
                    this.pos = hold;
                    break;
                case 11: // return
                    return;
                case 14: // endchar
                    // width x y achar bchar endchar == x y achar bchar seac
                    if (this.stackptr == 5) {
                        // TODO
						/*buildAccentChar(this.stack[1], this.stack[2], (char) this.stack[3],
                                (char) this.stack[4], gp);
						*/
						console.warn('build asccent char not done');
                    }
                    if (pt.open) {
                        gp.closePath ();
                    }
                    pt.open = false;
                    this.stackptr = 0;
                    break;
                case 18: // hstemhm
                    stemhints +=  Math.floor(this.stackptr / 2);
                    this.stackptr = 0;
                    break;
                case 19: // hintmask
                case 20: // cntrmask
                    stemhints += Math.floor(this.stackptr / 2);
                    this.pos += Math.floor((stemhints - 1) / 8 + 1);
                    this.stackptr = 0;
                    break;
                case 21: // rmoveto
                    if (this.stackptr > 2) {
                        this.stack[0] = this.stack[1];
                        this.stack[1] = this.stack[2];
                    }
                    pt.x += this.stack[0];
                    pt.y += this.stack[1];
                    if (pt.open) {
                        gp.closePath ();
                    }
                    gp.moveTo (pt.x, pt.y);
                    pt.open = false;
                    this.stackptr = 0;
                    break;
                case 22: // hmoveto
                    if (this.stackptr > 1) {
                        this.stack[0] = this.stack[1];
                    }
                    pt.x += this.stack[0];
                    if (pt.open) {
                        gp.closePath ();
                    }
                    gp.moveTo (pt.x, pt.y);
                    pt.open = false;
                    this.stackptr = 0;
                    break;
                case 23: // vstemhm
                    stemhints += this.stackptr / 2;
                    this.stackptr = 0;
                    break;
                case 24: // rcurveline
                    for (i = 0; i < this.stackptr - 2;) {
                        x1 = pt.x + this.stack[i++];
                        y1 = pt.y + this.stack[i++];
                        x2 = x1 + this.stack[i++];
                        y2 = y1 + this.stack[i++];
                        pt.x = x2 + this.stack[i++];
                        pt.y = y2 + this.stack[i++];
                        gp.curveTo (x1, y1, x2, y2, pt.x, pt.y);
                    }
                    pt.x += this.stack[i++];
                    pt.y += this.stack[i++];
                    gp.lineTo (pt.x, pt.y);
                    pt.open = true;
                    this.stackptr = 0;
                    break;
                case 25: // rlinecurve
                    for (i = 0; i < this.stackptr - 6;) {
                        pt.x += this.stack[i++];
                        pt.y += this.stack[i++];
                        gp.lineTo (pt.x, pt.y);
                    }
                    x1 = pt.x + this.stack[i++];
                    y1 = pt.y + this.stack[i++];
                    x2 = x1 + this.stack[i++];
                    y2 = y1 + this.stack[i++];
                    pt.x = x2 + this.stack[i++];
                    pt.y = y2 + this.stack[i++];
                    gp.curveTo (x1, y1, x2, y2, pt.x, pt.y);
                    pt.open = true;
                    this.stackptr = 0;
                    break;
                case 26: // vvcurveto
                    i = 0;
                    if ((this.stackptr & 1) == 1) { // odd number of arguments
                        pt.x += this.stack[i++];
                    }
                    while (i < this.stackptr) {
                        x1 = pt.x;
                        y1 = pt.y + this.stack[i++];
                        x2 = x1 + this.stack[i++];
                        y2 = y1 + this.stack[i++];
                        pt.x = x2;
                        pt.y = y2 + this.stack[i++];
                        gp.curveTo (x1, y1, x2, y2, pt.x, pt.y);
                    }
                    pt.open = true;
                    this.stackptr = 0;
                    break;
                case 27: // hhcurveto
                    i = 0;
                    if ((this.stackptr & 1) == 1) { // odd number of arguments
                        pt.y += this.stack[i++];
                    }
                    while (i < this.stackptr) {
                        x1 = pt.x + this.stack[i++];
                        y1 = pt.y;
                        x2 = x1 + this.stack[i++];
                        y2 = y1 + this.stack[i++];
                        pt.x = x2 + this.stack[i++];
                        pt.y = y2;
                        gp.curveTo (x1, y1, x2, y2, pt.x, pt.y);
                    }
                    pt.open = true;
                    this.stackptr = 0;
                    break;
                case 29: // callgsubr
                    hold = this.pos;
                    i = this.stack[--this.stackptr] + this.gsubrsoffset; // cast to int
                    var gsubr = this.getIndexEntry(this.gsubrbase, i);
                    this.parseGlyph(gsubr, gp, pt);
                    this.pos = hold;
                    break;
                case 30: // vhcurveto
                    hold = 4;
                case 31: // hvcurveto
                    for (i = 0; i < this.stackptr;) {
                        var hv = (((i + hold) & 4) == 0);
                        x1 = pt.x + (hv ? this.stack[i++] : 0);
                        y1 = pt.y + (hv ? 0 : this.stack[i++]);
                        x2 = x1 + this.stack[i++];
                        y2 = y1 + this.stack[i++];
                        pt.x = x2 + (hv ? 0 : this.stack[i++]);
                        pt.y = y2 + (hv ? this.stack[i++] : 0);
                        if (i == this.stackptr - 1) {
                            if (hv) {
                                pt.x += this.stack[i++];
                            } else {
                                pt.y += this.stack[i++];
                            }
                        }
                        gp.curveTo (x1, y1, x2, y2, pt.x, pt.y);
                    }
                    pt.open = true;
                    this.stackptr = 0;
                    break;
                case 1000: // old dotsection command.  ignore.
                    this.stackptr = 0;
                    break;
                case 1003: // and
                    x1 = this.stack[--this.stackptr];
                    y1 = this.stack[--this.stackptr];
                    this.stack[this.stackptr++] = ((x1 != 0) && (y1 != 0)) ? 1 : 0;
                    break;
                case 1004: // or
                    x1 = this.stack[--this.stackptr];
                    y1 = this.stack[--this.stackptr];
                    this.stack[this.stackptr++] = ((x1 != 0) || (y1 != 0)) ? 1 : 0;
                    break;
                case 1005: // not
                    x1 = this.stack[--this.stackptr];
                    this.stack[this.stackptr++] = (x1 == 0) ? 1 : 0;
                    break;
                case 1009: // abs
                    this.stack[this.stackptr - 1] = Math.abs (this.stack[this.stackptr - 1]);
                    break;
                case 1010: // add
                    x1 = this.stack[--this.stackptr];
                    y1 = this.stack[--this.stackptr];
                    this.stack[this.stackptr++] = x1 + y1;
                    break;
                case 1011: // sub
                    x1 = this.stack[--this.stackptr];
                    y1 = this.stack[--this.stackptr];
                    this.stack[this.stackptr++] = y1 - x1;
                    break;
                case 1012: // div
                    x1 = this.stack[--this.stackptr];
                    y1 = this.stack[--this.stackptr];
                    this.stack[this.stackptr++] = y1 / x1;
                    break;
                case 1014: // neg
                    this.stack[this.stackptr - 1] = -this.stack[this.stackptr - 1];
                    break;
                case 1015: // eq
                    x1 = this.stack[--this.stackptr];
                    y1 = this.stack[--this.stackptr];
                    this.stack[this.stackptr++] = (x1 == y1) ? 1 : 0;
                    break;
                case 1018: // drop
                    this.stackptr--;
                    break;
                case 1020: // put
                    i = this.stack[--this.stackptr]; // (int) cast
                    x1 = this.stack[--this.stackptr];
                    this.temps[i] = x1;
                    break;
                case 1021: // get
                    i = this.stack[--this.stackptr]; // (int) cast
                    this.stack[this.stackptr++] = this.temps[i];
                    break;
                case 1022: // ifelse
                    if (this.stack[this.stackptr - 2] > this.stack[this.stackptr - 1]) {
                        this.stack[this.stackptr - 4] = this.stack[this.stackptr - 3];
                    }
                    this.stackptr -= 3;
                    break;
                case 1023: // random
                    this.stack[this.stackptr++] = Math.random();
                    break;
                case 1024: // mul
                    x1 = this.stack[--this.stackptr];
                    y1 = this.stack[--this.stackptr];
                    this.stack[this.stackptr++] = y1 * x1;
                    break;
                case 1026: // sqrt
                    this.stack[this.stackptr - 1] = Math.sqrt(this.stack[this.stackptr - 1]);
                    break;
                case 1027: // dup
                    x1 = this.stack[this.stackptr - 1];
                    this.stack[this.stackptr++] = x1;
                    break;
                case 1028: // exch
                    x1 = this.stack[this.stackptr - 1];
                    this.stack[this.stackptr - 1] = this.stack[this.stackptr - 2];
                    this.stack[this.stackptr - 2] = x1;
                    break;
                case 1029: // index
                    i = this.stack[this.stackptr - 1]; // cast to int
                    if (i < 0) {
                        i = 0;
                    }
                    this.stack[this.stackptr - 1] = this.stack[this.stackptr - 2 - i];
                    break;
                case 1030: // roll
                    console.warn('havent finished roll yet');
					/*
					i = this.stack[--this.stackptr]; // cast to int
                    int n = this.stack[--this.stackptr]; // cast to int
                    // roll n number by i (+ = upward)
                    if (i > 0) {
                        i = i % n;
                    } else {
                        i = n - (-i % n);
                    }
                    // x x x x i y y y -> y y y x x x x i (where i=3)
                    if (i > 0) {
                        float roll[] = new float[n];
                        System.arraycopy (stack, this.stackptr - 1 - i, roll, 0, i);
                        System.arraycopy (stack, this.stackptr - 1 - n, roll, i,
                                n - i);
                        System.arraycopy (roll, 0, stack, this.stackptr - 1 - n, n);
                    }*/
                    break;
                case 1034: // hflex
                    x1 = pt.x + this.stack[0];
                    y1 = ybase = pt.y;
                    x2 = x1 + this.stack[1];
                    y2 = y1 + this.stack[2];
                    pt.x = x2 + this.stack[3];
                    pt.y = y2;
                    gp.curveTo (x1, y1, x2, y2, pt.x, pt.y);
                    x1 = pt.x + this.stack[4];
                    y1 = pt.y;
                    x2 = x1 + this.stack[5];
                    y2 = ybase;
                    pt.x = x2 + this.stack[6];
                    pt.y = y2;
                    gp.curveTo (x1, y1, x2, y2, pt.x, pt.y);
                    pt.open = true;
                    this.stackptr = 0;
                    break;
                case 1035: // flex
                    x1 = pt.x + this.stack[0];
                    y1 = pt.y + this.stack[1];
                    x2 = x1 + this.stack[2];
                    y2 = y1 + this.stack[3];
                    pt.x = x2 + this.stack[4];
                    pt.y = y2 + this.stack[5];
                    gp.curveTo (x1, y1, x2, y2, pt.x, pt.y);
                    x1 = pt.x + this.stack[6];
                    y1 = pt.y + this.stack[7];
                    x2 = x1 + this.stack[8];
                    y2 = y1 + this.stack[9];
                    pt.x = x2 + this.stack[10];
                    pt.y = y2 + this.stack[11];
                    gp.curveTo (x1, y1, x2, y2, pt.x, pt.y);
                    pt.open = true;
                    this.stackptr = 0;
                    break;
                case 1036: // hflex1
                    ybase = pt.y;
                    x1 = pt.x + this.stack[0];
                    y1 = pt.y + this.stack[1];
                    x2 = x1 + this.stack[2];
                    y2 = y1 + this.stack[3];
                    pt.x = x2 + this.stack[4];
                    pt.y = y2;
                    gp.curveTo (x1, y1, x2, y2, pt.x, pt.y);
                    x1 = pt.x + this.stack[5];
                    y1 = pt.y;
                    x2 = x1 + this.stack[6];
                    y2 = y1 + this.stack[7];
                    pt.x = x2 + this.stack[8];
                    pt.y = ybase;
                    gp.curveTo (x1, y1, x2, y2, pt.x, pt.y);
                    pt.open = true;
                    this.stackptr = 0;
                    break;
                case 1037: // flex1
                    ybase = pt.y;
                    var xbase = pt.x;
                    x1 = pt.x + this.stack[0];
                    y1 = pt.y + this.stack[1];
                    x2 = x1 + this.stack[2];
                    y2 = y1 + this.stack[3];
                    pt.x = x2 + this.stack[4];
                    pt.y = y2 + this.stack[5];
                    gp.curveTo (x1, y1, x2, y2, pt.x, pt.y);
                    x1 = pt.x + this.stack[6];
                    y1 = pt.y + this.stack[7];
                    x2 = x1 + this.stack[8];
                    y2 = y1 + this.stack[9];
                    if (Math.abs (x2 - xbase) > Math.abs (y2 - ybase)) {
                        pt.x = x2 + this.stack[10];
                        pt.y = ybase;
                    } else {
                        pt.x = xbase;
                        pt.y = y2 + this.stack[10];
                    }
                    gp.curveTo (x1, y1, x2, y2, pt.x, pt.y);
                    pt.open = true;
                    this.stackptr = 0;
                    break;
                default:
                    System.out.println ("ERROR! TYPE1C CHARSTRING CMD IS " + cmd);
                    break;
            }
        }
    }
};
for(var key in temp) {
	Type1CFont.prototype[key] = temp[key];
}