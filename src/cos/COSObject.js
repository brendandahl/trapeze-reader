goog.provide("trapeze.cos.COSObject");
/**
 * @param object object the object that this wraps, null if its not loaded yet
 * @param COSObjectKey key of the object
 * @param {trapeze.cos.COSDocument} document that the object belongs to
 */
trapeze.cos.COSObject = function(object, key, document) {
	this._object = object;
	this._key = key;
	this._document = document;
}
trapeze.cos.COSObject.prototype = {
	/**
	 * Set the interal object
	 */
	setObject: function(object) {
		this._object = object;
	},
	/**
	 * Gets the COS Object.
	 * Takes care of loading it if it hasn't already been loaded
	 */
	getObject: function() {
		if(this._object === null) {
			this._document.loadObject(this._key);
			if(this._object === null) {
				throw Exception("Error loading indirect object: " + obj.key.getKey());
			}
		}
		return this._object;
	},
	/**
	 * @return COSObjectKey 
	 */
	getKey: function() {
		return this._key;
	},
	toString: function(depth) {
		return "COSObject";
		depth = depth || 0;
		if(this.object != null)
			return "\t".repeat(depth) + "COSObject: \n" +	this.object.toString(depth + 1);
		else
			return "\t".repeat(depth) + "COSObject: null";
	}
}