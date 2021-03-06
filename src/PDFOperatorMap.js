goog.provide("trapeze.PDFOperatorMap");
/*
This Table is a correspondance Map of the PDF stream operators with concretes class of the
OperatorProcessor abstract class for the stategy pattern used in the
org.apache.pdfbox.util.PDFStreamEngine class.
To change the behaviour of the system', remplace the class name by a new class name.
*/
trapeze.PDFOperatorMap = function() {
	this.map = {
		'b': 'closeStrokefillPath',
		'B': 'fillNonZeroAndStrokePath',
		//'b*':'pagedrawer.CloseFillEvenOddAndStrokePath''',
		//'B*':'pagedrawer.FillEvenOddAndStrokePath''',
		//'#BDC NotImplemented ##Begin Marked Content -- section 10.5''',
		'BI': 'beginInlineImage',
		//'#BMC NotImplemented ##Begin Marked Content -- section 10.5'',
		'BT': 'beginText',
		'BX': 'beginCompatibilitySection',
		'c': 'curveTo',
		'cm': 'concatenate',
		//'CS':'SetStrokingColorSpace'',
		'cs': 'setNonStrokingColorSpace',
		//'d':'pagedrawer.SetLineDashPattern'',
		//'#d0 NotImplemented'',
		//'#d1 NotImplemented'',
		'Do': 'doXObject',
		//'#DP NotImplemented ##Marked Content Point-- section 10.5'',
		'EI': 'endInlineImage',
		//'#El NotImplemented'',
		//'#EMC NotImplemented ##End Marked Content -- section 10.5'',
		'ET': 'endText',
		'EX': 'endCompatibilitySection',
		'f': 'fillPath',
		//'F':'pagedrawer.FillNonZeroRule'',
		'f*': 'fillEvenOddRule',
		'G': 'setStrokingGrayColor',
		'g': 'setNonStrokingGrayColor',
		'gs': 'setGraphicsStateParameters',
		'h': 'closePath',
		//'#i NotImplemented'',
		//'#ID NotImplemented'',
		'j': 'setLineJoinStyle',
		'J': 'setLineCapStyle',
		'K': 'setStrokingCMYKColor',
		'k': 'setNonStrokingCMYKColor',
		'l': 'lineTo',
		'm': 'moveTo',
		'M': 'setLineMiterLimit',
		////'#MP NotImplemented ##Marked Content Point-- section 10.5'',
		'n': 'endPath',
		'q': 'saveGraphics',
		'Q': 'restoreGraphics',
		're': 'appendRectangleToPath',
		'RG': 'setStrokingRGBColor',
		'rg': 'setNonStrokingRGBColor',
		//'#ri NotImplemented'',
		's': 'closeAndStrokePath',
		'S': 'strokePath',
		//'SC': 'setStrokingColor',
		//'sc':'SetNonStrokingColor'',
		//'SCN':'SetStrokingColor'',
		'scn': 'setNonStrokingColor',
		//'#sh NotImplemented'',
		'T*': 'carriageReturn',
		'Tc': 'setCharSpacing',
		'Td': 'moveText',
		'TD': 'moveTextSetLeading',
		'Tf' : 'setTextFont',
		'Tj': 'showText',
		'TJ': 'showKernedText',
		'TL': 'setTextLeading',
		'Tm': 'setTextMatrix',
		'Tr': 'setTextRenderingMode',
		'Ts': 'setTextRise',
		'Tw': 'setWordSpacing',
		'Tz': 'setHorizontalTextScaling',
		'v': 'curveToReplicateInitialPoint',
		'w': 'setLineWidth',
		'W' : 'clipNonZeroRule',
		'W*': 'clipEvenOddRule',
		'y': 'curveToReplicateFinalPoint',
		'\'': 'moveAndShow'
		//'\"':'SetMoveAndShow'
	};
};