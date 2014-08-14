'use strict';

var moment = require('moment-timezone');
var React = require('react');
var markdown = require('markdown').markdown;

var PaginationMixin = require('./pagination_mixin');

var ShowDetail = React.createClass({
	getDefaultProps: function () {
		return {};
	},

	render: function () {
		if (this.props.contentHtml) {
			return <div className='show-detail' dangerouslySetInnerHTML={{__html: this.props.contentHtml}}/>;
		}
		return <div className='show-detail'>{this.props.content}</div>;
	}
});

var ShowInfo = React.createClass({
	getDefaultProps: function () {
		return {};
	},

	render: function () {
		return <span>{this.props.title || this.props.venue} <span className='show-date'>{this.props.moment.format('dddd, MMMM D, YYYY')}{this.props.time && (' | ' + this.props.time)}</span>{this.props.children}</span>;
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

var Shows = React.createClass({

	mixins: [PaginationMixin],

	getDefaultProps: function () {
		return {
			tz: 'America/New_York',
			shows: [],
			pageSize: 5
		};
	},

	componentWillMount: function () {
		var shows = this.props.shows.slice(0);
		shows.forEach(function (show) {
			if (show.content) {
				try {
					show.contentHtml = markdown.toHTML(show.content);
				} catch (ignored) {
					// do nothing
				}
			}
		}.bind(this));
		this.setState({shows: shows});
	},

	render: function () {
		var now = moment().tz(this.props.tz);
		var shows = this.state.shows.slice(0);
		shows.forEach(function (show) {
			var date = datePattern.exec(show.when)[0].trim();
			var when = moment(date, 'MMM DD, YYYY', 'en').tz(this.props.tz);
			when.locale(false); // back to browser default for output
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
		return <span>
			{this.paginate(elems)}
			{this.getPagination(elems)}
		</span>;
	}

});

module.exports = Shows;
