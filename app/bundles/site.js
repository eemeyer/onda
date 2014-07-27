'use strict';

var BandPhoto = require('../components/band_photo');
var Contact = require('../components/contact');
var React = require('react');

window.React = React;

var contactElem = document.getElementById('contactLink');
if (contactElem) {
	React.renderComponent(Contact({}, contactElem.innerHTML), contactElem);
}

var bandPhotoElem = document.getElementById('bandPhoto');
if (bandPhotoElem) {
	var siteUrl = bandPhotoElem.getAttribute('data-siteUrl');
	React.renderComponent(BandPhoto({siteUrl: siteUrl}, contactElem.innerHTML), contactElem);
}
