(function () {

	'use strict';

	var appHeader = {
		templateUrl: '/app/modules/components/header.html',
		controller: function(BookmarksService, ngDialog) {
			var vm = this;

			vm.openDialog = openDialog;

			function createBookmark() {
				BookmarksService.cre
			}

			function openDialog(bookmark) {
				ngDialog.open({
					template: '/app/modules/components/addBookmark.html',
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
		}
	};

	angular
		.module('app.components', [])
		.component('appHeader', appHeader);
})();