(function () {
	'use strict';

	angular
		.module('app.categories.services', [])
		.service('CategoriesService', CategoriesService)
	;

	function CategoriesService ($http) {
		var service = {
			getAllCategories: function () {
				return $http.get('data/categories.json', { cache: true }).then(function(response) {
					return response.data;
				})
			}
		};

		return service;
	}
})();