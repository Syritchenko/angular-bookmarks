(function () {
	'use strict';

	const categoriesList = {
		templateUrl: '/app/modules/categories/list.html',
		controller: function ($rootScope, CategoriesService) {
			"ngInject";

			let vm = this;

			CategoriesService.getCategories()
				.then(categories => vm.categories = categories);

			vm.setCurrentCategory = setCurrentCategory;
			vm.checkCurrentCategory = checkCurrentCategory;

			/**
			 * Get current category
			 * @param category
			 */
			function setCurrentCategory(category) {
				CategoriesService.setCurrentCategory(category);
				$rootScope.$emit('clearSearch', '');
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