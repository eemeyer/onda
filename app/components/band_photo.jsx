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
		this.setState({height: this.refs.img.getDOMNode().offsetHeight});
	},

	getInitialState: function () {
		return {which: 'main', height: 0};
	},

	alternate: function () {
		this.setState({which: 'alt', height: this.refs.img.getDOMNode().offsetHeight});
	},

	restore: function () {
		this.setState({which: 'main', height: this.refs.img.getDOMNode().offsetHeight});
	},

	render: function () {
		return <div
			style={{position: 'relative', margin: '0 auto', height: this.state.height + 'px'}}
				onMouseEnter={this.alternate}
				onMouseOut={this.restore}
				onTouchStart={this.alternate}
				onTouchEnd={this.restore}
			>
			<img src={this.props.siteUrl + this.props.alt}
				style={{ position: 'absolute', left:0 }}
				onLoad={this.checkSize}/>
			<img ref='img' src={this.props.siteUrl + this.props.main} style={{
					opacity: this.state.which === 'main' ? 1 : 0,
					position: 'absolute',
					left: 0,
					'-webkit-transition': 'opacity 0.5s ease-in-out',
					'-moz-transition': 'opacity 0.5s ease-in-out',
					'-o-transition': 'opacity 0.5s ease-in-out',
					'transition': 'opacity 0.5s ease-in-out'
			}}/>
		</div>;
	}
});

module.exports = BandPhoto;
