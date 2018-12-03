var settings = function () {
	let openClass = 'open';
	let page = document.getElementById('settings-page');
	let form = document.getElementById('settings-form');
	let btnOpen = document.getElementById('btn-settings');
	let btnClose = document.getElementById('btn-settings-close');
	let btnSave = document.getElementById('btn-settings-save');
	let bankNameInput = document.getElementById('bank-name');
	let bankUrlInput = document.getElementById('bank-url');
	let jiraUrlInput = document.getElementById('jira-url');
	let bankLink = document.getElementById('bank-link');
	let jiraLink = document.getElementById('jira-link');

	function setUpBinding() {
		btnOpen.addEventListener('click', () => {
			toggleSettings();
		});

		btnClose.addEventListener('click', () => {
			toggleSettings();
		});

		form.addEventListener('submit', (e) => {
			e.preventDefault();
			validateForm();
		});

		// Bank link opening
		bankLink.addEventListener('click', (e) => {
			e.preventDefault();

			// Check if href contains #no-bank
			if (bankLink.href.includes('#no-bank')) {
				toggleSettings();
			} else {
				location.href = bankLink.href;
			}
		});

		// JIRA link opening
		jiraLink.addEventListener('click', (e) => {
			e.preventDefault();

			if (jiraLink.href.includes('#no-jira')) {
				toggleSettings();
			} else {
				location.href = jiraLink.href;
			}
		});
	}

	function validateForm() {
		let err = [];

		// Check if they are empty or not
		if (bankNameInput.value.length < 1) {
			bankNameInput.classList.add('has-error');
			err.push('bankName');
		}

		if (bankUrlInput.value.length < 1) {
			bankUrlInput.classList.add('has-error');
			err.push('bankUrl');
		}

		if (jiraUrlInput.value.length < 1) {
			jiraUrlInput.classList.add('has-error');
			err.push('jiraUrl');
		}

		// Do the updating
		if (!err.indexOf('bankName') != -1 && !err.indexOf('bankUrl') != -1) {
			updateBankLink(bankNameInput.value, bankUrlInput.value);
			bankNameInput.classList.remove('has-error');
			bankUrlInput.classList.remove('has-error');
		}

		if (!err.indexOf('jiraUrl') != -1) {
			updateJiraLink(jiraUrlInput.value);
			jiraUrlInput.classList.remove('has-error');
		}

		// Save button
		var oldText = btnSave.textContent;
		btnSave.textContent = 'Saved!';

		setTimeout(() => {
			btnSave.textContent = oldText;

			// Toggle settings for now.
			toggleSettings(false);
		}, 2000);
	}

	function loadData() {
		loadBankData();
		loadJiraData();
	}

	function loadBankData() {
		let lsBankName = localStorage.getItem('bank-name');
		let lsBankUrl = localStorage.getItem('bank-url');

		if (lsBankName == null || lsBankUrl == null) {
			console.log('No bank information found.');
		} else {
			console.log('Loaded bank name: ' + lsBankName);
			console.log('Loaded bank URL: ' + lsBankUrl);

			bankNameInput.value = lsBankName;
			bankUrlInput.value = lsBankUrl;

			updateBankLink(lsBankName, lsBankUrl);
		}
	}

	function loadJiraData() {
		let lsJiraUrl = localStorage.getItem('jira-url');

		if (lsJiraUrl == null) {
			console.log('No JIRA information found.');
		} else {
			console.log('Loaded JIRA URL: ' + lsJiraUrl);

			jiraUrlInput.value = lsJiraUrl;

			updateJiraLink(lsJiraUrl);
		}
	}

	function toggleSettings(toggle) {
		if (toggle == true) {
			page.classList.add(openClass);
		} else if (toggle == false) {
			page.classList.remove(openClass);
		} else {
			// If no toggle was specified
			if (page.classList.contains(openClass)) {
				page.classList.remove(openClass);
			} else {
				page.classList.add(openClass);
			}
		}
	}

	function updateBankLink(label, url) {
		localStorage.setItem('bank-name', label);
		localStorage.setItem('bank-url', url);
		bankLink.textContent = label;
		bankLink.href = url;
	}

	function updateJiraLink(url) {
		localStorage.setItem('jira-url', url);
		jiraLink.href = url;
	}

	// Init
	setUpBinding();
	loadData();
}();