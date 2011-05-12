function FilterManager() {
	
}
FilterManager.getFilter = function(name) {
	if(name == "FlateDecode" || name == "Fl") {
		return new FlateFilter();
	} else if(name == "NoFilter") {
		return new NoFilter();
	} else if(name == "LZWDecode" || name == "LZW") {
		return new LzwFilter();
	} else if(name == "ASCII85Decode" || name == "A85") {
		return new ASCII85Filter();
	} else {
		throw new Exception("Unknown filter " + name);
	}
};