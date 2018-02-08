(function () {
	'use strict';

	angular
		.module('app.bookmarks.services', [])
		.service('BookmarksService', BookmarksService)
	;

	function BookmarksService ($http, $q) {
		var vm = this,
			bookmarks;

		function extract(result) {
			return result.data;
		}

		function cacheBookmarks(result) {
			bookmarks = extract(result);
			return bookmarks;
		}

		vm.newValBoomark = '';

		vm.getBookmarks = getBookmarks;
		vm.createBookmark = createBookmark;

		/**
		 * Get all bookmarks
		 * @returns {*}
		 */
		function getBookmarks () {
			return (bookmarks) ? $q.when(bookmarks) : $http.get('data/bookmarks.json').then(cacheBookmarks);
		}

		/**
		 * Create new bookmark
		 * @param bookmark
		 */
		function createBookmark(bookmark) {
			bookmark.id = bookmarks.length;
			bookmarks.push(bookmark);
		}
	}
})();