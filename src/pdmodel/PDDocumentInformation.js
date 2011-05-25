goog.provide("trapeze.pdmodel.PDDocumentInformation");
trapeze.pdmodel.PDDocumentInformation = function(dic) {
	this.info = dic;
	
	this.getTitle = function() {
		return this.info.getItem('Title');
	};
}