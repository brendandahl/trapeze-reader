if(typeof window == 'undefined') {

	// We are in a web worker, we need to import everything
	if(typeof COMPILED == 'undefined') {
		importScripts(
			"../external/closure-library/closure/goog/bootstrap/webworkers.js",
			"../external/closure-library/closure/goog/base.js",
			"deps.js",
			"FauxConsole.js",
			"Image.js",
			"util.js"
		);
	}
	// Files only needed for a web worker
	importScripts(
		"../external/jquerywebworker.js",
		"../external/deflate.js",
		"../external/base64.js"
	);
}
goog.provide("trapeze.TrapezeWorker");
goog.require("trapeze.util");
goog.require("trapeze.StreamBuffer");
goog.require("trapeze.PDFStreamEngine");
goog.require("trapeze.PDFParser");
goog.require("trapeze.Faux2dContext");

trapeze.TrapezeWorker = function(callback) {
	this.callback = callback;
};
trapeze.TrapezeWorker.prototype.postMessage = function(data) {
	this.callback(data);
};
trapeze.TrapezeWorker.prototype.onmessage = function(event) {
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
		this.postMessage([
			'setTotalPages',
			[this.totalPages]
		]);
		this.init(event.data['width'], event.data['height']);
		console.timeEnd('process');
	} else if(event.data['type'] == 'redraw') {
		this.postMessage([
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
};
trapeze.TrapezeWorker.prototype.init = function(width, height) {
	this.preferredWidth = width;
	this.preferredHeight = height;
	for(var i = 0; i < this.totalPages; i++) {
		var page = this.pages[i];
		page.drawn = false;
		// The desired width and height get converted to match aspect ratio
		var pageSize = page.getUnstretchedSize(this.preferredWidth, this.preferredHeight);
		var mediaBox = page.findMediaBox();
		this.postMessage([
			'initPage',
			[i, pageSize, mediaBox]
		]);
	}
	this.postMessage(['initPager'], []);
};
trapeze.TrapezeWorker.prototype.drawPage = function(i) {
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
};
trapeze.TrapezeWorker.prototype.getCanvas = function(i) {
	// Faux canvas
	var that = this;
	var ctx = new trapeze.Faux2dContext(function(data) {
		that.postMessage(data);
	}, i);
	return {
		index: i,
		width: 0,
		height: 0,
		getContext: function(context) {
			return ctx;
		}
	};
};
if(typeof window == 'undefined') { // In a web worker we have to kick start things
	var that = this;
	var worker = new trapeze.TrapezeWorker(function(data) {
		that.postMessage(data);
	});
	// Wire up the worker to the main thread
	addEventListener('message', function(event) {
		worker.onmessage(event);
	}, false);
}