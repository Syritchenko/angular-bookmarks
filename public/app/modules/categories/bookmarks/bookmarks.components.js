(function () {
	'use strict';

	const bookmarksList = {
		templateUrl: '/app/modules/categories/bookmarks/list.html',
		controller: function ($rootScope, $state, ngDialog, Notification, BookmarksService, ActivityServices, actionsType) {
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

			vm.editOptions = [
				{
					text: 'Edit',

					/**
					 * Update current bookmark
					 * @param $itemScope
					 */
					click: ($itemScope) => {
						ngDialog.open({
							template: '/app/modules/categories/bookmarks/edit.html',
							className: 'ngdialog-theme-default',
							controller: function () {
								let vm = this;

								vm.editedBookmark = angular.copy($itemScope.bookmark);

								vm.updateCurrentBookmark = updateCurrentBookmark;

								// Update current bookmark
								function updateCurrentBookmark(item) {
									updateBookmark(item);
								}
							},
							controllerAs: '$ctrl'
						});
					}
				},

				{
					text: 'Remove',

					/**
					 * Remove bookmark
					 * @param $itemScope
					 */
					click: ($itemScope) => {
						ngDialog.open({
							template: '/app/modules/categories/bookmarks/dialog/confirmation.html',
							className: 'ngdialog-theme-default',
							controller: function () {
								let vm = this;

								vm.confirm = confirm;

								function confirm() {
									BookmarksService.removeBookmark($itemScope.bookmark);
									Notification.success('You success have deleted bookmark!');
									ActivityServices.addActivity($itemScope.bookmark, actionsType.remove);

									// Activity method with $emit
									// $rootScope.$emit('removeBookmarks', currentBookmark);
								}
							},
							controllerAs: '$ctrl'
						});
					}
				},
				{
					text: 'Move',
					click: ($itemScope) => {
						ngDialog.open({
							template: '',
							className: 'ngdialog-theme-default',
							controller: function () {

							},
							controllerAs: '$ctrl'
						})
					}
				}

			];

			/**
			 * Update bookmark
			 * @param bookmark
			 */
			function updateBookmark(bookmark) {
				let index = _.findIndex(vm.bookmarks, item => item.id == bookmark.id);

				vm.bookmarks[index] = bookmark;
				Notification.success('You success have updated bookmark!');

				ActivityServices.addActivity(bookmark, actionsType.update);

				// Activity method with $emit
				// $rootScope.$emit('updateBookmarks', bookmark);
			}
		}
	};

	angular
		.module('app.bookmarks.components', [])
		.component('bookmarksList', bookmarksList)
	;
})();