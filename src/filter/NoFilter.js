goog.provide("trapeze.filter.NoFilter");
trapeze.filter.NoFilter = function() {
	this.decode = function(text) {
		return text;
	};
};