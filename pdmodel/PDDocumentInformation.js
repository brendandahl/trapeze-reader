function PDDocumentInformation(dic) {
	this.info = dic;
	
	this.getTitle = function() {
		return this.info.getItem('Title');
	};
}