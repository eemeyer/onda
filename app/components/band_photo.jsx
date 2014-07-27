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
		return <div
			style={{position: 'relative', margin: '0 auto'}}
				onMouseEnter={this.alternate}
				onMouseOut={this.restore}
				onTouchStart={this.alternate}
				onTouchEnd={this.restore}
			>
			<img src={this.props.siteUrl + this.props.alt}
				style={{
					position: 'relative',
					left:0,
					'-webkit-transition': 'opacity 0.5s ease-in-out',
					'-moz-transition': 'opacity 0.5s ease-in-out',
					'-o-transition': 'opacity 0.5s ease-in-out',
					'transition': 'opacity 0.5s ease-in-out'
			}}/>
			<img src={this.props.siteUrl + this.props.main} style={{
					opacity: this.state.which === 'main' ? 1 : 0,
					position: 'absolute',
					left:0,
					'-webkit-transition': 'opacity 0.5s ease-in-out',
					'-moz-transition': 'opacity 0.5s ease-in-out',
					'-o-transition': 'opacity 0.5s ease-in-out',
					'transition': 'opacity 0.5s ease-in-out'
			}}/>
		</div>;
	}
});

module.exports = BandPhoto;
