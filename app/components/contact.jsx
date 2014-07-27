'use strict';

var React = require('react');

var ContactLink = React.createClass({
	getDefaultProps: function () {
		return {email: 'booking@ondaband.com'};
	},

	sendMail: function () {
		window.open('mailto:' + this.props.email);
		return false;
	},
	render: function () {
		return <a href='#mailto' onClick={this.sendMail}>{this.props.children}</a>;
	}
});

module.exports = ContactLink;
