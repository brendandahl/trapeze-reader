goog.provide("trapeze.AsyncFileReader");
trapeze.AsyncFileReader = function(url, context, callback, progress) {
	this.url = url;
	this.callback = callback;
	this.progress = progress;
	this.context = context;
}
trapeze.AsyncFileReader.prototype.start = function() {
	var that = this;
	if(this.url instanceof File) {
		var reader = new FileReader();
		reader.onload = function(e) {
			var fileContents = e.target.result;
			var fileSize = fileContents.length;
			that.callback.apply(that.context, [fileSize, fileContents]);
		};
		reader.readAsBinaryString(this.url);
	} else {
		var req = new XMLHttpRequest();
		req.addEventListener("progress", function(e) {
			that.progress.apply(that.context, [e]);
		}, false);

		req.addEventListener("load", function() {
			if (req.status != 200) throw new Exception("File load failed");
			var fileContents = req.responseText;
			var fileSize = fileContents.length;
			that.callback.apply(that.context, [fileSize, fileContents]);
		}, false);
		req.open('GET', this.url, true);

		//XHR binary charset opt by Marcus Granado 2006 [http://mgran.blogspot.com]
		req.overrideMimeType('text/plain; charset=x-user-defined');
		req.send(null);
	}
}