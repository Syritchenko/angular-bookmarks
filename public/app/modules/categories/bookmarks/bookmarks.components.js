(function () {
	'use strict';

	const bookmarksList = {
		templateUrl: '/app/modules/categories/bookmarks/list.html',
		controller: function ($rootScope, ngDialog, Notification, BookmarksService, CategoriesService, ActivityServices, SortService, actionsType) {
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

			/**
			 * Context menu for update, move and delete
			 * @type {[null,null,null]}
			 */
			vm.editOptions = [
				{
					text: 'Edit',

					/**
					 * Update current bookmark
					 * @param $itemScope
					 */
					click: ($itemScope) => {
						ngDialog.open({
							template: '/app/modules/categories/bookmarks/dialog/edit.html',
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
					text: 'Move',
					click: ($itemScope) => {
						ngDialog.open({
							template: '/app/modules/categories/bookmarks/dialog/move.html',
							className: 'ngdialog-theme-default',
							controller: function () {
								let vm = this;

								vm.categoriesList = [];

								CategoriesService.getCategories()
									.then(categories => {
										_.forEach(categories, item => {
											if (item.name == $itemScope.bookmark.category) return;
											vm.categoriesList.push(item.name)
										});
									});

								vm.moveBookmark = moveBookmark;

								function moveBookmark(value) {
									$itemScope.bookmark.category = value;
									moveCurrentBookmark($itemScope.bookmark);
								}
							},
							controllerAs: '$ctrl'
						})
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
								}
							},
							controllerAs: '$ctrl'
						});
					}
				}
			];

			vm.sortBookmark = sortBookmark;

			/**
			 * Update bookmark
			 * @param bookmark
			 */
			function updateBookmark(bookmark) {
				let index = _.findIndex(vm.bookmarks, item => item.id == bookmark.id);

				vm.bookmarks[index] = bookmark;
				Notification.success('You success have updated bookmark!');

				ActivityServices.addActivity(bookmark, actionsType.update);
			}

			/**
			 * Move current bookmark
			 * @param bookmark
			 */
			function moveCurrentBookmark(bookmark) {
				let index = _.findIndex(vm.bookmarks, item => item.id == bookmark.id);
				vm.bookmarks[index] = bookmark;
				Notification.success('You success have moved bookmark!');
				ActivityServices.addActivity(bookmark, actionsType.move);
			}

			/**
			 * Sort bookmark
			 * @returns {*}
			 */
			function sortBookmark() {
				return SortService.setSortValue();
			}
		}
	};

	angular
		.module('app.bookmarks.components', [])
		.component('bookmarksList', bookmarksList)
	;
})();