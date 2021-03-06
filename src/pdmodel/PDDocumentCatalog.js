goog.provide("trapeze.pdmodel.PDDocumentCatalog");
goog.require("trapeze.pdmodel.PDPageNode");
goog.require("trapeze.cos.COSString");
goog.require("trapeze.cos.COSDictionary");

trapeze.pdmodel.PDDocumentCatalog = function(doc, rootDictionary) {
	this.document = doc;
	if(rootDictionary) {
		this.root = rootDictionary;
	} else {
        this.root = new trapeze.cos.COSDictionary();
        this.root.setItem('Type', new trapeze.cos.COSString("Catalog"));
        this.document.document.getTrailer().setItem('Root', this.root );
	}
	
	/**
     * This will get the root node for the pages.
     *
     * @return The parent page node.
     */
    this.getPages = function()
    {
        return new trapeze.pdmodel.PDPageNode( this.root.getDictionaryObject( 'Pages') );
    };
	
	/**
     * The PDF document contains a hierarchical structure of PDPageNode and PDPages, which
     * is mostly just a way to store this information.  This method will return a flat list
     * of all PDPage objects in this document.
     *
     * @return A list of PDPage objects.
     */
    this.getAllPages = function()
    {
        var retval = [];
        var rootNode = this.getPages();
        
		rootNode.getAllKids(retval);
        return retval;
    };

};