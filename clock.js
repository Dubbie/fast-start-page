var clock = function() {
	var clockEl = document.getElementById('clock');
	var updateInterval = 1;

	function update() {
		var now = new Date();
		var h = now.getHours();
		var m = now.getMinutes();
		if (m < 10) {
			m = '0' + m;
		}

		var output = h + ':' + m;

		// Check DOM
		if (clockEl.textContent != output) {
			clockEl.textContent = output;

			// Remove Loading stuff
			if (clockEl.classList.contains('loading')) {
				clockEl.classList.remove('loading');
			}
		}
	}

	// Start the module
	update();
	setInterval(function() {
		update();
	}, updateInterval * 1000)

	// Give back the module
	return {
		update: update
	}
}();