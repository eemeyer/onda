'use strict';

var BandPhoto = require('../components/band_photo');
var Contact = require('../components/contact');
var React = require('react');

window.React = React;

(function () {
	var elem = document.getElementById('contactLink');
	if (elem) {
		React.renderComponent(Contact({}, elem.innerHTML), elem);
	}

})();

(function () {
	var elem = document.getElementById('bandPhoto');
	if (elem) {
		var siteUrl = elem.getAttribute('data-siteUrl');
		React.renderComponent(BandPhoto({siteUrl: siteUrl}, elem.innerHTML), elem);
	}
})();
