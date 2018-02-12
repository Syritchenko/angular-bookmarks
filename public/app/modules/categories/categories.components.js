(function () {
	'use strict';

	const categoriesList = {
		templateUrl: '/app/modules/categories/list.html',
		controller: function ($state, CategoriesService) {
			"ngInject";

			let vm = this;

			CategoriesService.getCategories()
				.then(categories => vm.categories = categories);

			vm.getCurrentCategory = getCurrentCategory;
			vm.checkCurrentCategory = checkCurrentCategory;

			/**
			 * Get current category
			 * @param category
			 */
			function getCurrentCategory(category) {
				CategoriesService.setCurrentCategory(category);
			}

			/**
			 * Check current category
			 * @param category
			 * @returns {*}
			 */
			function checkCurrentCategory(category) {
				return CategoriesService.isCurrentCategory(category);
			}
		}
	};

	angular
		.module('app.categories.components', [])
		.component('categoriesList', categoriesList)
})();