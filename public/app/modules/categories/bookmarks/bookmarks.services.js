(function () {
	'use strict';

	angular
		.module('app.bookmarks.services', [])
		.service('BookmarksService', BookmarksService)
	;

	function BookmarksService ($rootScope, ActivityServices, $http, $q) {
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
		function createBookmark(bookmark, categories) {
			if(categories.length) {
				_.forEach(categories, item => {
					let current = angular.copy(bookmark);
					current.id = bookmarks.length;
					current.category = item;
					bookmarks.push(current);
					ActivityServices.addActivity(current, 1);
				});

				$rootScope.$emit('countBookmarks', bookmarks.length);
			} else {
				bookmark.id = bookmarks.length;
				bookmarks.push(bookmark);
				ActivityServices.addActivity(bookmark, 1);
			}
			// $rootScope.$emit('countBookmarks', bookmarks.length);
		}

		/**
		 * Remove bookmark
		 * @param bookmark
		 */
		function removeBookmark(bookmark) {
			_.remove(bookmarks, item => item.id == bookmark.id);
			$rootScope.$emit('countBookmarks', bookmarks.length);
		}
	}
})();