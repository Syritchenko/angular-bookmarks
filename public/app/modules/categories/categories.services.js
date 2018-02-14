(function () {
	'use strict';

	angular
		.module('app.categories.services', [])
		.service('CategoriesService', CategoriesService)
	;

	function CategoriesService ($http, $q) {
		let vm = this,
			categories;

		// Default current category
		vm.currentCategory = {name: ''};

		/**
		 * Extract our data before transfer to component
 		 */
		function extract(result) {
			return result.data;
		}

		/**
		 * Get cache for categories for repeatedly using
		 * @param result
		 * @returns {*}
		 */
		function cacheCategories(result) {
			categories = extract(result);
			return categories;
		}

		vm.getCategories = getCategories;
		vm.setCurrentCategory = setCurrentCategory;
		vm.isCurrentCategory = isCurrentCategory;

		/**
		 * Get all categories
		 * @returns {*}
		 */
		function getCategories() {
			return (categories) ? $q.when(categories) : $http.get('data/categories.json').then(cacheCategories);
		}

		/**
		 * Set current category
		 * @param category
		 */
		function setCurrentCategory(category) {
			vm.currentCategory = category;
		}

		/**
		 * Check current category
		 * @param category
		 * @returns {*|boolean}
		 */
		function isCurrentCategory(category) {
			return category && category.name === vm.currentCategory.name;
		}
	}
})();