(function () {
	'use strict';

	angular
		.module('app.bookmarks.states', [
			'app.bookmarks.services',
			'app.bookmarks.components'
		])

		.config(configure);

	function configure($stateProvider) {
		$stateProvider
			.state('app.categories.bookmarks', {
				url: 'categories/:category',
				views: {
					'bookmarks@': {
						component: 'bookmarksList',
						bindings: {
							bookmarks: 'bookmarks'
						}
					}
				}/*,
				resolve: {
					bookmarks: function (BookmarksService) {
						return BookmarksService.getAllBookmarks();
					}
				}*/
			})
			.state('app.categories.bookmarks.edit', {
				url: 'bookmarks/:bookmarkId/edit',
				component: 'editBookmark'
			})
		;
	}
})();