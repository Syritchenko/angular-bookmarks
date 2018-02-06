(function () {
	'use strict';

	angular
		.module('app.categories.services', [])
		.service('CategoriesService', CategoriesService)
	;

	function CategoriesService ($http, $q) {
		var vm = this,
			categories;

		function extract(result) {
			return result.data;
		}

		function cacheCategories(result) {
			categories = extract(result);
			return categories;
		}

		vm.getCategories = function () {
			return (categories) ? $q.when(categories) : $http.get('data/categories.json').then(cacheCategories);
		};
	}
})();