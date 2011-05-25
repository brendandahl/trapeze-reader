goog.provide("trapeze.Rectangle2D");
/**
 * Constructs and initializes a <code>Rectangle2D</code>
 * from the specified <code>float</code> coordinates.
 *
 * @param x the X coordinate of the upper-left corner
 *          of the newly constructed <code>Rectangle2D</code>
 * @param y the Y coordinate of the upper-left corner
 *          of the newly constructed <code>Rectangle2D</code>
 * @param w the width of the newly constructed
 *          <code>Rectangle2D</code>
 * @param h the height of the newly constructed
 *          <code>Rectangle2D</code>
 * @since 1.2
*/
trapeze.Rectangle2D = function(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
}
trapeze.Rectangle2D.prototype = {
	getX: function() {
		return this.x;
	},
	getY: function() {
		return this.y
	},
	getWidth: function() {
		return this.width;
	},
	getHeight: function() {
		return this.height;
	},
	/**
     * Returns the smallest X coordinate of the framing
     * rectangle of the <code>Shape</code> in <code>double</code>
     * precision.
     * @return the smallest X coordinate of the framing
     *          rectangle of the <code>Shape</code>.
	 */
	getMinX: function() {
		return this.x;
	},
	/**
     * Returns the smallest Y coordinate of the framing
     * rectangle of the <code>Shape</code> in <code>double</code>
     * precision.
     * @return the smallest Y coordinate of the framing
     *          rectangle of the <code>Shape</code>.
     */
	getMinY: function() {
		return this.y;
	},
	isEmpty: function() {
		if(this.width == 0 || this.height == 0)
			return true;
		return false;
	}
};