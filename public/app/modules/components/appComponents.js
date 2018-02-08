(function () {

	'use strict';

	var appHeader = {
		templateUrl: '/app/modules/components/header.html',
		controller: function(CategoriesService, BookmarksService, ngDialog, Notification) {
			var vm = this;

			vm.openDialog = openDialog;
			vm.searchBookmark = '';

			console.log();
			vm.searchChange = function(value) {
				BookmarksService.newValBoomark = value;
			};

			/*$rootScope.someValue = vm.searchChange();
			console.log($rootScope.someValue);*/

			/**
			 * Open dialog for add bookmark
			 */
			function openDialog() {
				ngDialog.open({
					template: '/app/modules/components/addBookmark.html',
					className: 'ngdialog-theme-default',
					controller: function () {
						var vm = this;

						CategoriesService.getCategories()
							.then(function (categories) {
								vm.categories = categories;
							});

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