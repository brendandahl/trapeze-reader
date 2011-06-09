/**
 * An fake image object for when we are in a web worker.
 */
if(typeof window == 'undefined') { // Only if we're in a web worker
	Image = function() {
	};
}

