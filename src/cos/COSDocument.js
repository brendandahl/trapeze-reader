goog.provide("trapeze.cos.COSDocument");
goog.require("trapeze.cos.COSObject");
/**
 * Represents the whole PDF Document. 
 * Keeps track of all the objects and the loading of them.
 */
trapeze.cos.COSDocument = function() {
	this.version;
	this.parser;
	this._objectPool = {};
	this._xrefTable = {};
	this._trailer = null;
}
trapeze.cos.COSDocument.prototype = {
	/**
	 * Gets an object from the pool. If the object hasn't been loaded
	 * a COSObject is returned that will be lazily loaded.
	 * @return mixed
	 */
	getObjectFromPool: function(key) {
		var hash = key.getKey();
		var object = this._objectPool[hash];
		if(object == null) {
			object = new trapeze.cos.COSObject(null, key, this);
			this._objectPool[hash] = object;
		}
		return object;
	},
	/**
	 * Sets a cross reference in the cross reference table
	 * If a string(number) is passed extra 0 in front are stripped off
	 * @param COSObjectKey key
	 * @param mixed offset can be a number(offset in the file) or a COSObjectStreamLocation
	 */
	setXRef: function(key, offset) {
		if(typeof offset == "string") {
			while (offset.charAt(0) == '0') {
				if (offset.length == 1) {break};
				if (offset.charAt(1) == '.') {break};
				offset = offset.substr(1, offset.length-1)
			}
			offset = parseInt(offset);
		}
		this._xrefTable[key.getKey()] = offset;
	},
	/**
	 * @return {trapeze.cos.COSDictionary}
	 */
	getTrailer: function() {
		return this._trailer;
	},
	/**
	 * @param {trapeze.cos.COSDictionary} trailer
	 */
	setTrailer: function(trailer) {
		this._trailer = trailer;
	},
	/**
	 * Loads an object into the object pool
	 * There are two types of objects that could be loaded:
	 * 	1 - Regular ones defined by an offset
	 * 	2 - Object in a object stream
	 * @param COSObjectKey key
	 */
	loadObject: function(key) {
		var pos = this._xrefTable[key.getKey()];
		if(pos instanceof COSObjectStreamLocation) { // Object Stream Object
			// For now just load all the objects in the stream, could be done lazily
			// Get the object stream
			var obj = this.getObjectFromPool(pos.streamObjectKey);
			var parser = new PDFObjectStreamParser(obj.getObject(), this );
            parser.parse();
			var compressedObjects = parser.streamObjects;
			var coLength = compressedObjects.length;
			for(var j = 0; j < coLength; j++) {
                var next = compressedObjects[j];
                var key = next.getKey();
                var obj = this.getObjectFromPool(key);
                obj.setObject(next.getObject());
            }
		} else { // Regular offset object
			var oldPos = this.parser.stream.getPosition();
			this.parser.stream.setPosition(pos);
			var newObject  = this.parser.parseObject();
			this.parser.stream.setPosition(oldPos);
		}
	},
	toString: function() {
		return "COSDocument";
		var retval = "";
		for(property in this._objectPool)
			retval += this._objectPool[property].toString() + "\n";
		return retval;
	}
}