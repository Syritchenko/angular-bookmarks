(function () {

	'use strict';

	const app = {
		templateUrl: '/app/modules/main.html',
		controller: function ($rootScope) {
			let vm = this;

			vm.activities = [];

			vm.countCategories = 0;

			/**
			 * Update count of bookmarks
			 */
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
		controller: function($rootScope, CategoriesService, BookmarksService, SortService, ngDialog, Notification, sortValue) {
			let vm = this;

			vm.contextActions = [
				{
					text: 'SortBy: name',
					click: () => {
						SortService.setSortValue() ? SortService.getSortValue('') : SortService.getSortValue(sortValue.name);
					}
				},
				{
					text: 'Add new bookmark',
					click: () => {
						ngDialog.open({
							template: '/app/modules/core/components/addBookmark.html',
							className: 'ngdialog-theme-default',
							controller: function () {
								let vm = this;

								vm.newBookmark = {};
								vm.categoriesList = [];

								// Check active category
								if(vm.currentCategory) {
									vm.newBookmark.category = CategoriesService.getCurrentCategory().name;
								}

								CategoriesService.getCategories()
									.then(categories => {
										_.forEach(categories, item => vm.categoriesList.push(item.name));
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
			];

			vm.searchChange = searchChange;

			/**
			 * Search bookmark
			 * @param value
			 */
			function searchChange(value) {
				BookmarksService.newValBoomark = value;
			}

			/**
			 * Clear search bookmark
			 */
			$rootScope.$on('clearSearch', (event, data) => {
				vm.searchBookmark = data;
				BookmarksService.newValBoomark = data;
			});
		}
	};

	const activity = {
		templateUrl: '/app/modules/core/components/activity.html',
		controller: function (ActivityServices, actionsType) {
			let vm = this;
			vm.activities = ActivityServices.getAllActivities();

			vm.isActivityType = isActivityType;

			/**
			 * Add class for activity
			 * @param item
			 * @returns {*}
			 */
			function isActivityType(item) {
				switch(item.type) {
					case actionsType.add: return 'added';
					case actionsType.update: return 'updated';
					case actionsType.move: return 'moved';
					case actionsType.remove: return 'removed';
				}
			}
		}

	};

	angular
		.module('app.components', [])
		.component('app', app)
		.component('appHeader', appHeader)
		.component('activity', activity)
	;
})();