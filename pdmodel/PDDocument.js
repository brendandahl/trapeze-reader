function PDDocument(cosDocument) {
	this.document = cosDocument;
	
	this.getNumberOfPages = function() {
        var cat = this.getDocumentCatalog();
        return cat.getPages().getCount();
    };
	this.getDocumentCatalog = function() {
		var trailer = this.document.getTrailer();
		var infoDic = trailer.getDictionaryObject('Root'); // TODO: add COSName statics
		if( infoDic == null )
		{
			console.error(" ");throw "hello";
			documentCatalog = new PDDocumentCatalog( this ); // TODO
		}
		else
		{
			documentCatalog = new PDDocumentCatalog( this, infoDic );
		}
		return documentCatalog;
	};
	this.getDocumentInformation = function() {
		var trailer = this.document.getTrailer();
		var infoDic = trailer.getDictionaryObject('Info'); // TODO: statics?
		if( infoDic == null ) // TODO
		{
			infoDic = new COSDictionary();
			trailer.setItem( {name: 'Info'}, infoDic );
		}
		var documentInformation = new PDDocumentInformation( infoDic );
		return documentInformation;
	}
}