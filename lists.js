var weather = function () {
	var listEls = document.querySelectorAll('.links-list');
	var timer = 0;
	var timerDelay = 250;

	function animate() {
		listEls.forEach(el => {
			setTimeout(() => {
				if (el.classList.contains('loading')) {
					el.classList.remove('loading');
				}
			}, timer);

			timer += timerDelay;
		});
	}

	// Init
	window.addEventListener('load', () => {
		animate();
	})
}();