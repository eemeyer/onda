'use strict';

var React = require('react');

var BandPhoto = React.createClass({
	getDefaultProps: function () {
		return {
			siteUrl: '',
			main: '/images/onda-serious-med.png',
			alt: '/images/onda-happy-med.png'
		};
	},

	getInitialState: function () {
		return {which: 'main'};
	},

	alternate: function () {
		this.setState({which: 'alt'});
	},

	restore: function () {
		this.setState({which: 'main'});
	},

	render: function () {
		return <img src={this.props.siteUrl + (this.state.which === 'main' ? this.props.main : this.props.alt)}
			onMouseEnter={this.alternate}
			onMouseOut={this.restore}
			onTouchStart={this.alternate}
			onTouchEnd={this.restore}/>;
	}
});

module.exports = BandPhoto;
