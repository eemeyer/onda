'use strict';

var React = require('react');

var PageLink = React.createClass({
	navigate: function () {
		if (!this.props.enabled) {
			return false;
		}
		this.props.callback(this.props.page);
		return false;
	},

	render: function () {
		if (this.props.enabled) {
			return <a className='nav' href='#' onClick={this.navigate}>{this.props.children}</a>;
		}
		return <a className='disabled-nav' onClick={this.navigate}>{this.props.children}</a>;
	}
});

var PaginationMixin = {
	propTypes: {
		pageSize: React.PropTypes.number.isRequired,
		showBefore: React.PropTypes.number,
		showAfter: React.PropTypes.number
	},

	getInitialState: function () {
		return {
			page: 0
		};
	},

	getPagination: function (items) {
		var links = [];
		var pageCount = Math.ceil(items.length / this.props.pageSize);

		if (this.props.pageSize <= 0) {
			return null;
		}

		links.push(new PageLink({
				page: 0,
				enabled: this.state.page !== 0,
				callback: this.navigate,
				key:'<<'},
			'first'));
		links.push(new PageLink({
				page: Math.max(0, this.state.page - 1),
				enabled: this.state.page !== 0,
				callback: this.navigate,
				key:'<'},
			'prev'));
		var showBefore = typeof this.props.showBefore === 'number' ? this.props.showBefore : 3;
		var showAfter = typeof this.props.showAfter === 'number' ? this.props.showAfter : 3;
		for (var idx = Math.max(0, this.state.page - showBefore);
				idx <= this.state.page + showAfter && idx < pageCount;
				++idx) {
			if (idx === this.state.page) {
				links.push(<a key='current' className='currentPage'>Page {idx + 1} of {pageCount}</a>);
			} else {
				links.push(new PageLink({
					page: idx,
					enabled: true,
					callback: this.navigate,
					key: idx},
				String(idx + 1)));
			}
		}
		links.push(new PageLink({
				page: Math.min(this.state.page + 1, pageCount - 1),
				enabled: this.state.page !== pageCount - 1,
				callback: this.navigate,
				key: '>'},
			'next'));
		links.push(new PageLink({
			page: pageCount - 1,
			enabled: this.state.page !== pageCount - 1,
			callback: this.navigate,
			key: '>>'},
		'last'));

		return links.length > 0 && <span className='pageLinks'>{links}</span>;
	},

	paginate: function (items) {
		if (this.props.pageSize < 1) {
			return items;
		}
		var start = this.state.page * this.props.pageSize;
		var end = Math.min(items.length,  start + this.props.pageSize);
		return items.slice(start, end);
	},

	navigate: function (page) {
		this.setState({page: page});
	}
};

module.exports = PaginationMixin;
