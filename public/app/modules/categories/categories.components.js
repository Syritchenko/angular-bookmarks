(function () {
	'use strict';

	const categoriesList = {
		templateUrl: '/app/modules/categories/list.html',
		controller: function ($state, CategoriesService) {
			"ngInject";

			let vm = this;

			if(!$state.params.category) {
				$state.go('app.categories.bookmarks', {category: 'Development'});
			}

			CategoriesService.getCategories()
				.then(categories => vm.categories = categories);

			vm.getCurrentCategory = getCurrentCategory;
			vm.checkCurrentCategory = checkCurrentCategory;

			// Set current category
			function getCurrentCategory(category) {
				CategoriesService.setCurrentCategory(category);
			}

			function checkCurrentCategory(category) {
				return CategoriesService.isCurrentCategory(category);
			}
		}
	};

	angular
		.module('app.categories.components', [])
		.component('categoriesList', categoriesList)
})();