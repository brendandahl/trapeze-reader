goog.provide("trapeze.font.CMapFormat4");
trapeze.font.CMapFormat4 = function(languange) {
	this.glyphIndex;
	this.segments = {
		_keys: [],
		_items: [],
		remove: function(o) {
			var length = this._keys.length;
			for(var i = 0; i < length; i++) {
				if(this._keys[i].equals(o)) {
					this._keys.splice(i);
					this.splice(i);
					break;
				}
			}
		},
		put: function(key, value) {
			this._keys.push(key);
			this._items.push(value);
		},
		get: function(index) {
			return [this._keys[index], this._items[index]];
		},
		size: function() {
			return this._keys.length;
		}
	};
};
/**
 * Add a segment with an idDelta
 */
trapeze.font.CMapFormat4.prototype.addSegmentWithDelta = function(startCode, endCode, idDelta) {
	var s = new Segment(startCode, endCode, false);
	        
	// make sure we remove any old entries
	this.segments.remove(s);
	this.segments.put(s, idDelta);
};
/**
 * Add a segment with an idDelta
 */
trapeze.font.CMapFormat4.prototype.addSegmentWithMap = function(startCode, endCode, map) {
	if (map.length != (endCode - startCode) + 1) {
		throw new IllegalArgumentException("Wrong number of entries in map");
	}
	var s = new Segment(startCode, endCode, true);
	// make sure we remove any old entries
	this.segments.remove(s);
	this.segments.put(s, map);
};
trapeze.font.CMapFormat4.prototype.setData = function(length, data) {
	// read the table size values
	var segCount = data.getShort() / 2;
	var searchRange = data.getShort();
	var entrySelector = data.getShort();
	var rangeShift = data.getShort();

	// create arrays to store segment info
	var endCodes = new Array(segCount);
	var startCodes = new Array(segCount);
	var idDeltas = new Array(segCount);
	var idRangeOffsets = new Array(segCount);
	  
	// the start of the glyph array
	var glyphArrayPos = 16 + (8 * segCount);
	
	// read the endCodes
	for (var i = 0; i < segCount; i++) {
	   endCodes[i] = data.getShort();
	}
	
	// read the pad
	data.getShort();
	
	// read the start codes
	for (var i = 0; i < segCount; i++) {
		startCodes[i] = data.getShort();
	}
	
	// read the idDeltas
	for (var i = 0; i < segCount; i++) {
		idDeltas[i] = data.getShort();
	}
	
	// read the id range offsets
	for (var i = 0; i < segCount; i++) {
		idRangeOffsets[i] = data.getShort();
		
		// calculate the actual offset
		if (idRangeOffsets[i] <= 0) {
			// the easy way
			this.addSegmentWithDelta(startCodes[i], endCodes[i], idDeltas[i]);
		} else {
			// find the start of the data segment
			var offset = (data.getPosition() - 2) + idRangeOffsets[i];
		
			// get the number of entries in the map
			var size = (endCodes[i] - startCodes[i]) + 1;
		
			// allocate the actual map
			var map = new Array(size);
			
			// remember our offset
			var oldOffset = data.getPosition(); // data.mark();
			 
			// read the mappings    
			for (var c = 0; c < size; c++) {
				data.setPosition(offset + (c * 2));
				map[c] = data.getChar().charCodeAt(0);
			}
  
			// reset the position
			data.setPosition(oldOffset); //data.reset();
			
			this.addSegmentWithMap(startCodes[i], endCodes[i], map);
		}
	}       
};
trapeze.font.CMapFormat4.prototype.map = function(src) {
	// TODO make sure src is always INTGER, coudl be char that we need to convert
	if(typeof src == "string")
		src = src.charCodeAt(0);
	// find first segment with endcode > src
	var size = this.segments.size();
	for(var i = 0; i < size; i++) {
		var keyValue = this.segments.get(i);
		var s = keyValue[0];
		var value = keyValue[1];
		
		if (s.endCode >= src) {
			// are we within range?
			if (s.startCode <= src) {
				if (s.hasMap) {
					// return the index of this character in 
					// the segment's map
					var map = value;
					return map[src - s.startCode];
				} else {
					// return the character code + idDelta
					var idDelta = value;
					return (src + idDelta);
				}
			} else {
				// undefined character
				return 0;
			}
		}
	}
	
	// shouldn't get here!
	return 0
};

function Segment(startCode, endCode, hasMap) {
	/** the end code (highest code in this segment) */
	this.endCode = (0xffff & endCode);
	
	/** the start code (lowest code in this segment) */
	this.startCode = (0xffff & startCode);
	
	/** whether it is a map or a delta */
	this.hasMap = hasMap;
};
/** Equals based on compareTo (only compares endCode) */
Segment.prototype.equals = function(o) {
	return (this.compareTo(o) == 0);
};

/** Segments sort by increasing endCode */
Segment.prototype.compareTo = function(o) {
	if (!(o instanceof Segment)) {
		return -1;
	}
	
	var s = o;

	// if regions overlap at all, declare the segments equal,
	// to avoid overlap in the segment list
	if (((s.endCode >= this.startCode) && (s.endCode <= this.endCode)) ||
		((s.startCode >= this.startCode) && (s.startCode <= this.endCode))) {
		return 0;
	} if (this.endCode > s.endCode) {
		return 1;
	} else if (this.endCode < s.endCode) {
		return -1;
	} else {
		return 0;
	}
};