goog.provide("trapeze.pdmodel.graphics.PDGraphicsState");
goog.require("trapeze.pdmodel.text.PDTextState");
trapeze.pdmodel.graphics.PDGraphicsState = function() {
	var currentTransformationMatrix = new Matrix();
	var textState = new trapeze.pdmodel.text.PDTextState();
    //Here are some attributes of the Graphics state, but have not been created yet.
    //
/*     //clippingPath
    var strokingColor = new PDColorState();
    private PDColorState nonStrokingColor = new PDColorState();
    private PDTextState textState = new trapeze.pdmodel.text.PDTextState();
    private double lineWidth = 0;
    private int lineCap = 0;
    private int lineJoin = 0;
    private double miterLimit = 0;
    private PDLineDashPattern lineDashPattern;
    private String renderingIntent;
    private boolean strokeAdjustment = false;
    //blend mode
    //soft mask
    private double alphaConstants = 0;
    private boolean alphaSource = false;

    //DEVICE DEPENDENT parameters
    private boolean overprint = false;
    private double overprintMode = 0;
    //black generation
    //undercolor removal
    //transfer
    //halftone
    private double flatness = 1.0;
    private double smoothness = 0;

    private GeneralPath currentClippingPath; */
	this.clone = function() {
		return jQuery.extend(true, {}, this);
	};
	this.setCurrentTransformationMatrix = function(matrix) {
		currentTransformationMatrix = matrix;
	};
	this.getCurrentTransformationMatrix = function(matrix) {
		return currentTransformationMatrix;
	};
	this.getTextState = function() {
		return this.textState;
	};
};