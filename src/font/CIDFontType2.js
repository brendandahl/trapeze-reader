goog.provide("trapeze.font.CIDFontType2");
goog.require("trapeze.font.TTFFont");
goog.require("trapeze.cos.COSArray");
goog.require("trapeze.cos.COSStream");
trapeze.font.CIDFontType2 = function(baseFont, fontObj, descriptor) {
	trapeze.font.CIDFontType2.baseConstructor.call(this, baseFont, fontObj, descriptor);
	/**
     * The width of each glyph from the DW and W arrays
     */
    this.widths = null;
    /**
     * The vertical width of each glyph from the DW2 and W2 arrays
     */
    this.widthsVertical = null;

    /*
     * the default width
     */
    this.defaultWidth = 1000;
    /*
     * the default vertical width
     */
    this.defaultWidthVertical = 1000;
	
	this.parseWidths(fontObj);
	
	// read the CIDSystemInfo dictionary (required)
	var systemInfoObj = fontObj.getDictionaryObject("CIDSystemInfo");
	// read the cid to gid map (optional)
	var mapObj = fontObj.getDictionaryObject("CIDToGIDMap");


	// only read the map if it is a stream (if it is a name, it
	// is "Identity" and can be ignored
	if (mapObj != null && (mapObj instanceof trapeze.cos.COSStream)) {
		throw new UnimplementedException("Haven't finished cid to gid map for CID font");
		this.cidToGidMap = mapObj.getStreamBuffer();
	}
}
extend(trapeze.font.CIDFontType2, trapeze.font.TTFFont);

trapeze.font.CIDFontType2.prototype.parseWidths = function(fontObj) {
	// read the default width (otpional)
	var defaultWidthObj = fontObj.getDictionaryObject("DW");
	if (defaultWidthObj != null) {
		this.defaultWidth = defaultWidthObj.value;
	}

	var entryIdx = 0;
	var first = 0;
	var last = 0;
	var widthArray;

	// read the widths table 
	var widthObj = fontObj.getDictionaryObject("W");
	if (widthObj != null) {

		// initialize the widths array
		this.widths = {};

		// parse the width array
		widthArray = widthObj;
		var widthArraySize = widthArray.size();

		/* an entry can be in one of two forms:
		 *   <startIndex> <endIndex> <value> or
		 *   <startIndex> [ array of values ]
		 * we use the entryIdx to differentitate between them
		 */
		for (var i = 0; i < widthArraySize; i++) {
			if (entryIdx == 0) {
				// first value in an entry.  Just store it
				first = widthArray.getObject(i).value;
			} else if (entryIdx == 1) {
				// second value -- is it an int or array?
				if (widthArray.getObject(i) instanceof trapeze.cos.COSArray) {
					// add all the entries in the array to the width array
					var entries = widthArray.getObject(i);
					for (var c = 0; c < entries.size(); c++) {
						var key = c + first; //new Character((char) (c + first));

						// value is width / default width
						var value = entries.getObject(c).value;
						this.widths[key] = value;
					}
					// all done
					entryIdx = -1;
				} else {
					last = getObject(i).value;
				}
			} else {
				// third value.  Set a range
				var value = widthArray.getObject(i).value;

				// set the range
				for (var c = first; c <= last; c++) {
					this.widths[c] = value;
				}

				// all done
				entryIdx = -1;
			}

			entryIdx++;
		}
	}

	// read the optional vertical default width
	defaultWidthObj = fontObj.getDictionaryObject("DW2");
	if (defaultWidthObj != null) {
		this.defaultWidthVertical = defaultWidthObj.value;
	}

	// read the vertical widths table
	widthObj = fontObj.getDictionaryObject("W2");
	if (widthObj != null) {

		// initialize the widths array
		this.widthsVertical = {};

		// parse the width2 array
		widthArray = widthObj;
		var widthArraySize = widthArray.size();
		/* an entry can be in one of two forms:
		 *   <startIndex> <endIndex> <value> or
		 *   <startIndex> [ array of values ]
		 * we use the entryIdx to differentitate between them
		 */
		entryIdx = 0;
		first = 0;
		last = 0;

		for (var i = 0; i < widthArraySize; i++) {
			if (entryIdx == 0) {
				// first value in an entry.  Just store it
				first = widthArray.getObject(i).value;
			} else if (entryIdx == 1) {
				// second value -- is it an int or array?
				if (widthArray.getObject(i) instanceof trapeze.cos.COSArray) {
					// add all the entries in the array to the width array
					var entries = widthArray.getObject(i);
					for (var c = 0; c < entries.size(); c++) {
						var key = c + first; //new Character((char) (c + first));

						// value is width / default width
						var value = entries.getObject(c).value;
						this.widthsVertical[key] = value;
					}
					// all done
					entryIdx = -1;
				} else {
					last = getObject(i).value;
				}
			} else {
				// third value.  Set a range
				var value = getObject(i).value;

				// set the range
				for (var c = first; c <= last; c++) {
					this.widthsVertical[c] = value;
				}

				// all done
				entryIdx = -1;
			}

			entryIdx++;
		}
	}
}
/**
 * @return int default width
 * @override
 */
trapeze.font.CIDFontType2.prototype.getDefaultWidth = function() {
	return this.defaultWidth;
}