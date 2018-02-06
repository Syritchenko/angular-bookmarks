(function () {

	'use strict';

	var appHeader = {
		templateUrl: '/app/modules/components/header.html',
		controller: function(CategoriesService, BookmarksService, ngDialog) {
			var vm = this;

			vm.openDialog = openDialog;

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