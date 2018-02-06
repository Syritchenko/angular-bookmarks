(function () {
	'use strict';

	var bookmarksList = {
		templateUrl: '/app/modules/categories/bookmarks/list.html',
		controller: function ($state, ngDialog, BookmarksService) {
			var vm = this;

			BookmarksService.getBookmarks()
				.then(function(bookmarks) {
					vm.bookmarks = bookmarks;
				});

			vm.currentCategory = $state.params.category;

			vm.editBookmark = editBookmark;
			vm.removeBookmark = removeBookmark;

			function updateBookmark(bookmark) {
				let index = _.findIndex(vm.bookmarks, function(b) {
					return b.id == bookmark.id;
				});

				vm.bookmarks[index] = bookmark;
			}

			// Edit bookmark
			function editBookmark(bookmark) {
				ngDialog.open({
					template: '/app/modules/categories/bookmarks/edit.html',
					className: 'ngdialog-theme-default',
					controller: function () {
						var vm = this;

						vm.editedBookmark = angular.copy(bookmark);

						vm.updateCurrentBookmark = updateCurrentBookmark;

						// Update current bookmark
						function updateCurrentBookmark(item) {
							updateBookmark(item);
						}
					},
					controllerAs: '$ctrl'
				});
			}

			// Remove bookmark
			function removeBookmark(bookmark) {
				_.remove(vm.bookmarks, item => item.id == bookmark.id);
			}
		}
	};

	angular
		.module('app.bookmarks.components', [])
		.component('bookmarksList', bookmarksList)
	;
})();