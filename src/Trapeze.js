//goog.require("trapeze.AsyncFileReader");
function Trapeze(file, settings) {
	var defaults = {
		enableWebWorkers: true
	};
	this.settings = $.extend({}, defaults, settings);
	this.currentPage = 1;
	this.totalPages = 0;
	this.init();
	this.standardZooms = [10, 25, 50, 75, 100, 125, 150, 200, 400, 800, 1600];
	this.width = window.innerWidth - 40;
	this.height = window.innerHeight - 40;
	$('#progress').show();
	var asyncFileReader = new AsyncFileReader(file, this, this.loaded, this.progress);
	asyncFileReader.start();
}
Trapeze.prototype = {
	init: function() { 
		this.drawnPages = {};
		this.waitingToDraw = {};
		this.canvasWrappers = [];
		this.contexts = [];
		this.actions = [];
		this.clear();
	},
	progress: function(e) {
		var percentComplete = Math.ceil(100 * e.loaded / e.total);
		var kbLoaded = Math.round(e.loaded / 1000);
		var kbTotal = Math.round(e.total / 1000);
		$('#progressBar').css('width', percentComplete + '%');
		$('#progressPercent').text(percentComplete + "% [" + kbLoaded + " of " + kbTotal + " KB]");
		console.log(percentComplete + "% [" + kbLoaded + " of " + kbTotal + " KB]");
	},
	/**
	 * Called when the file is done loading and ready to start being processed
	 * @param {Integer} fileSize
	 * @param {String} fileContents
	 */
	loaded: function(fileSize, fileContents) {
		$('#progressBar').css('width', '100%');
		$('#progress').hide();
		$('.zoom').removeClass('disabled');
		if(this.settings.enableWebWorkers)
			this.worker = new Worker("TrapezeWorker.js");
		else
			this.worker = MainThread;
		var that = this;
		this.worker.onmessage = function(event) {
			var method = event.data[0];
			var args = event.data[1];
			that[method].apply(that, args);
		};
		this.worker.postMessage({
			type: 'init',
			fileContents: fileContents,
			width: this.width,
			height: this.height
		});
	},
	/**
	 * Creates a canvas and intializes all the support for a page.
	 * Called by the worker.
	 * @param {Integer} pageIndex of page
	 * @param {Object} pageDimensions
	 * @param {Object} realDimensions
	 */
	initPage: function(pageIndex, pageDimensions, realDimensions) {
		var wrapper = $('<div id="page' + ( pageIndex + 1) + '" class="page"></div>"');
		var canvas = $('<canvas id="canvas' + pageIndex + '"></canvas>');
		wrapper.html(canvas);
		wrapper.append('<div id="loading' + pageIndex + '" style="position: absolute; left: 50%; top: 50%;"><img src="images/indicator.gif"></div>');
		wrapper.pageNumber = pageIndex;
		wrapper.rendered = false;
		$('#pages').append(wrapper);
		canvas = this.getCanvas(pageIndex);
		var ctx = canvas.getContext('2d');
		canvas.width = pageDimensions.width;
		canvas.height = pageDimensions.height;
		this.setZoom(100 * pageDimensions.height / realDimensions.height);
		this.contexts[pageIndex] = ctx;
		this.canvasWrappers.push(wrapper);
	},
	/**
	 * Schedule a page to draw.  If the page is already parsed into canvas 
	 * actions it will draw immediately.  If the page hasn't been parsed it will
	 * be drawn as soon as the page finishes parsing, also lets the worker know
	 * the page is needed so it can start(if it hasn't already) parsing it.
	 * @param {Integer} pageIndex
	 */
	schedulePageToDraw: function(pageIndex) {
		if(this.waitingToDraw[pageIndex] === true) {
			return;
		}
		if(this.actions[pageIndex] != undefined) {
			// Page is ready
			this.drawPage(pageIndex);
		} else {
			this.waitingToDraw[pageIndex] = true;
			this.worker.postMessage({
				type: 'requestPage',
				pageIndex: pageIndex
			});
		}
	},
	/**
	 * Called from the work after the page has been parsed and turned into
	 * canvas actions.  If the page has been scheduled to draw it will draw the
	 * page otherwise it will just store the actions until they're needed.
	 * @param {Integer} pageIndex
	 * @param {Array} actions
	 */
	pageReady: function(pageIndex, actions) {
		this.drawnPages[pageIndex] = false;
		this.actions[pageIndex] = actions;
		if(this.waitingToDraw[pageIndex] != undefined) {
			this.drawPage(pageIndex);
		}
	},
	/**
	 * Draws the page.  Loops through the actions for the page and executes them
	 * all in order.
	 * @param {Integer} pageIndex
	 */
	drawPage: function(pageIndex) {
		this.drawnPages[pageIndex] = true;
		var method, args;
		var actions = this.actions[pageIndex];
		var ctx = this.contexts[pageIndex];
		var actionsLength = actions.length;
		for(var i = 0; i < actionsLength; i++) {
			var action = actions[i];
			var type = action[0];
			if(type == 0) {
				method = action[1];
				args = action[2];
				ctx[method].apply(ctx, args);
			} else if(type == 1) {
				var key = action[1];
				var value = action[2];
				ctx[key] = value;
			} else {
				method = action[1];
				args = action[2];

				if(method == 'drawImage') {
					var image = new Image();
					image.src = args[0].src;
					var transform = args[1];
					/*
					 * We need this closure or else only the very last image will get draw
					 * @see http://trephine.org/t/index.php?title=JavaScript_loop_closures
					 */
					(function(image, transform) {
						image.onload = function() {
							ctx.save();
							ctx.setTransform(transform.m00, transform.m10, transform.m01, transform.m11, transform.m02, transform.m12);
							ctx.drawImage(image, 0, 0);
							ctx.restore();
						};
					})(image, transform);
				}
			}
		}
		this.actions[pageIndex] = null;
		$('#loading' + pageIndex).hide();
	},
	clear: function() {
		$('#pages').empty();
	},
	zoomIn: function() {
		var newZoom = this.zoom;
		for(var i = 0; i < this.standardZooms.length; i++) {
			if(this.standardZooms[i] > this.zoom) {
				newZoom = this.standardZooms[i];
				break;
			}
		}
		this.width *= newZoom / this.zoom;
		this.height *= newZoom / this.zoom;
		this.worker.postMessage({
			type: 'redraw',
			width: this.width,
			height: this.height
		});
	},
	zoomOut: function() {
		var newZoom = this.zoom;
		for(var i = this.standardZooms.length; i > -1 ; i--) {
			if(this.standardZooms[i] < this.zoom) {
				newZoom = this.standardZooms[i];
				break;
			}
		}
		this.width *= newZoom / this.zoom;
		this.height *= newZoom / this.zoom;
		this.worker.postMessage({
			type: 'redraw',
			width: this.width,
			height: this.height
		});
	},
	setZoom: function(percent) {
		this.zoom = Math.round(percent);
		$('#zoomPercent').html(Math.round(percent) + '%');
	},
	setTotalPages: function(num) {
		this.currentPage = 1;
		this.totalPages = num;
		$('#totalPages').html(this.totalPages);
	},
	/**
	 * Get canvas DOM Object
	 * @return DOM Object of canvas
	 */
	getCanvas: function(i) {
		return document.getElementById('canvas' + i);
	},
	initPager: function() {
		if(this.totalPages > 1)
			$('#nextPage').show();
		var that = this;
		$(window).scroll(function() {
			for(var i = 0; i < that.canvasWrappers.length; i++) {
				if(that.isScrolledIntoView(that.canvasWrappers[i])) {
					if(!that.drawnPages[i])
						that.schedulePageToDraw(i);
				}
				if(that.isScrolledIntoMiddleView(that.canvasWrappers[i])) {
					var pageNumber = that.canvasWrappers[i].pageNumber;
					that.setPage(pageNumber + 1);
				}
			}
		}).scroll(); // Fire off scroll to render the current page
	},
	nextPage: function() {
		window.location.hash = '#page' + (this.currentPage + 1);
	},
	previousPage: function() {
		window.location.hash = '#page' + (this.currentPage - 1);
	},
	setPage: function(page) {
		this.currentPage = page;
		if(this.currentPage < 2)
			$('#previousPage').hide();
		if(this.totalPages > 1 && this.currentPage < this.totalPages)
			$('#nextPage').show();
		if(this.currentPage >= this.totalPages)
			$('#nextPage').hide();
		if(this.currentPage > 1)
			$('#previousPage').show();
		$('#currentPage').html(page);
	},
	isScrolledIntoView: function(elem) {
		var docViewTop = $(window).scrollTop();
		var docViewBottom = docViewTop + $(window).height();

		var elemTop = elem.offset().top;
		var elemBottom = elemTop + elem.height();

		return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom));
	},
	isScrolledIntoMiddleView: function(elem) {
		var docViewTop = $(window).scrollTop();
		var docViewBottom = docViewTop + ($(window).height() / 2);

		var elemTop = elem.offset().top;
		var elemBottom = elemTop + elem.height();

		return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom));
	},
	//---------------------------------------------
	// Console functions for the web worker
	//---------------------------------------------
	log: function(value) {
		console.log(value);
	},
	error: function(value) {
		console.warn(value);
	},
	warn: function(value) {
		console.warn(value);
	},
	time: function(value) {
		console.time(value);
	},
	timeEnd: function(value) {
		console.timeEnd(value);
	}
};