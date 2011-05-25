goog.provide("trapeze.pdmodel.PDPage");
goog.require("trapeze.pdmodel.PDStream");
goog.require("trapeze.pdmodel.PDResources");
goog.require("trapeze.pdmodel.PDPageNode");
goog.require("trapeze.Rectangle2D");
goog.require("trapeze.AffineTransform");
trapeze.pdmodel.PDPage = function(pageDic) {
	this.page = pageDic;
	/**
     * A rectangle, expressed
     * in default user space units, defining the boundaries of the physical
     * medium on which the page is intended to be displayed or printed
     *
     * This will get the MediaBox at this page and not look up the hierarchy.
     * This attribute is inheritable, and findMediaBox() should probably used.
     * This will return null if no MediaBox are available at this level.
     *
     * @return The MediaBox at this level in the hierarchy.
     */
    this.getMediaBox = function()
    {
        var retval = null;
        var array = this.page.getDictionaryObject('MediaBox');
        if( array != null )
        {
			retval = new trapeze.Rectangle2D(
				array.getObject(0).value,
				array.getObject(1).value,
				array.getObject(2).value - array.getObject(0).value,
				array.getObject(3).value - array.getObject(1).value
			);
        }
        return retval;
    }
	this.getRotation = function() {
		var rotation = 0;
		var rotate = this.page.getDictionaryObject('Rotate');
		if(rotate != null)
			rotation = rotate.value;
		return rotation;
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
            retval = parent.findMediaBox();
        }
        return retval;
    }
	
	/**
     * This is the parent page node.  The parent is a required element of the
     * page.  This will be null until this page is added to the document.
     *
     * @return The parent to this page.
     */
    this.getParent = function()
    {
        var parent = null;
        var parentDic = this.page.getDictionaryObjectTwoKey( "Parent", "P" );
        if( parentDic != null )
        {
            parent = new trapeze.pdmodel.PDPageNode( parentDic );
        }
        return parent;
    }
	
	/**
     * This will get the resources at this page and not look up the hierarchy.
     * This attribute is inheritable, and findResources() should probably used.
     * This will return null if no resources are available at this level.
     *
     * @return The resources at this level in the hierarchy.
     */
    this.getResources = function(previousResources)
    {
        var retval = null;
        var resources = this.page.getDictionaryObject( 'Resources' );
        if( resources != null )
        {
            retval = new trapeze.pdmodel.PDResources( resources );
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
     * This will get the contents of the PDF Page, in the case that the contents
     * of the page is an array then then the entire array of streams will be
     * be wrapped and appear as a single stream.
     *
     * @return The page content stream.
     *
     * @throws IOException If there is an error obtaining the stream.
     */
    this.getContents = function()
    {
        return trapeze.pdmodel.PDStream.createFromCOS( this.page.getDictionaryObject( 'Contents' ) );
    }
	
	this.drawToCanvas = function()
	{
		var resolution = 96;
		var mBox = this.findMediaBox();
        var widthPt = mBox.getWidth();
        var heightPt = mBox.getHeight();
        var scaling = resolution / 72; //DEFAULT_USER_SPACE_UNIT_DPI;
        var widthPx = Math.round(widthPt * scaling);
        var heightPx = Math.round(heightPt * scaling);
	}
	
	    /**
     * Get the initial transform to map from a specified clip rectangle in
     * pdf coordinates to an image of the specfied width and
     * height in device coordinates
     *
     * @param width the width of the image
     * @param height the height of the image
     * @param clip the desired clip rectangle (in PDF space) or null to use
     *             the page's bounding box
     */
    this.getInitialTransform = function(width, height){ // TODO, clip) {
        var at = new trapeze.AffineTransform();
        switch (this.getRotation()) {
        // TODDO switch (getRotation()) {
            case 0:
                at = new trapeze.AffineTransform(1, 0, 0, -1, 0, height);
                break;
            case 90:
                at = new trapeze.AffineTransform(0, 1, 1, 0, 0, 0);
                break;
            case 180:
                at = new trapeze.AffineTransform(-1, 0, 0, 1, width, 0);
                break;
            case 270:
                at = new trapeze.AffineTransform(0, -1, -1, 0, width, height);
                break;
        }

        var clip = this.findMediaBox();
		if (this.getRotation() == 90 || this.getRotation() == 270) {
			var tmp = clip.width;
			clip.width = clip.height;
			clip.height = tmp;
		}
		/* if (clip == null) {
            clip = getBBox(); // todo
        } else if (this.getRotation() == 90 || this.getRotation() == 270) {
            var tmp = width;
            width = height;
            height = tmp;
        } */
        // now scale the image to be the size of the clip
        var scaleX = width / clip.getWidth();
        var scaleY = height / clip.getHeight();
        at = at.scale(scaleX, scaleY);

        // create a transform that moves the top left corner of the clip region
        // (minX, minY) to (0,0) in the image
        var zx = -clip.getMinX();
		var zy = -clip.getMinY();
		at = at.translate(-clip.getMinX(), -clip.getMinY());

        return at;
    }
	/**
     * Get the width and height of this image in the correct aspect ratio.
     * The image returned will have at least one of the width and
     * height values identical to those requested.  The other
     * dimension may be smaller, so as to keep the aspect ratio
     * the same as in the original page.
     *
     * @param width the maximum width of the image
     * @param height the maximum height of the image
     * @param clip the region in <b>page space</b> of the page to
     * display.  It may be null, in which the page's defined crop box
     * will be used.
     */
    this.getUnstretchedSize = function(width, height) {
		// TODO this needs work
		var clip = this.findMediaBox();
		if (clip == null) {
            // TODO
			console.error('todo');
			clip = bbox;
        } else {
            if (this.getRotation() == 90 || this.getRotation() == 270) {
                clip = new trapeze.Rectangle2D(
					clip.getX(),
					clip.getY(),
					clip.getHeight(),
					clip.getWidth()
				);
            }
        }

        var ratio = clip.getHeight() / clip.getWidth();
        var askratio = height / width;
        if (askratio > ratio) {
            // asked for something too high
            height = parseInt(width * ratio + 0.5);
        } else {
            // asked for something too wide
            width = parseInt(height / ratio + 0.5);
        }


        return {'width' : width, 'height': height};
    }
}