goog.require("trapeze.cos.COSDictionary");
function PDPageNode(pages) {
	this.page = pages;
	/**
     * This will get the count of descendent page objects.
     *
     * @return The total number of descendent page objects.
     */
    this.getCount = function()
    {
        return this.page.getDictionaryObject('Count').value;
    }
	
	this.getAllKids = function(result) {
		PDPageNode.getAllKidsStatic(result, this.page, true);
	};
	
	/**
     * This is the parent page node.
     *
     * @return The parent to this page.
     */
    this.getParent = function()
    {
        var parent = null;
        var parentDic = this.page.getDictionaryObjectTwoKey( "Parent", "P" );
        if( parentDic != null )
        {
            parent = new PDPageNode( parentDic );
        }
        return parent;
    }
	/**
     * This will get the MediaBox at this page and not look up the hierarchy.
     * This attribute is inheritable, and findMediaBox() should probably used.
     * This will return null if no MediaBox are available at this level.
     *
     * @return The MediaBox at this level in the hierarchy.
     */
    this.getMediaBox = function()
    {
        var retval = null;
        var array = this.page.getDictionaryObject( 'MediaBox' );
        if( array != null )
        {
            retval = new Rectangle2D(
				array.getObject(0).value,
				array.getObject(1).value,
				array.getObject(2).value - array.getObject(0).value,
				array.getObject(3).value - array.getObject(1).value
			);
        }
        return retval;
    }
    /**
     * This will find the resources for this page by looking up the hierarchy until
     * it finds them.
     *
     * @return The resources at this level in the hierarchy.
     */
    this.findResources = function()
    {
        var retval = this.getResources();
        var parent = this.getParent();
        if( retval == null && parent != null )
        {
            retval = parent.findResources();
        }
        return retval;
    }
		/**
     * This will get the resources at this page and not look up the hierarchy.
     * This attribute is inheritable, and findResources() should probably used.
     * This will return null if no resources are available at this level.
     *
     * @return The resources at this level in the hierarchy.
     */
    this.getResources = function()
    {
        var retval = null;
        var resources = this.page.getDictionaryObject( 'Resources' );
        if( resources != null )
        {
            retval = new PDResources( resources );
        }
        return retval;
    }
    /**
     * This will find the MediaBox for this page by looking up the hierarchy until
     * it finds them.
     *
     * @return The MediaBox at this level in the hierarchy.
     */
    this.findMediaBox = function()
    {
        var retval = this.getMediaBox();
        var parent = this.getParent();
        if( retval == null && parent != null )
        {
            retval = this.parent.findMediaBox();
        }
        return retval;
    }
	
}
/**
 * This will return all kids of the given page node as PDPage.
 *
 * @param result All direct and optionally indirect descendents of this node are added to this list.
 * @param page Page dictionary of a page node.
 * @param recurse if true indirect descendents are processed recursively
 */
PDPageNode.getAllKidsStatic = function (result, page, recurse)
{
	var kids = page.getDictionaryObject( 'Kids' );
	if(kids == null)
		return [];
	for( var i=0; i<kids.size(); i++ )
	{
		var obj = kids.getObject( i );
		if (obj instanceof trapeze.cos.COSDictionary)
		{
			var kid = obj;
			if( 'Page' == kid.getDictionaryObject( 'Type' ).name )
			{
				result.push( new PDPage( kid ) );
			}
			else
			{
				if (recurse)
				{
					PDPageNode.getAllKidsStatic(result, kid, recurse);
				}
				else
				{
					result.push( new PDPageNode( kid ) );
				}
			}
		}
	}
	return kids;
}