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

	componentDidMount: function () {
		window.addEventListener('resize', this.checkSize, false);
	},

	componentWillUnmount: function () {
		window.removeEventListener('resize', this.checkSize, false);
	},

	checkSize: function () {
		var left = (this.refs.container.getDOMNode().offsetWidth - this.refs.img.getDOMNode().offsetWidth) / 2;
		this.setState({height: this.refs.img.getDOMNode().offsetHeight, left: left});
	},

	getInitialState: function () {
		return {
			which: 'main',
			height: 0,
			left: 0,
			loaded: false
		};
	},

	touchStart: function () {
		var self = this;
		self.checkSize();
		self.setState({which: 'alt'});
		window.setTimeout(function () {
			self.checkSize();
			self.setState({which: 'main'});
		}, 1000);
	},

	alternate: function () {
		this.checkSize();
		this.setState({which: 'alt'});
	},

	restore: function () {
		this.checkSize();
		this.setState({which: 'main'});
	},

	loaded: function () {
		this.setState({loaded: true});
		this.checkSize();
	},

	render: function () {
		return <div
			ref='container'
			className='band-photo'
			style={{position: 'relative', margin: '0 auto', height: this.state.height}}
				onMouseEnter={this.alternate}
				onMouseOut={this.restore}
				onTouchStart={this.touchStart}
			>
			<img src={this.props.siteUrl + this.props.alt}
				style={{
					position: 'absolute',
					left: this.state.left,
					display: !this.state.loaded ? 'none' : 'inherit'
				}}/>
			<img ref='img' src={this.props.siteUrl + this.props.main}
				onLoad={this.loaded}
				style={{
					opacity: this.state.which === 'main' ? 1 : 0,
					position: 'absolute',
					left: this.state.left,
					'-webkit-transition': 'opacity 0.5s ease-in-out',
					'-moz-transition': 'opacity 0.5s ease-in-out',
					'-o-transition': 'opacity 0.5s ease-in-out',
					'transition': 'opacity 0.5s ease-in-out'
			}}/>
		</div>;
	}
});

module.exports = BandPhoto;
