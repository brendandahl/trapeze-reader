if(typeof window == 'undefined') {
	/*importScript(
		"trapeze-worker-min.js"
	);*/
	
	// We are in a web worker, we need to import everything
	
	importScripts(
		"../lib/closure-library/closure/goog/bootstrap/webworkers.js",
		"../lib/closure-library/closure/goog/base.js",
		"deps.js",
		"util.js",
		"Exceptions.js",
		"GeneralPath.js",
		"external/deflate.js",
		"AsyncFileReader.js",
		"Rectangle2D.js",
		"cos/COSDocument.js",
		"cos/COSArray.js",
		"cos/COSDictionary.js",
		"cos/COSStream.js",
		"cos/COSName.js",
		"cos/COSObject.js",
		"cos/COSObjectKey.js",
		"cos/COSNumber.js",
		"cos/COSNull.js",
		"cos/COSStreamArray.js",
		"cos/COSObjectReference.js",
		"cos/COSObjectStreamLocation.js",
		"PDFObject.js",
		"pdmodel/PDDocument.js",
		"pdmodel/PDDocumentCatalog.js",
		"pdmodel/PDPageNode.js",
		"pdmodel/PDPage.js",
		"pdmodel/PDStream.js",
		"pdmodel/PDDocumentInformation.js",
		"pdmodel/PDResources.js",
		"filter/FilterManager.js",
		"filter/FlateFilter.js",
		"filter/LzwFilter.js",
		"filter/ASCII85Filter.js",
		"filter/NoFilter.js",
		"filter/Predictor.js",
		"filter/PNGPredictor.js",
		"BaseParser.js",
		"PDFParser.js",
		"PDFStreamEngine.js",
		"PDFXrefStreamParser.js",
		"PDFObjectStreamParser.js",
		"PDFOperatorMap.js",
		"PDFOperator.js",
		"PDFStreamParser.js",
		"PDFImage.js",
		"AffineTransform.js",
		"pdmodel/graphics/PDGraphicsState.js",
		"pdmodel/text/PDTextState.js",
		"colorspace/PatternSpace.js",
		"colorspace/PDFColorSpace.js",
		"colorspace/AlternateColorSpace.js",
		"colorspace/IndexedColor.js",
		"colorspace/ICC_ColorSpace.js",
		"font/PDFFontEncoding.js",
		"font/PDFFont.js",
		"font/OutlineFont.js",
		"font/TTFFont.js",
		"font/TrueTypeFont.js",
		"font/PDFFontDescriptor.js",
		"font/FontSupport.js",
		"font/TrueTypeTable.js",
		"font/CmapTable.js",
		"font/HeadTable.js",
		"font/MaxpTable.js",
		"font/LocaTable.js",
		"font/GlyfTable.js",
		"font/HheaTable.js",
		"font/HmtxTable.js",
		"font/PostTable.js",
		"font/Glyf.js",
		"font/GlyfSimple.js",
		"font/CMap.js",
		"font/CMapFormat0.js",
		"font/CMapFormat4.js",
		"font/PDFGlyph.js",
		"font/GlyfCompound.js",
		"font/PSParser.js",
		"font/CIDFontType2.js",
		"font/Type0Font.js",
		"font/Type1Font.js",
		"font/Type1CFont.js",
		"font/Type3Font.js",
		"font/BuiltInFont.js",
		"font/BaseFontMap.js",
		"font/AdobeGlyphList.js",
		"font/PDFCMap.js",
		"function/PDFFunction.js",
		"function/FunctionType0.js",
		"external/base64.js",
		"StreamBuffer.js"
	);
goog.require("trapeze.Faux2dContext");
	// Files only needed for a web worker
	importScripts(
		"FauxConsole.js",
		"Image.js",
		"external/jquerywebworker.js"
	);
	
   //importScripts("TrapezeWorker.js");
	
}
(function(mainThread) {
	var postMessage = mainThread.postMessage;

	function TrapezeWorker() {
	}
	TrapezeWorker.prototype = {
		onmessage: function(event) {
			if(event.data['type'] == 'init') {
				console.time('process');
				// Go start processing the file and drawing pages
				var stream = new StreamBuffer(event.data['fileContents']);
				var parser = new PDFParser(stream);
				parser.parse();
				var myDocument = parser.getPDDocument();
				var info = myDocument.getDocumentInformation();
				this.pages = myDocument.getDocumentCatalog().getAllPages();
				this.currentPage = 1;
				this.totalPages = this.pages.length;
				postMessage([
					'setTotalPages',
					[this.totalPages]
				]);
				this.init(event.data['width'], event.data['height']);
				console.timeEnd('process');
			} else if(event.data['type'] == 'redraw') {
				postMessage([
					'init',
					[]
				]);
				this.init(event.data['width'], event.data['height']);
			} else if(event.data['type'] == 'requestPage') {
				/*
				 * Only process the desired page and one page after it.
				 * Most browswers get a little overwhelmed if we try to parse
				 * all the pages on really long pdfs
				 */
				this.drawPage(event.data['pageIndex']);
				if((event.data['pageIndex'] + 1) < this.totalPages) {
					this.drawPage(event.data['pageIndex'] + 1);
				}
			}
		},
		init: function(width, height) {
			this.preferredWidth = width;
			this.preferredHeight = height;
			for(var i = 0; i < this.totalPages; i++) {
				var page = this.pages[i];
				page.drawn = false;
				// The desired width and height get converted to match aspect ratio
				var pageSize = page.getUnstretchedSize(this.preferredWidth, this.preferredHeight);
				var mediaBox = page.findMediaBox();
				postMessage([
					'initPage',
					[i, pageSize, mediaBox]
				]);
			}
			postMessage(['initPager'], []);
		},
		drawPage: function(i) {
			var page = this.pages[i];
			if(page.drawn)
				return;
			page.drawn = true;
			var resources = page.findResources();
			var canvas = this.getCanvas(i);
			// The desired width and height get converted to match aspect ratio
			var pageSize = page.getUnstretchedSize(this.preferredWidth, this.preferredHeight);

			var transform = page.getInitialTransform(pageSize.width, pageSize.height);

			var ctx = canvas.getContext('2d');
			canvas.width = pageSize.width;
			canvas.height = pageSize.height;
			ctx.transform(transform.m00, transform.m10, transform.m01, transform.m11, transform.m02, transform.m12);

			var engine = new PDFStreamEngine(canvas.getContext("2d"), transform);
			engine.processStream(page, resources, page.getContents().getStream());
			page.drawToCanvas();

			ctx.post();
		},
		getCanvas: function(i) {
			// Faux canvas
			var ctx = new trapeze.Faux2dContext(postMessage, i);
			return {
				index: i,
				width: 0,
				height: 0,
				getContext: function(context) {
					return ctx;
				}
			};
		}
	}

	var worker = new TrapezeWorker();
	mainThread.setOnMessage(function(event) {
		worker.onmessage(event);
	});

})(typeof window == 'undefined'
	?
		{
			postMessage: function(data) {
				postMessage(data);
			},
			setOnMessage: function(f) {
				onmessage = f;
			}
		}
	:
		WorkerThread);