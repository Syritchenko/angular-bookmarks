(function () {
	'use strict';

	angular
		.module('app.bookmarks.services', [])
		.service('BookmarksService', BookmarksService)
	;

	function BookmarksService ($rootScope, ActivityServices, $http, $q, actionsType) {
		let bookmarks;

		let service = {
			getBookmarks: getBookmarks,
			createBookmark: createBookmark,
			removeBookmark: removeBookmark
		};

		return service;
		/**
		 * Extract our data before transfer to component
		 */
		function extract({data}) {
			return data;
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
					ActivityServices.addActivity(current, actionsType.add);
				});

				$rootScope.$emit('countBookmarks', bookmarks.length);
			} else {
				bookmark.id = bookmarks.length;
				bookmarks.push(bookmark);
				ActivityServices.addActivity(bookmark, actionsType.add);
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