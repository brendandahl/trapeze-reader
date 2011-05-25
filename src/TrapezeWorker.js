if(typeof window == 'undefined') {

	// We are in a web worker, we need to import everything
	CLOSURE_BASE_PATH = "http://trapeze/lib/closure-library/closure/goog/";
	//debugger;
	if(typeof goog == 'undefined')
		importScripts(
			"../lib/closure-library/closure/goog/bootstrap/webworkers.js",
			"../lib/closure-library/closure/goog/base.js",
			"deps.js"
			
		);
	// Files only needed for a web worker
	importScripts(
		"FauxConsole.js",
		"util.js",
		"Image.js",
		"external/jquerywebworker.js",
		"external/deflate.js",
		"external/base64.js"
	);
	 
   //importScripts("TrapezeWorker.js");
	
}
goog.provide("trapeze.TrapezeWorker");
goog.require("trapeze.StreamBuffer");
goog.require("trapeze.PDFStreamEngine");
goog.require("trapeze.PDFParser");
goog.require("trapeze.fauxworker.MainThread");
goog.require("trapeze.Faux2dContext");

(function(mainThread) {
	var postMessage = mainThread.postMessage;

	trapeze.TrapezeWorker = function() {
	}
	trapeze.TrapezeWorker.prototype = {
		onmessage: function(event) {
			if(event.data['type'] == 'init') {
				console.time('process');
				// Go start processing the file and drawing pages
				var stream = new trapeze.StreamBuffer(event.data['fileContents']);
				var parser = new trapeze.PDFParser(stream);
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

			var engine = new trapeze.PDFStreamEngine(canvas.getContext("2d"), transform);
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

	var worker = new trapeze.TrapezeWorker();
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
		trapeze.fauxworker.WorkerThread);