goog.provide("trapeze.pdmodel.PDDocument");
goog.require("trapeze.pdmodel.PDDocumentInformation");
goog.require("trapeze.pdmodel.PDDocumentCatalog");
goog.require("trapeze.cos.COSDictionary");
trapeze.pdmodel.PDDocument = function(cosDocument) {
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
			documentCatalog = new trapeze.pdmodel.PDDocumentCatalog( this ); // TODO
		}
		else
		{
			documentCatalog = new trapeze.pdmodel.PDDocumentCatalog( this, infoDic );
		}
		return documentCatalog;
	};
	this.getDocumentInformation = function() {
		var trailer = this.document.getTrailer();
		var infoDic = trailer.getDictionaryObject('Info'); // TODO: statics?
		if( infoDic == null ) // TODO
		{
			infoDic = new trapeze.cos.COSDictionary();
			trailer.setItem( {name: 'Info'}, infoDic );
		}
		var documentInformation = new trapeze.pdmodel.PDDocumentInformation( infoDic );
		return documentInformation;
	}
}