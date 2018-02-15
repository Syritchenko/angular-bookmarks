(function () {
	'use strict';

	angular
		.module('app.categories.services', [])
		.service('CategoriesService', CategoriesService)
	;

	function CategoriesService ($http, $q) {
		let vm = this,
			categories,
			currentCategory;

		/**
		 * Extract our data before transfer to component
 		 */
		function extract({data}) {
			return data;
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
		vm.getCurrentCategory = getCurrentCategory;
		vm.setCurrentCategory = setCurrentCategory;
		vm.isCurrentCategory = isCurrentCategory;



		/**
		 * Get all categories
		 * @returns {*}
		 */
		function getCategories() {
			return (categories) ? $q.when(categories) : $http.get('data/categories.json').then(cacheCategories);
		}

		function getCurrentCategory () {
			return currentCategory;
		}

		/**
		 * Set current category
		 * @param category
		 */
		function setCurrentCategory(category) {
			currentCategory = category;
		}

		/**
		 * Check current category
		 * @param category
		 * @returns {*|boolean}
		 */
		function isCurrentCategory(category = {}) {
			return _.get(category, 'name') === _.get(currentCategory, 'name');
		}
	}
})();