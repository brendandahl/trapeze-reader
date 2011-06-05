goog.provide("trapeze.filter.FilterManager");
goog.require("trapeze.filter.NoFilter");
goog.require("trapeze.filter.LzwFilter");
goog.require("trapeze.filter.FlateFilter");
goog.require("trapeze.filter.ASCII85Filter");
trapeze.filter.FilterManager = function() {
	
};
trapeze.filter.FilterManager.getFilter = function(name) {
	if(name == "FlateDecode" || name == "Fl") {
		return new trapeze.filter.FlateFilter();
	} else if(name == "NoFilter") {
		return new trapeze.filter.NoFilter();
	} else if(name == "LZWDecode" || name == "LZW") {
		return new trapeze.filter.LzwFilter();
	} else if(name == "ASCII85Decode" || name == "A85") {
		return new trapeze.filter.ASCII85Filter();
	} else {
		throw new Exception("Unknown filter " + name);
	}
};