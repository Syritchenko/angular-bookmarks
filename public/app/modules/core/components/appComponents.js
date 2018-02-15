(function () {

	'use strict';

	const app = {
		templateUrl: '/app/modules/main.html',
		controller: function ($rootScope) {
			let vm = this;

			vm.activities = [];

			vm.countCategories = 0;

			$rootScope.$on('countBookmarks', (event, data) => {
				vm.countCategories = data;
			});

			/*$rootScope.$on('removeBookmarks', (event, data) => {
				let bookmark = data;
				bookmark.type = 3;
				bookmark.desc = 'you removed bookmark';
				bookmark.date = new Date();
				vm.activities.push(bookmark);
			});

			$rootScope.$on('addBookmarks', (event, data) => {
				let bookmark = data;
				bookmark.type = 1;
				bookmark.desc = 'you added bookmark';
				bookmark.date = new Date();
				vm.activities.push(bookmark);
			});

			$rootScope.$on('updateBookmarks', (event, data) => {
				let bookmark = data;
				bookmark.type = 2;
				bookmark.desc = 'update added bookmark';
				bookmark.date = new Date();
				vm.activities.push(bookmark);
			});*/
		}
	};

	const appHeader = {
		templateUrl: '/app/modules/core/components/header.html',
		controller: function($rootScope, CategoriesService, BookmarksService, ActivityServices, ngDialog, Notification) {
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
						vm.categoriesList = [];
						vm.selectedList = [];

						// Check active category
						if(vm.currentCategory) {
							vm.newBookmark.category = CategoriesService.currentCategory.name;
						}

						CategoriesService.getCategories()
							.then(categories => {
								vm.categories = categories;
								_.forEach(vm.categories, item => vm.categoriesList.push(item.name));
							});

						vm.createBookmark = createBookmark;

						/**
						 * Create new bookmark
						 */
						function createBookmark() {
							BookmarksService.createBookmark(vm.newBookmark, vm.selectedList);
							Notification.success('You success have added new bookmark!');
						}
					},
					controllerAs: '$ctrl'
				});
			}
		}
	};

	const activity = {
		templateUrl: '/app/modules/core/components/activity.html',
		controller: function (ActivityServices) {
			let vm = this;
			vm.activities = ActivityServices.getAllActivities();
		}

	};

	angular
		.module('app.components', [])
		.component('app', app)
		.component('appHeader', appHeader)
		.component('activity', activity)
	;
})();