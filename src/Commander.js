goog.provide("trapeze.Commander");

goog.require("trapeze.cos.COSString");
goog.require("trapeze.cos.COSDictionary");

trapeze.Commander = function(graphics, resources, initialMatrix, streamEngine) {
	// The 2D context of the canvas
	this.graphics = graphics;
	this.graphics.beginPath();
	this.text = new TextState(this);
	this.textStack = [];
	this.transform = initialMatrix;
	this.transformStack = [];
	// TODO move this to a state
	this.fillCS = null;
	// TODO move this to a state
	this.strokeCS = null;
	
	this.resources = resources;
	this.initialMatrix = initialMatrix;
	this.streamEngine = streamEngine;
	this.clip = 0;
}
trapeze.Commander.prototype = {
	/**
	 * 'q' Save graphics state
	 */
	saveGraphics: function(args) {
		this.graphics.save();
		this.transformStack.push(this.transform);
		this.transform = this.transform.clone();
		// TODO: Do i also need to save the text state?
	},
	/**
	 * 'Q' Restore graphics state
	 */
	restoreGraphics: function(args) {
		this.graphics.restore();
		this.transform = this.transformStack.pop();
		// TODO: Do i also need to pop the text state?
	},
	/**
	 * 'cm' Concatenate matrix to current transformation matrix
	 */
	concatenate: function(args) {
	 	var a = args[0].value;
		var b = args[1].value;
		var c = args[2].value;
		var d = args[3].value;
		var e = args[4].value;
		var f = args[5].value;

		this.graphics.transform(a, b, c, d, e, f);
		this.transform = this.transform.multiply(new AffineTransform(a, b, c, d, e, f));
	},
	/**
	 * 're' Append rectangle to path
	 */
	appendRectangleToPath: function(args) {
		var x = args[0].value;
		var y = args[1].value;
		var width  = args[2].value;
		var height = args[3].value;
		this.graphics.moveTo(x, y);  
		this.graphics.lineTo(x + width, y);  
		this.graphics.lineTo(x + width, y + height);  
		this.graphics.lineTo(x, y + height);
		this.graphics.closePath();
	},
	/**
	 * 'BT' Begin text object
	 */
	beginText: function(args) {
		this.text.textMatrix = new AffineTransform();
		this.text.textLineMatrix = new AffineTransform();
	},
	/**
	 * 'n' End path without filling or stroking
	 */
	endPath: function(args) {
		if (this.clip != 0) {
			this.addPath(this.clip);
		}
		this.clip = 0;
		this.graphics.closePath();
		this.graphics.beginPath(); // TODO: Do I really need to begin a new path after?
	},
	setGraphicsStateParameters: function(args) {
		var name = args[0].name;
		
		var gsobj = this.resources.getGraphicsState(name);
        // get LW, LC, LJ, Font, SM, CA, ML, D, RI, FL, BM, ca
        // out of the reference, which is a dictionary
        if(gsobj == null)
			return;
		var d;
        if ((d = gsobj.getDictionaryObject("LW")) != null) {
            this.setLineWidth([d]);
        }
        if ((d = gsobj.getDictionaryObject("LC")) != null) {
            this.setLineCapStyle([d]);
        }
        if ((d = gsobj.getDictionaryObject("LJ")) != null) {
            this.setLineJoinStyle([d]);
        }
        if ((d = gsobj.getDictionaryObject("Font")) != null) {
            this.textFormat.setFont([d]);
        }
        if ((d = gsobj.getDictionaryObject("ML")) != null) {
            this.setLineMiterLimit([d]);
        }
        if ((d = gsobj.getDictionaryObject("D")) != null) {
			console.warn("gs - dash not done");
            /*PDFObject pdash[] = d.getAt(0).getArray();
            float dash[] = new float[pdash.length];
            for (int i = 0; i < pdash.length; i++) {
                dash[i] = pdash[i].getFloatValue();
            }
            this.addDash(dash, d.getAt(1).getFloatValue());
			*/
        }
        if ((d = gsobj.getDictionaryObject("CA")) != null) {
			console.warn("gs - stroke alpha not done");
            //this.addStrokeAlpha(d.getFloatValue());
        }
        if ((d = gsobj.getDictionaryObject("ca")) != null) {
			console.warn("gs - fille alpha not done");
            //this.addFillAlpha(d.getFloatValue());
        } 
	},
	/**
	 * 'ET' End text
	 */
	endText: function(args) {
		// Noop
	},
	/**
	 * 'l' Append straight line segment to path
	 */
	lineTo: function(args) {
		var x = args[0].value;
		var y = args[1].value;
		
		this.graphics.lineTo(x,y);
	},
	/**
	 * 'Td' Move text posistion
	 */
	moveText: function(args) {
		var x = args[0].value;
		var y = args[1].value;

		// Move both text matrices
		this.text.carriageReturn(x, y);
	},
	/**
	 * 'TD' Move text position and set leading
	 */
	moveTextSetLeading: function(args) {
		var x = args[0].value;
		var y = args[1].value;
		this.text.leading = -y;
		this.text.carriageReturn(x, y);
	},
	/**
	 * 'm' Move graphics position
	 */
	moveTo: function(args) {
		var x = args[0].value;
		var y = args[1].value;
		// TODO move the state graphics too
		this.graphics.moveTo(x, y);  
	},
	/**
	 * 'TL' Set text leading
	 */
	setTextLeading: function(args) {
		var leading = args[0].value;
		
		this.text.leading = leading;
	},
	/**
	 * 'Tr' Set text rendering mode
	 */
	setTextRenderingMode: function(args) {
		var mode = args[0].value;
		this.text.setMode(mode);
	},
	/**
	 * 'Ts' Set text rise
	 */
	setTextRise: function(args) {
		var rise = args[0].value;
		
		this.text.rise = rise;
	},
	/**
	 * 'Tm' Set text matrix
	 */
	setTextMatrix: function(args) {
		var a = args[0].value;
		var b = args[1].value;
		var c = args[2].value;
		var d = args[3].value;
		var e = args[4].value;
		var f = args[5].value;

        var textMatrix = new AffineTransform(a, b, c, d, e, f);
		
        this.text.textMatrix = textMatrix;
        this.text.textLineMatrix = textMatrix.clone();
	},
	/**
	 * 'Tf' set text font and size
	 */
	setTextFont: function(args) {
		if( args.length >= 2 )
        {
			// TODO: set the text state with this info
			var fontName = args[0];
			var fontSize = args[1].value;
			this.text.fontSize = fontSize;
			var fontObj = this.resources.getFont(fontName.name);
			if(fontObj != null) {
				var fontName = fontObj.getDictionaryObject('BaseFont');
				//this.text.font = fontName.name;
				this.text.font = PDFFont.getFont(fontObj, this.resources);
			} else {
			debugger;
				
			}
		}
	},
	/**
	 * 'Tw' set word spacing
	 */
	setWordSpacing: function(args) {
		var wordSpacing = args[0].value;
		this.text.wordSpacing = wordSpacing;
	},
	/**
	 * 'Tc' set char spacing
	 */
	setCharSpacing: function(args) {
		var characterSpacing = args[0].value;
		this.text.characterSpacing = characterSpacing;
	},
	/**
	 * 'Tj' show text
	 */
	showText: function(args) {
		var text = args[0].value;
		this.text.graphics = this.graphics;
		this.text.doText(text);
	},
	/**
	 * 'TJ' show kerned text
	 */
	showKernedText: function(args) {
		var textArray = args[0];
		var length = textArray.size();
		for(var i = 0; i < length; i++) {
			var obj = textArray.get(i);
			if(obj instanceof COSNumber) {
				var val = obj.value / 1000;
				this.text.textMatrix = this.text.textMatrix.translate(-val * this.text.fontSize * this.text.horizontalScaling, 0);
			} else if(obj instanceof trapeze.cos.COSString) {
				this.text.graphics = this.graphics;
				this.text.doText(obj.value);
			}
		}
	},
	/**
	 * 'S' Stroke path
	 */
	strokePath: function(args) {
		this.addPath(Shape.STROKE | this.clip);
		this.clip = 0;
		this.graphics.beginPath();
	},
	/**
	 * 's' Close and Stroke path
	 */
	closeAndStrokePath: function(args) {
		this.graphics.closePath();
		this.addPath(Shape.STROKE | this.clip);
		this.clip = 0;
		this.graphics.beginPath();
	},
	/**
	 * 'f' Fill path
	 */
	fillPath: function(args) {
		this.addPath(Shape.FILL | this.clip);
		this.clip = 0;
		this.graphics.beginPath();
	},
	/**
	 * 'f*' Fill path using even-odd winding rule
	 * unfortunately canvas only supports non-zero winding
	 */
	fillEvenOddRule: function(args) {
		// TODO: use even odd winding rule
		this.addPath(Shape.FILL | this.clip);
		this.clip = 0;
		this.graphics.beginPath();
	},
	/**
	 * 'B' Fill and stroke
	 */
	fillNonZeroAndStrokePath: function(args) {
		this.graphics.closePath();  
		this.addPath(Shape.BOTH | this.clip);
		this.clip = 0;
		this.graphics.beginPath();
	},
	/**
	 * 'b' Close Stroke and fill Path
	 */
	closeStrokefillPath: function(args) {
		this.graphics.closePath();  
		this.addPath(Shape.BOTH | this.clip);
		this.clip = 0;
		this.graphics.beginPath();
	},
	/**
	 * 'g' Set the gray color for non stroking operations
	 */
	setNonStrokingGrayColor: function(args) {
		var x = Math.round(args[0].value * 255);
		this.graphics.fillStyle = 'rgb(' + x + ',' + x + ',' + x + ')';
	},
	/**
	 * 'G' Set the gray color for stroking operations
	 */
	setStrokingGrayColor: function(args) {
		var x = Math.round(args[0].value * 255);
		this.graphics.strokeStyle = 'rgb(' + x + ',' + x + ',' + x + ')';
	},
	/**
	 * 'rg' Set the color for non stroking operations
	 */
	setNonStrokingRGBColor: function(args) {
		var r = Math.round(args[0].value * 255);
		var g = Math.round(args[1].value * 255);
		var b = Math.round(args[2].value * 255);
		this.graphics.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
	},
	/**
	 * 'RG' Set the stroke color
	 */
	setStrokingRGBColor: function(args) {
		var r = Math.round(args[0].value * 255);
		var g = Math.round(args[1].value * 255);
		var b = Math.round(args[2].value * 255);
		this.graphics.strokeStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
	},
	/**
	 * 'k' Set the color for non stroking operations
	 */
	setNonStrokingCMYKColor: function(args) {
		var c = args[0].value;
		var m = args[1].value;
		var y = args[2].value;
		var k = args[3].value;
		
		var rgb = PDFColorSpace.CMYKtoRGB(c, m, y, k);
		this.graphics.fillStyle = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
	},
	/**
	 * 'K' Set the stroke color
	 */
	setStrokingCMYKColor: function(args) {
		var c = args[0].value;
		var m = args[1].value;
		var y = args[2].value;
		var k = args[3].value;
 
		var rgb = PDFColorSpace.CMYKtoRGB(c, m, y, k);
 
		this.graphics.strokeStyle = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
	},
	/**
	 * 'cs' Set non stroking color space
	 */
	setNonStrokingColorSpace: function(args) {
		//debugger;
		console.warn('not finished with "cs"');
		this.fillCS = PDFColorSpace.getColorSpace(args[0], this.resources);
	},
	/**
	 * 'scn' Set non stroking color
	 */
	setNonStrokingColor: function(args) {
		//debugger;
		if(this.fillCS instanceof PatternSpace) {
			console.warn('not finished with "scn"');
			this.graphics.fillStyle = 'rgb(' + 0 + ',' + 0 + ',' + 0 + ')';
			return;
			var patternName = args[0].name;
			var patternDictionary = this.resources.resources.getDictionaryObject("Pattern");
			var pattern = patternDictionary.getDictionaryObject(patternName);
			var components = [];
			for(var i = 1; i < args.length; i++)
				components.push(args[i].value);
			this.fillCS.getPaint(pattern, components, this.resources);
		} else {
			var n = this.fillCS.getNumComponents();
			var arry = [];
			for(var i = 0; i < n; i++)
				arry.push(args[i].value);
			var rgb = this.fillCS.getPaint(arry);
			var r = Math.round(rgb[0] * 255);
			var g = Math.round(rgb[1] * 255);
			var b = Math.round(rgb[2] * 255);
			this.graphics.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
		}
	},
	/**
	 * 'T*' go to next line
	 */
	carriageReturn: function(args) {
		this.text.carriageReturn();
	},
	/**
	 * ''' go to next line
	 */
	moveAndShow: function(args) {
		var text = args[0].value;
		this.text.carriageReturn();
		this.text.doText(text);
	},
	/**
	 * 'Tz' Set horizontal scaling
	 */
	setHorizontalTextScaling: function(args) {
		var scale = args[0].value;
		this.text.horizontalScaling = scale / 100;
	},
	/**
	 * 'w' Set line width
	 */
	setLineWidth: function(args) {
		var width = args[0].value;
		this.graphics.lineWidth = width;
	},
	/**
	 * 'W' Mark path for clipping
	 */
	clipNonZeroRule: function(args) {
		this.clip = Shape.CLIP;
	},
	/**
	 * 'W*' Mark path for clipping using even-odd winding
	 * Again canvas doesn't support even-odd winding
	 */
	clipEvenOddRule: function(args) {
		this.clip = Shape.CLIP;
	},
	/**
	 * 'h' Close path
	 */
	closePath: function(args) {
		this.graphics.closePath();
	},
	/**
	 * 'c' Append curved segment to path (three control points)
	 */
	curveTo: function(args) {
		var a = args[0].value;
		var b = args[1].value;
		var c = args[2].value;
		var d = args[3].value;
		var e = args[4].value;
		var f = args[5].value;

		this.graphics.bezierCurveTo(a, b, c, d, e, f);
	},
	/**
	 * 'v' Append curved segment to path (initial point replicated)
	 */
	curveToReplicateInitialPoint: function(args) {
		/* 
		 * The problem is we have no way right now of knowing the current
		 * point so we can't replicate this.  For now we'll at least move the 
		 * position to the correct spot.
		 * TODO figure out how to fix this
		 */
		var a = args[0].value;
		var b = args[1].value;
		var c = args[2].value;
		var d = args[3].value;
		this.graphics.quadraticCurveTo(a, b, c, d);
	},
	/**
	 * 'y' Append curved segment to path (final point replicated)
	 */
	curveToReplicateFinalPoint: function(args) {
		var a = args[0].value;
		var b = args[1].value;
		var c = args[2].value;
		var d = args[3].value;
		this.graphics.bezierCurveTo(a, b, c, d, c, d);
	},
	/**
	 * 'BX' Begin compatibility section
	 */
	beginCompatibilitySection: function(args) {
		// NOOP
	},
	endCompatibilitySection: function(args) {
		// NOOP
	},
	/**
	 * 'BI' Begin Inline Image
	 */
	beginInlineImage: function(args) {
		// NOOP all the work is done in endInlineImage
	},
	/**
	 * 'EI' End Inline Image
	 */
	endInlineImage: function(args) {
		this.doImage(args[0]);
	},
	/**
	 * 'do' do the XObject (form or image)
	 */
	doXObject: function(args) {
		var name = args[0].name;
		var xObject = this.resources.getXObject(name);
		var dictionary = xObject.dictionary;
		var subType = dictionary.getDictionaryObject('Subtype').name;
		if(subType == 'Image') {
			this.doImage(xObject);
		} else if(subType == 'Form') {
			this.doForm(xObject);
			console.warn("XObject type '" + subType + "' is not completely done.");
		} else {
			console.warn("XObject type '" + subType + "' is not supported yet.");
		}
	},
	doImage: function(obj) {
		this.graphics.save();

		var dictionary = obj.dictionary;
		var width = dictionary.getDictionaryObject('Width').value;
		var height = dictionary.getDictionaryObject('Height').value;
		var at = new AffineTransform(1 / width, 0, 0, -1 / height, 0, 1);

		// We have to store the transform since the image won't be loaded yet
		var transform = this.transform.multiply(at);
		var imageSource = obj.getImageString(this.resources, this.graphics);
		var image = new Image();
		image.src = imageSource;
		this.graphics.drawImage(image, transform);

		this.graphics.restore();
	},
	doForm: function(obj) {
		//var formCmds = (PDFPage) obj.getCache();
        //if (formCmds == null) {
            // rats.  parse it.
            var at;
            //Rectangle2D bbox;
            var matrix = obj.dictionary.getDictionaryObject("Matrix");
            if (matrix == null) {
                at = new AffineTransform();
            } else {
                var elts = [];
                for (var i = 0; i < 6; i++) {
                    elts[i] = matrix.get(i).value;
                }
                at = new AffineTransform(elts[0], elts[1], elts[2], elts[3], elts[4], elts[5]);
            }
            var bobj = obj.dictionary.getDictionaryObject("BBox");
            /*bbox = new Rectangle2D.Float(bobj.getAt(0).getFloatValue(),
                    bobj.getAt(1).getFloatValue(),
                    bobj.getAt(2).getFloatValue(),
                    bobj.getAt(3).getFloatValue());
            formCmds = new PDFPage(bbox, 0);
            formCmds.addXform(at);
			*/
			
            //HashMap<String,PDFObject> r = new HashMap<String,PDFObject>(resources);
            // TODO shouldn't be accessing private variable
			var r = new trapeze.cos.COSDictionary(jQuery.extend(true, {}, this.resources.resources._items));
			var rsrc = obj.dictionary.getDictionaryObject("Resources");

            if (rsrc != null) {
                r.putAll(rsrc);
            }
			var previousResources = this.resources;
			this.resources = new PDResources(r);
			var transform = at;
			this.graphics.save();
			this.graphics.transform(transform.m00, transform.m10, transform.m01, transform.m11, transform.m02, transform.m12);
			this.transform = this.transform.multiply(at);			
			//var engine = new PDFStreamEngine(this.graphics, at);
			this.streamEngine.processSubStream( null, r, obj);
			this.graphics.restore();
			this.resources = previousResources;
            

           // obj.setCache(formCmds);
       // }
       // cmds.addPush();
        //cmds.addCommands(formCmds);
       // cmds.addPop();
	},
	/**
	 * 'j' Set line join style
	 * canvas supports: round, bevel and miter
	 */
	setLineJoinStyle: function(args) {
		var joinStyle = args[0].value;
		var join = 'miter';
		switch (joinStyle) {
            case 0:
                join = 'miter';
                break;
            case 1:
                join = 'round';
                break;
            case 2:
                join = 'bevel';
                break;
		}
		this.graphics.lineJoin = join;
	},
	/**
	 * 'J' Set line cap style
	 * canvas supports: butt, round and square
	 */
	setLineCapStyle: function(args) {
		var capStyle = args[0].value;
		var cap = 'butt';
		switch (capStyle) {
            case 0:
                cap = 'butt';
                break;
            case 1:
                cap = 'round';
                break;
            case 2:
                cap = 'square';
                break;
        }
		this.graphics.lineCap = cap;
	},
	/**
	 * 'M' Set line miter limit
	 */
	setLineMiterLimit: function(args) {
		var limit = args[0].value;
		this.graphics.miterLimit = limit;
	},
	/**
	 * Not a command just a helper function
	 */
	addPath: function(style) {
		if((style & Shape.FILL) != 0)
			this.graphics.fill();
		if((style & Shape.STROKE) != 0)
			this.graphics.stroke();
		if((style & Shape.CLIP) != 0)
			this.graphics.clip();
	}
}

function TextState(commander) {
	this.commander = commander
	this.textMatrix;
	this.textLineMatrix;
    //these are set default according to PDF Reference 1.5 section 5.2
    this.characterSpacing = 0;
    this.wordSpacing = 0;
    //this.scaling = 100;
	this.horizontalScaling = 1; // Instead of keeping it 100 we just keep it as float
    this.leading = 0;
    this.font;
    this.fontSize;
	this.renderingMode = Shape.FILL;
    this.rise = 0;
    this.knockout = true;
	
	this.graphics;
	
	this.carriageReturn = function(xArg, yArg) {
		var x = 0;
		var y = -this.leading;
		if(arguments.length == 2) {
			x = xArg;
			y = yArg;
		}
		this.textLineMatrix = this.textLineMatrix.translate(x, y);
        this.textMatrix = this.textLineMatrix.clone();
	},
	/**
     * set the mode of the text.  The correspondence of m to mode is
     * show in the following table.  m is a value from 0-7 in binary:
     * 
     * 000 Fill
     * 001 Stroke
     * 010 Fill + Stroke
     * 011 Nothing
     * 100 Fill + Clip
     * 101 Stroke + Clip
     * 110 Fill + Stroke + Clip
     * 111 Clip
     *
     * Therefore: Fill corresponds to the low bit being 0; Clip
     * corresponds to the hight bit being 1; and Stroke corresponds
     * to the middle xor low bit being 1.
     */
    this.setMode = function(m) {
        var mode = 0;
        if ((m & 0x1) == 0) {
            mode |= Shape.FILL;
        }
        if ((m & 0x4) != 0) {
            mode |= Shape.CLIP;
        }
        if (((m & 0x1) ^ ((m & 0x2) >> 1)) != 0) {
            mode |= Shape.STROKE;
        }
		
        this.renderingMode = mode;
    };
	this.doText = function(text) {
		var scale = new AffineTransform(this.fontSize, 0, 0, this.fontSize * this.horizontalScaling, 0, this.rise);
		var glyphs = this.font.getGlyphs(text);
        
        for (var i = 0; i < glyphs.length; i++) {
            this.graphics.save();

			var glyph = glyphs[i];
			var at = this.textMatrix.clone();
            at = at.multiply(scale);
			var transform = at;
			this.graphics.transform(transform.m00, transform.m10, transform.m01, transform.m11, transform.m02, transform.m12);
			this.graphics.beginPath();
			var advance = glyph.render(this.graphics, this.commander);
			
			if((this.renderingMode & Shape.FILL) != 0)
				this.graphics.fill();
			if((this.renderingMode & Shape.STROKE) != 0)
				this.graphics.stroke();
			if((this.renderingMode & Shape.CLIP) != 0)
				this.graphics.clip();
            
			var advanceX = (advance.x * this.fontSize) + this.characterSpacing;
            if (glyph.getChar() == ' ') {
                advanceX += this.wordSpacing;
            }
            advanceX *= this.horizontalScaling;

            this.textMatrix = this.textMatrix.translate(advanceX, advance.y);
            this.graphics.restore();
        }
		this.graphics.beginPath();
	};
}
function Shape() {
}
/** stroke the outline of the path with the stroke paint */
Shape.STROKE = 1;
/** fill the path with the fill paint */
Shape.FILL = 2;
/** perform both stroke and fill */
Shape.BOTH = 3;
/** set the clip region to the path */
Shape.CLIP = 4;