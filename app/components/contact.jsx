'use strict';

var React = require('react');

var ContactLink = React.createClass({
	getDefaultProps: function () {
		return {email: 'booking@ondaband.com'};
	},

	render: function () {
		return <a href={'mailto:' + this.props.email}>{this.props.children}</a>;
	}
});

module.exports = ContactLink;
