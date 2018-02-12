(function () {

	'use strict';

	const appHeader = {
		templateUrl: '/app/modules/core/components/header.html',
		controller: function($rootScope, CategoriesService, BookmarksService, ngDialog, Notification) {
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

						vm.newBookmark = {};
						vm.currentCategory = CategoriesService.currentCategory.name;

						if(vm.currentCategory) {
							vm.newBookmark.category = CategoriesService.currentCategory.name;
						}

						CategoriesService.getCategories()
							.then(categories => vm.categories = categories);

						vm.createBookmark = createBookmark;

						function createBookmark() {
							BookmarksService.createBookmark(vm.newBookmark);
							Notification.success('You success have added new bookmark!');
							$rootScope.$emit('addBookmarks', vm.newBookmark);
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