(function () {
	'use strict';

	angular
		.module('app.bookmarks.services', [])
		.service('BookmarksService', BookmarksService)
	;

	function BookmarksService ($rootScope, $http, $q) {
		let vm = this,
			bookmarks;

		/**
		 * Extract our data before transfer to component
		 */
		function extract(result) {
			return result.data;
		}

		/**
		 * Get cache for bookmarks for repeatedly using
		 * @param result
		 * @returns {*}
		 */
		function cacheBookmarks(result) {
			bookmarks = extract(result);
			return bookmarks;
		}

		vm.getBookmarks = getBookmarks;
		vm.createBookmark = createBookmark;
		vm.removeBookmark = removeBookmark;

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
			$rootScope.$emit('countBookmarks', bookmarks.length);
		}

		function removeBookmark(bookmark) {
			_.remove(bookmarks, item => item.id == bookmark.id);
			$rootScope.$emit('countBookmarks', bookmarks.length);
		}
	}
})();