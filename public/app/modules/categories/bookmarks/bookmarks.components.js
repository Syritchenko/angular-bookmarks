(function () {
	'use strict';

	const bookmarksList = {
		templateUrl: '/app/modules/categories/bookmarks/list.html',
		controller: function ($rootScope, $state, ngDialog, Notification, BookmarksService) {
			"ngInject";

			let vm = this;

			/**
			 * Get bookmark from service
			 */
			BookmarksService.getBookmarks()
				.then(bookmarks => {
					vm.bookmarks = bookmarks;
					$rootScope.$emit('countBookmarks', vm.bookmarks.length);
				});

			vm.editBookmark = editBookmark;
			vm.removeBookmark = removeBookmark;

			/**
			 * Update bookmark
			 * @param bookmark
			 */
			function updateBookmark(bookmark) {
				let index = _.findIndex(vm.bookmarks, item => item.id == bookmark.id);

				vm.bookmarks[index] = bookmark;
				Notification.success('You success have updated bookmark!');
				$rootScope.$emit('updateBookmarks', bookmark);
			}

			/**d
			 * Edit bookmark
			 * @param bookmark
			 */
			function editBookmark(bookmark) {
				ngDialog.open({
					template: '/app/modules/categories/bookmarks/edit.html',
					className: 'ngdialog-theme-default',
					controller: function () {
						let vm = this;

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

			/**
			 * Remove bookmark
			 * @param bookmark
			 */
			function removeBookmark(bookmark) {
				var currentBookmark = bookmark;
				ngDialog.open({
					template: '/app/modules/categories/bookmarks/dialog/confirmation.html',
					className: 'ngdialog-theme-default',
					controller: function () {
						let vm = this;

						vm.confirm = confirm;

						function confirm() {
							BookmarksService.removeBookmark(currentBookmark);
							Notification.success('You success have deleted bookmark!');
							$rootScope.$emit('removeBookmarks', currentBookmark);
						}
					},
					controllerAs: '$ctrl'
				});
			}
		}
	};

	angular
		.module('app.bookmarks.components', [])
		.component('bookmarksList', bookmarksList)
	;
})();