'use strict';

var React = require('react');

var ContactLink = React.createClass({
	getDefaultProps: function () {
		return {email: 'booking@ondaband.com'};
	},

	onClick: function () {
		if (typeof window._gaq !== 'undefined') {
			window._gaq.push(['_trackEvent', 'Contact', 'Send Email']);
		}
		return true;
	},

	render: function () {
		return <a href={'mailto:' + this.props.email} onClick={this.onClick}>{this.props.children}</a>;
	}
});

module.exports = ContactLink;
