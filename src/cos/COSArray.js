goog.provide("trapeze.cos.COSArray");
goog.require("trapeze.cos.COSObject");
trapeze.cos.COSArray = function() {
	this._objects = [];
}
trapeze.cos.COSArray.prototype = {
	add: function(object) {
		this._objects.push(object);
	},
	remove: function() {
		// TODO add index
		return this._objects.pop();
	},
	get: function(index) {
		return this._objects[index];
	},
	size: function() {
		return this._objects.length;
	},
	/**
     * This will get an object from the array.  This will dereference the object.
     * If the object is COSNull then null will be returned.
     *
     * @param index The index into the array to get the object.
     *
     * @return The object at the requested index.
     */
    getObject: function(index) {
        var obj = this._objects[index];
        if(obj instanceof trapeze.cos.COSObject) {
            obj = obj.getObject();
        }
        return obj;
    },
	/**
	 * Builds a generic javascript array and derefrences
	 * all the objects.
	 */
	getArray: function() {
		var size = this.size();
		var ret = new Array(size);
		for(var i = 0; i < size; i++) {
			ret[i] = this.getObject(i);
		}
		return ret;
	},
	toString: function(depth) {
		return "COSArray";
		depth = depth || 0;
		if(depth > 10) return "\t".repeat(depth) + "...";
		var retVal = "\t".repeat(depth) + "COSArray: [\n";
		 for(var i = 0; i < this._objects.length; i++) {
			retVal += this._objects[i].toString(depth + 1) + "\n";
		}
		
		return retVal + "\t".repeat(depth) + "]";
	}
}