(function () {

	'use strict';

	const appHeader = {
		templateUrl: '/app/modules/core/components/header.html',
		controller: function(CategoriesService, BookmarksService, ngDialog, Notification) {
			let vm = this;

			vm.openDialog = openDialog;
			vm.searchChange = searchChange;

			/**
			 * Search bookmark
			 * @param value
			 */
			function searchChange(value) {
				BookmarksService.newValBoomark = value;
			}

			/**
			 * Open dialog for add bookmark
			 */
			function openDialog() {
				ngDialog.open({
					template: '/app/modules/core/components/addBookmark.html',
					className: 'ngdialog-theme-default',
					controller: function () {
						let vm = this;

						CategoriesService.getCategories()
							.then(categories => vm.categories = categories);

						vm.createBookmark = createBookmark;

						function createBookmark() {
							BookmarksService.createBookmark(vm.newBookmark);
							Notification.success('You success have added new bookmark!');
						}
					},
					controllerAs: '$ctrl'
				});
			}
		}
	};

	angular
		.module('app.components', [])
		.component('appHeader', appHeader);
})();