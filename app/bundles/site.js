'use strict';

var Contact = require('../components/contact');
var Shows = require('../components/shows');
var SongPlayer = require('../components/song_player');
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
	var elem = document.getElementById('shows');
	if (elem) {
		React.renderComponent(Shows({siteUrl: siteUrl, shows: window.shows || []}), elem);
	}
})();

(function () {
  var elem = document.getElementById('songPlayer');
  if (elem && window.songs) {
    React.renderComponent(SongPlayer({siteUrl: siteUrl, tracks: window.songs}), elem);
  }
})();
