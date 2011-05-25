goog.provide("trapeze.fauxworker.MainThread");
goog.require("trapeze.fauxworker.WorkerThread");

trapeze.fauxworker.MainThread = {
	postMessage: function(data) {
		trapeze.fauxworker.WorkerThread.onmessage.call(trapeze.fauxworker.WorkerThread.context, {'data': data});
	}
}