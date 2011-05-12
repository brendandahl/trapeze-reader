function COSDictionary(items) {
	if(typeof items != 'undefined')
		this._items = items;
	else
		this._items = {};
}
COSDictionary.prototype = {	
	setItem: function(key, value) {
		this._items[key.name] = value;
	},
	getItem: function(key) {
		return this._items[key];
	},
	/**
     * This will get an object from this dictionary.  If the object is a reference then it will
     * dereference it and get it from the document.  If the object is COSNull then
     * null will be returned.
     *
     * @param key The key to the object that we are getting.
     *
     * @return The object that matches the key.
     */
    getDictionaryObject: function(key) {
        //if(!items.hasOwnProperty(key))
		//	throw "Dictionary does not contain item with key '" + key + "'";
		var retval = this._items[key];
		if(typeof(retval) == 'undefined')
			return null;
        if( retval instanceof COSObject )
        {
            return retval.getObject();
        }
        return retval;
    },
	/**
     * This is a special case of getDictionaryObject that takes multiple keys, it will handle
     * the situation where multiple keys could get the same value, ie if either CS or ColorSpace
     * is used to get the colorspace.
     * This will get an object from this dictionary.  If the object is a reference then it will
     * dereference it and get it from the document.  If the object is COSNull then
     * null will be returned.
     *
     * @param firstKey The first key to try.
     * @param secondKey The second key to try.
     *
     * @return The object that matches the key.
     */
    getDictionaryObjectTwoKey: function(firstKey, secondKey ) {
        var retval = this.getDictionaryObject( firstKey );
        if( retval == null ) {
            retval = this.getDictionaryObject( secondKey );
        }
        return retval;
    },
	/**
     * This will add all of the dictionarys keys/values to this dictionary.
     * Only called when adding keys to a trailer that already exists. 
     *
     * @param dic The dic to get the keys from.
     */
    addAll: function(dic) {
        var dicKeys = dic.keyList();
		var dicLength = dicKeys.length;
        for(var i = 0; i < dicLength; i++) {
            var key = dicKeys[i];
            var value = dic.getItem(key);
            /*
             * If we're at a second trailer, we have a linearized 
             * pdf file, meaning that the first Size entry represents
             * all of the objects so we don't need to grab the second. 
             */
            if(key != "Size" || this._items["Size"] == null)
            {
                this.setItem( {"name": key}, value );
            }
        }
    },
	/**
     * This will add all of the dictionarys keys/values to this dictionary.
     *
     * @param dic The dic to get the keys from.
     */
    putAll: function(dic) {
        var dicKeys = dic.keyList();
		var dicLength = dicKeys.length;
        for(var i = 0; i < dicLength; i++) {
            var key = dicKeys[i];
            var value = dic.getItem(key);
			this.setItem( {"name": key}, value );
        }
    },
	keyList: function() {
		var ret = [];
		for(property in this._items) {
			ret.push(property);
		}
		return ret;
	},
	toString: function(depth) {
		return "COSDictionary";
		depth = depth || 0;
		if(depth > 2) return "\t".repeat(depth) + "...";
		var retval = "\t".repeat(depth) + "COSDictionary: \n";
		for(property in this._items)
			retval += "\t".repeat(depth) + "'" + property + "' => " +this._items[property].toString(depth + 1).replace(/^\s+/,"") + "\n";
		return retval;
	}
}