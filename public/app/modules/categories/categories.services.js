(function () {
	'use strict';

	angular
		.module('app.categories.service', [])
		.service('CategoriesService', CategoriesService)
	;

	function CategoriesService ($http, $q) {
		let categories,
			currentCategory;

		let service = {
			getCategories: getCategories,
			getCurrentCategory: getCurrentCategory,
			setCurrentCategory: setCurrentCategory,
			isCurrentCategory: isCurrentCategory
		};

		return service;

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