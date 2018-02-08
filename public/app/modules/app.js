(function () {
	'use strict';

	angular.module('app', [
		// Vendors
		'ui.router',
		'ngDialog',
		'ui-notification',

		// States
		'app.categories.states',
		'app.bookmarks.states',

		// Components
		'app.components'
	])
		.config(configure)
		.config(function(NotificationProvider) {
			NotificationProvider.setOptions({
				delay: 4000,
				startTop: 70,
				startRight: 10,
				verticalSpacing: 20,
				horizontalSpacing: 20,
				positionX: 'right',
				positionY: 'top'
			});
		})
		.filter('bookmarkFilter', showBookmark)
	;

	function configure($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('app', {
				url: '',
				abstract: true
			})
		;

		// Otherwise redirect
		$urlRouterProvider.otherwise('/');
	}

	function showBookmark(CategoriesService) {
		return function(items) {
			var filtered = [];
			angular.forEach(items, item => {
				if(item.category === CategoriesService.currentCategory.name) {
					filtered.push(item);
				}
			});

			return filtered;
		}
	}
})();