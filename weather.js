var weather = function () {
	var apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=Sz%C3%A1zhalombatta&APPID=ee22f9492de64a33cfc087fb36484c8e&units=metric';
	var tempEl = document.getElementById('weather-temp');
	var descEl = document.getElementById('weather-description');
	var updateInterval = 1000 * 60 * 10 // 10 mins
	var retryTime = 5; // 5 mins
	var rounded = true;

	function update() {
		var request = new XMLHttpRequest();
		request.open('GET', apiUrl, true);

		// Successfull request
		request.onload = function() {
			var data = JSON.parse(this.response);

			console.log(data);
			descEl.textContent = data.weather[0].description;

			if (rounded) {
				tempEl.textContent = Math.round(data.main.temp) + '°C';
			} else {
				tempEl.textContent = data.main.temp + '°C';
			}

			// Remove Loading stuff
			if (descEl.classList.contains('loading')) {
				descEl.classList.remove('loading');
				tempEl.classList.remove('loading');
			}
		}

		// Error with request
		request.onerror = function() {
			// Check if the timer is above 5 minutes
			if (retryTime > 5 * 60) {
				retryTime = 5;
			}

			// Start a timer to try again later
			console.log('Error while getting Weather: Retrying in ' + retryTime + ' seconds');
			setTimeout(function() {
				update();

				retryTime += retryTime; // Increment the timer
			}, retryTime * 1000);
		}

		request.send();
	}

	// Start the module
	update();
	setInterval(function() {
		update();
	}, updateInterval);

	// Give back the module
	return {
		update: update
	}
}();