goog.provide("trapeze.fauxworker.WorkerThread");
goog.require("trapeze.fauxworker.MainThread");

trapeze.fauxworker.WorkerThread = {
	postMessage: function(data) {
		trapeze.fauxworker.MainThread.onmessage({'data': data});
	},
	setOnMessage: function(f) {
		this.onmessage = f;
	}
}