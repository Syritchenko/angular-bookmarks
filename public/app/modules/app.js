(function () {
	'use strict';

	angular.module('app', [
		// Vendors
		'ui.router',
		'ngDialog',

		// States
		'app.categories.states',
		'app.bookmarks.states',

		// Components
		'app.components'
	])
		.config(configure)

		/*.component('app', {
			templateUrl: '/app/modules/main.html'
		})*/;

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