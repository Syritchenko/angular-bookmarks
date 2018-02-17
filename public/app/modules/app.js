(function () {
	'use strict';

	angular.module('app', [
		// Vendors
		'ui.router',
		'ngDialog',
		'ui-notification',
		'multipleSelect',
		'ui.bootstrap.contextMenu',

		// Filters
		'app.filterBookmarks',

		// Directives
		'app.validation',

		// Services
		'app.activity.services',
		'app.sort.service',

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
		.constant('actionsType', {
			add: 1,
			update: 2,
			move: 3,
			remove: 4
		})
		.constant('sortValue', {
			name: 'title'
		})
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