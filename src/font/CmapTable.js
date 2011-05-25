goog.provide("trapeze.font.CmapTable");
goog.require("trapeze.font.CMap");
trapeze.font.CmapTable = function() {
	this.subTables = {};
	this.setVersion = function(version) {
		this.version = version;
	};
	this.setData = function(data) {
        this.setVersion(data.getShort());
        
        var numberSubtables = data.getShort();
        
        for (var i = 0; i < numberSubtables; i++) {
            var platformID = data.getShort();
            var platformSpecificID = data.getShort();
            var offset = data.getInt();
            
			var mapData = data.subStream(offset);
            
			var cMap = trapeze.font.CMap.getMap(mapData);
			if (cMap != null) {
				this.addCMap(platformID, platformSpecificID, cMap);
			}
        }
	};
	this.addCMap = function(platformID, platformSpecificID, cMap) {
		this.subTables["" + platformID + platformSpecificID] = cMap;
	};
	this.getCMaps = function() {
		var ret = [];
		for(var prop in this.subTables) {
			if(this.subTables.hasOwnProperty(prop)) {
				ret.push(this.subTables[prop]);
			}
		}

		return ret;
	};
	 /**
     * Get a CMap by platform and specific ID
     */
   this.getCMap = function(platformID, platformSpecificID) {
        return this.subTables["" + platformID + platformSpecificID];
    }
}