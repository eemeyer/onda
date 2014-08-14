'use strict';

var moment = require('moment-timezone');
var React = require('react');

var ShowDetail = React.createClass({
	getDefaultProps: function () {
		return {};
	},

	render: function () {
		return <div>{this.props.content}</div>;
	}
});

var ShowInfo = React.createClass({
	getDefaultProps: function () {
		return {};
	},

	render: function () {
		return <span>{this.props.title || this.props.venue} <span className='show-date'>{this.props.when}{this.props.time && (' | ' + this.props.time)}</span>{this.props.children}</span>;
	}
});

var Show = React.createClass({
	getInitialState: function () {
		return {detail: false};
	},

	display: function () {
		this.setState({detail: !this.state.detail});
		return false;
	},

	render: function () {
		var hasContent = !!this.props.content;
		if (hasContent) {
			return <li><article><a href={this.props.url} onClick={this.display}>{ShowInfo(this.props, this.state.detail && ShowDetail(this.props))}</a></article></li>;
		}
		return <li><article>{ShowInfo(this.props)}</article></li>;
	}
});

var datePattern = /^[^|]+/;

var PageLink = React.createClass({
	navigate: function () {
		this.props.callback(this.props.page);
		return false;
	},

	render: function () {
		return <a className='nav' href='#' onClick={this.navigate}>{this.props.children}</a>;
	}
});

var Shows = React.createClass({
	getDefaultProps: function () {
		return {
			tz: 'America/New_York',
			shows: [],
			pageSize: 5
		};
	},

	getInitialState: function () {
		return {
			page: 0
		};
	},

	render: function () {
		var now = moment().tz(this.props.tz);
		var shows = this.props.shows.slice(0);
		shows.forEach(function (show) {
			var date = datePattern.exec(show.when)[0].trim();
			var when = moment(date, 'MMM DD, YYYY').tz(this.props.tz);
			var daysAway = now.diff(when, 'days');
			show.moment = when;
			show.daysAway = daysAway;
			show.past = daysAway > 0;
		}, this);
		// sort future shows ascending, past shows descending...
		shows.sort(function (b, a) {
			if (!a.past && !b.past) { // both are upcoming
				var tmp = a;
				a = b;
				b = tmp;
			}
			var diff = a.moment.diff(b.moment);
			if (diff < 0) {
				return -1;
			}
			if (diff > 0) {
				return 1;
			}
			if (a.when < b.when) {
				return -1;
			}
			if (a.when > b.when) {
				return 1;
			}
			if (a.url < b.url) {
				return -1;
			}
			if (a.url > b.url) {
				return 1;
			}
			return 0;
		});
		var seenPast = false;
		var elems = shows.map(function (show, idx) {
				if (idx === 0 && !show.past) {
					return <span key='upcoming'>
						<li>Upcoming shows...</li>
						{Show(show)}
					</span>;
				}
				if (show.past && !seenPast) {
					seenPast = true;
					if (idx !== 0) {
						return <span key='past'>
								<li>Past shows...</li>
								{Show(show)}
							</span>;
					}
				}
				show.key = show.url;
				return Show(show);
			}, this);
		var page = this.paginate(elems);
		var links = [];
		var pageCount = Math.ceil(shows.length / this.props.pageSize);
		if (this.props.pageSize > 0) {
			if (this.state.page > 0) {
				if (this.state.page - 1 !== 0) {
					links.push(new PageLink({page: 0, callback: this.navigate, key:'<<'}, 'first'));
				}
				links.push(new PageLink({page:this.state.page - 1, callback: this.navigate, key:'<'}, 'prev'));
			}
			for (var i = Math.max(0, this.state.page - 3); i < this.state.page + 4 && i < pageCount; ++i) {
				if (i === this.state.page) {
					links.push(<a key='current' className='currentPage'>{i + 1}</a>);
				} else {
					links.push(new PageLink({page: i, callback: this.navigate, key: i}, String(i + 1)));
				}
			}
			if (this.state.page + 1 < pageCount) {
				links.push(new PageLink({page: this.state.page + 1, callback: this.navigate, key: '>'}, 'next'));
				if (this.state.page + 1 < pageCount - 1) {
					links.push(new PageLink({page: pageCount - 1, callback: this.navigate, key: '>>'}, 'last'));
				}
			}
		}
		return <span>
			{page}
			{links.length > 0 && <span className='pageLinks'>Page {this.state.page + 1} of {pageCount}: {links}</span>}
		</span>;
	},

	paginate: function (shows) {
		if (this.props.pageSize < 1) {
			return shows;
		}
		var start = this.state.page * this.props.pageSize;
		var end = Math.min(shows.length,  start + this.props.pageSize);
		return shows.slice(start, end);
	},

	navigate: function (page) {
		this.setState({page: page});
	}
});

module.exports = Shows;
