function GeneralPath() {
	this.at = new AffineTransform();
	this.commands = [['transform', [this.at.m00, this.at.m10, this.at.m01, this.at.m11, this.at.m02, this.at.m12]]];
}
GeneralPath.prototype.moveTo = function(x, y) {
	this.commands.push(['moveTo', [x, y]]);
}
GeneralPath.prototype.quadTo = function(x1, y1, x2, y2) {
	this.commands.push(['quadraticCurveTo', [x1, y1, x2, y2]]);
}
GeneralPath.prototype.curveTo = function(cp1x, cp1y, cp2x, cp2y, x, y) {
	this.commands.push(['bezierCurveTo', [cp1x, cp1y, cp2x, cp2y, x, y]]);
}
GeneralPath.prototype.lineTo = function(x, y) {
	this.commands.push(['lineTo', [x, y]]);
}
GeneralPath.prototype.closePath = function() {
	this.commands.push(['closePath', []]);
}
/**
 * Transform is a little different since we only want one transform and not multiple.
 */
GeneralPath.prototype.transform = function(matrix) {
	this.at = this.at.multiply(matrix);
	this.commands[0] = ['transform', [this.at.m00, this.at.m10, this.at.m01, this.at.m11, this.at.m02, this.at.m12]];
}
/**
 * Append a path to this one.
 */
GeneralPath.prototype.append = function(path) {
	for(var i = 1; i < path.commands.length; i++) {
		this.commands.push(path.commands[i]);
	}
}