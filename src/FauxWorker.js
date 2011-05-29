/**
 * @fileoverview A fake web worker.
 */
goog.provide("trapeze.FauxWorker");

goog.require("trapeze.TrapezeWorker");

/**
 * A fake web worker for browsers that don't support web workers, it is also
 * handy for debugging since firebug doesn't really support debugging web worker
 * threads.
 * @constructor
 */
trapeze.FauxWorker = function() {
	var that = this;
	this.worker = new trapeze.TrapezeWorker(function(data) {
		that.onmessage({'data': data});
	});
}

/**
 * This posts a message to the TrapezeWorker.
 * @param {Array} data The data to send to TrapezeWorker
 */
trapeze.FauxWorker.prototype.postMessage = function(data) {
	this.worker.onmessage({'data': data});
}

