'use strict';

var BandPhoto = require('../components/band_photo');
var Contact = require('../components/contact');
var Shows = require('../components/shows');
var React = require('react');

window.React = React;

var siteUrl = document.getElementsByTagName('html')[0].getAttribute('data-siteUrl');

(function () {
	var elem = document.getElementById('contactLink');
	if (elem) {
		React.renderComponent(Contact({}, elem.innerHTML), elem);
	}

})();

(function () {
	var elem = document.getElementById('bandPhoto');
	if (elem) {
		React.renderComponent(BandPhoto({siteUrl: siteUrl}, elem.innerHTML), elem);
	}
})();

(function () {
	var elem = document.getElementById('shows');
	if (elem) {
		React.renderComponent(Shows({siteUrl: siteUrl, shows: window.shows || []}), elem);
	}
})();
