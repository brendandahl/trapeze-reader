/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
MainThread = {
	postMessage: function(data) {
		WorkerThread.onmessage.call(WorkerThread.context, {'data': data});
	}
}
WorkerThread = {
	postMessage: function(data) {
		MainThread.onmessage({'data': data});
	},
	setOnMessage: function(f) {
		this.onmessage = f;
	}
}
