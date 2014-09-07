'use strict';

var React = require('react');
var $ = window.$;


var events = ['ready','timeupdate', 'play', 'pause', 'ended'];

function formatTime(seconds) {
	var mins = Math.floor(seconds/60);
	var secs = Math.ceil(seconds%60);
	return Number(mins) + ':' + (secs < 10 ? '0' : '') + secs;
}

var SongPlayer = React.createClass({
	getDefaultProps: function() {
		return {
			siteUrl: '',
			playerId: 'jPlayerWidget',
			tracks: []
		};
	},

	getInitialState: function() {
		return {
			player: null,
			current: null
		};
	},

	componentDidMount: function() {
		var elem = document.getElementById(this.props.playerId);
		if (!elem) {
			elem = document.createElement('span');
			elem.id = this.props.playerId;
			document.body.appendChild(elem);
		}
		var player = $(elem).jPlayer({
			swfPath: this.props.siteUrl + 'asssets/js/vendor',
			supplied: 'mp3',
			wmode: 'window',
			volume: 1
		});
		events.forEach(function (evt) {
			if (this['on_' + evt]) {
				player.on('jPlayer_' + evt + '.jPlayer', this['on_' + evt]);
			}
		}.bind(this));
		this.setState({player: player});
	},

	componentWillUnmount: function() {
		var player = this.state.player;
			if (player) {
				events.forEach(function (evt) {
				if (this['on_' + evt]) {
					player.off('jPlayer_' + evt + '.jPlayer', this['on_' + evt]);
				}
			}.bind(this));
		}
	},

	render: function() {
		var content = this.props.tracks.map(function (track) {
			var classes = [];
			var icon = '';
			var title = '';
			if (this.state.current === track) {
				classes.push('current');
				if (this.state.playing) {
					classes.push('playing');
					title = 'pause';
					icon = 'ion-ios7-pause';
				} else {
					title = 'resume';
					icon = 'ion-ios7-play-outline';
				}
			} else {
				title = 'play';
				icon = 'ion-ios7-play';
			}

			return <li key={track.url} className={classes.join(' ')}>
				{this.state.current === track ?
					<a href='#' onClick={function(evt) {
						evt.preventDefault();
						this.state.player.jPlayer('pause', 0);
					}.bind(this)}><i className='icon ion-ios7-skipbackward'/></a>
					: <i className='icon ion-ios7-musical-notes'/>
				}
				<a href='#' title={title} onClick={function(evt) {
					evt.preventDefault();
					this.click(track);
				}.bind(this)}>
				<i className={'icon ' + icon}/>
				</a>
					<span>{track.title}</span>
					{this.state.current===track &&
						<span className='time'> {formatTime(this.state.currentTime) + ' of ' + formatTime(this.state.duration)}</span>}
				</li>;
		}.bind(this));
		return <ul className='post-list songs'>{content}</ul>;
	},

	click: function(track) {
		if (this.state.current && this.state.current === track) {
			if (this.state.playing) {
				this.state.player.jPlayer('pause');
			} else {
				this.state.player.jPlayer('play');
			}
		} else {
			this.state.player.jPlayer('setMedia', {
				mp3: window.encodeURI(track.url)
			}).jPlayer('play');
		}
		this.setState({current: track});
	},

	on_timeupdate: function(event){
		this.setState({currentTime: event.jPlayer.status.currentTime, duration: event.jPlayer.status.duration});
	},
	on_play: function() {
		this.setState({playing: true});
			if (typeof window._gaq !== 'undefined') {
				window._gaq.push(['_trackEvent', 'Songs', 'play', this.state.current.url]);
			}
	},
	on_pause: function() {
		this.setState({playing: false});
			if (typeof window._gaq !== 'undefined') {
				window._gaq.push(['_trackEvent', 'Songs', 'pause', this.state.current.url]);
			}
	},
	on_ended: function() {
		var lastTrack = this.state.current;
		this.setState({current: null, currentTime:null, duration: null});
		var idx = this.props.tracks.indexOf(lastTrack);
		if (this.props.tracks.length && idx !== this.props.tracks.length - 1) {
			idx = ++idx;
			this.click(this.props.tracks[idx]);
		}
	}
});

module.exports = SongPlayer;
