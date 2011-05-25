goog.provide("trapeze.font.PDFFontEncoding");
goog.require("trapeze.font.PDFCMap");
goog.require("trapeze.font.FontSupport");
goog.require("trapeze.cos.COSDictionary");
goog.require("trapeze.cos.COSName");
goog.require("trapeze.cos.COSNumber");
trapeze.font.PDFFontEncoding = function(fontType, encoding) {
		this.differences = {};
		if(encoding instanceof trapeze.cos.COSDictionary) {
			// loook at the "Type" entry of the encoding to determine the type
            var typeStr = encoding.getDictionaryObject("Type").name;

            if (typeStr == "Encoding") {
                // it is an encoding
                this.type = trapeze.font.PDFFontEncoding.TYPE_ENCODING;
                this.parseEncoding(encoding);
            } else if (typeStr == "CMap") {
                // it is a CMap
                this.type = trapeze.font.PDFFontEncoding.TYPE_CMAP;
                this.cmap = trapeze.font.PDFCMap.getCMap(encoding);
            } else {
                throw "Uknown encoding type: " + type;
            }
		} else if (encoding instanceof trapeze.cos.COSName) {
            // if the encoding is a String, it is the name of an encoding
            // or the name of a CMap, depending on the type of the font
            if (fontType == "Type0") {
                this.type = trapeze.font.PDFFontEncoding.TYPE_CMAP;
                this.cmap = trapeze.font.PDFCMap.getCMap(encoding);
            } else {
                this.type = trapeze.font.PDFFontEncoding.TYPE_ENCODING;

                this.differences = {};
                this.baseEncoding = this.getBaseEncoding(encoding.name);
            }
        } else {
            throw "not doen pdffontencoding";
			/* // loook at the "Type" entry of the encoding to determine the type
            String typeStr = encoding.getDictRef("Type").getStringValue();

            if (typeStr.equals("Encoding")) {
                // it is an encoding
                type = TYPE_ENCODING;
                parseEncoding(encoding);
            } else if (typeStr.equals("CMap")) {
                // it is a CMap
                type = TYPE_CMAP;
                cmap = trapeze.font.PDFCMap.getCMap(encoding);
            } else {
                throw new IllegalArgumentException("Uknown encoding type: " + type);
            } */
        } 
}
trapeze.font.PDFFontEncoding.prototype.parseEncoding = function(encoding) {
		this.differences = {}; // char to string map

        // figure out the base encoding, if one exists
        var baseEncObj = encoding.getDictionaryObject("BaseEncoding");
        if (baseEncObj != null) {
            this.baseEncoding = this.getBaseEncoding(baseEncObj.name);
        }

        // parse the differences array
        var diffArrayObj = encoding.getDictionaryObject("Differences");
        if (diffArrayObj != null) {
            var diffArray = diffArrayObj;
            var curPosition = -1;

            for (var i = 0; i < diffArray.size(); i++) {
                var test = diffArray.get(i);
				if (test instanceof trapeze.cos.COSNumber) {
                    curPosition = test.value;
                } else if (test instanceof trapeze.cos.COSName) {
                    var key = String.fromCharCode(curPosition);
                    this.differences[key] = test.name;
                    curPosition++;
                } else {
                    throw "Unexpected type in diff array: " + test;
                }
            }
        }
}
trapeze.font.PDFFontEncoding.prototype.getBaseEncoding = function(encodingName) {
        if (encodingName == "MacRomanEncoding") {
            return trapeze.font.FontSupport.macRomanEncoding;
        } else if (encodingName == "MacExpertEncoding") {
            return trapeze.font.FontSupport.type1CExpertCharset;
        } else if (encodingName == "WinAnsiEncoding") {
            return trapeze.font.FontSupport.winAnsiEncoding;
        } else {
            throw "Unknown encoding: " + encodingName;
        }
}
trapeze.font.PDFFontEncoding.prototype.getGlyphs = function(font, text) {
	var outList = [];

	// go character by character through the text
	for (var i = 0; i < text.length; i++) {
		switch (this.type) {
			case trapeze.font.PDFFontEncoding.TYPE_ENCODING:
				outList.push(this.getGlyphFromEncoding(font, text.charAt(i)));
				break;
			case trapeze.font.PDFFontEncoding.TYPE_CMAP:
/* 				// 2 bytes -> 1 character in a CMap
				var c = ((arry[i] & 0xff) << 8);
				if (i < arry.length - 1) {
					c |= (char) (arry[++i] & 0xff);
				}
				outList.add(getGlyphFromCMap(font, c)); */
				break;
		}
	}

	return outList;
}
trapeze.font.PDFFontEncoding.prototype.getGlyphFromEncoding = function(font, src) {
	var charName;

	// see if this character is in the differences list
	if (this.differences[src] != null) {
		charName = this.differences[src];
	} else if (this.baseEncoding != null) {
		// get the character name from the base encoding
		var charID = this.baseEncoding[src.charCodeAt(0)];//[toSignedByte(src)];
		charName = trapeze.font.FontSupport.getName(charID);
	}

	return font.getCachedGlyph(src, charName);
}
trapeze.font.PDFFontEncoding.TYPE_ENCODING = 0;
trapeze.font.PDFFontEncoding.TYPE_CMAP = 1;