goog.provide("trapeze.FauxConsole");
/**
 * Mock console to pass so we can still use some debugging inside web worker
 */
function console() {
};
console.log = function(value) {
	postMessage([
		'log',
		[value]
	]);
};
console.warn = function(value) {
	postMessage([
		'warn',
		[value]
	]);
};
console.error = function(value) {
	postMessage([
		'error',
		[value]
	]);
};
console.time = function(value) {
	postMessage([
		'time',
		[value]
	]);
};
console.timeEnd = function(value) {
	postMessage([
		'timeEnd',
		[value]
	]);
};

