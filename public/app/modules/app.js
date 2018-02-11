(function () {
	'use strict';

	const app = {
		templateUrl: '/app/modules/main.html',
		controller: function ($rootScope) {
			let vm = this;

			vm.countCategories = 0;
			$rootScope.$on('countBookmarks', (event, data) => vm.countCategories = data);
		}
	};

	angular.module('app', [
		// Vendors
		'ui.router',
		'ngDialog',
		'ui-notification',

		// Filters
		'app.filterBookmarks',

		// Directives
		'app.validation',

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
		.component('app', app)
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
})();