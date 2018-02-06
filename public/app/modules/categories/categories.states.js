(function () {
	'use strict';

	angular
		.module('app.categories.states', [
			'app.categories.services',
			'app.categories.components'
		])

		.config(configure)
	;

	function configure($stateProvider) {
		$stateProvider
			.state('app.categories', {
				url: '/',
				views: {
					'categories@': {
						component: 'categoriesList',
						bindings: {
							categories: 'categories'
						}
					},
					'bookmarks@': {
						component: 'bookmarksList',
					}
				}
			})
		;
	}
})();