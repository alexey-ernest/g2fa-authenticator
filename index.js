var authenticator = require('authenticator');

function onformsubmit(e) {
	e.preventDefault();
}

function onkeychange() {
	var code;

	var keyEl = document.getElementById('g2fa-key');
	if (!keyEl || !keyEl.value) {
		code = '';
	} else {
		code = authenticator.generateToken(keyEl.value);	
	}
	
	// showing code
	var resultEl = document.getElementById('result');	
	if (!resultEl) {
		return;
	}

	resultEl.innerText = code;
}

function oncodeclick(e) {
	e.target.focus();
	e.target.dispatchEvent(new Event('dblclick'));
}

(function () {

	window.onload = function() {
		var keyEl = document.getElementById('g2fa-key');
		if (keyEl) {
			keyEl.focus();
		}

		setInterval(onkeychange, 5000);
	};
	
})();