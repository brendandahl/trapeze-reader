function UnimplementedException(message) {
	this.message = "UnimplementedException: " + message;
	console.error(this.message); // Trigger this to so we can see a stack trace
	this.toString = function() {
		return this.message;
	}
}
function ParseException(message) {
	this.message = "ParseException: " + message;
	console.error(this.message); // Trigger this to so we can see a stack trace
	this.toString = function() {
		return this.message;
	}
}
function Exception(message) {
	this.message = "Exception: " + message;
	console.error(this.message); // Trigger this to so we can see a stack trace
	this.toString = function() {
		return this.message;
	}
}