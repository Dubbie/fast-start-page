var weather = function () {
	var apiUrl = 'https://subitest.000webhostapp.com/get_weather.php';
	var tempEl = document.getElementById('weather-temp');
	var descEl = document.getElementById('weather-description');
	var updateInterval = 1000 * 60 * 10 // 10 mins
	var retryTime = 5; // 5 mins
	var rounded = true;

	function update() {
		var request = new XMLHttpRequest();
		request.open('GET', apiUrl, true);

		// Successfull request
		request.onload = function () {
			var data = JSON.parse(this.response);

			descEl.textContent = data.weather_description;

			if (rounded) {
				tempEl.textContent = Math.round(data.temp) + '°C';
			} else {
				tempEl.textContent = data.temp + '°C';
			}

			// Remove Loading stuff
			if (descEl.classList.contains('loading')) {
				descEl.classList.remove('loading');
				tempEl.classList.remove('loading');
			}
		}

		// Error with request
		request.onerror = function () {
			// Check if the timer is above 5 minutes
			if (retryTime > 5 * 60) {
				retryTime = 5;
			}

			// Start a timer to try again later
			console.log('Error while getting Weather: Retrying in ' + retryTime + ' seconds');
			setTimeout(function () {
				update();

				retryTime += retryTime; // Increment the timer
			}, retryTime * 1000);
		}

		request.send();
	}

	// Check HTTPS
	if (location.protocol == 'https:') {
		apiUrl = apiUrl.replace('http://', 'https://');
		console.log('Noticed website uses HTTPS, switching out API url to HTTPS version.');
	}

	// Start the module
	update();
	setInterval(function () {
		update();
	}, updateInterval);

	// Give back the module
	return {
		update: update
	}
}();