(function () {
	'use strict';

	var categoriesList = {
		templateUrl: '/app/modules/categories/list.html',
		controller: function ($state, CategoriesService) {
			"ngInject";
			var vm = this;

			if(!$state.params.category) {
				$state.go('app.categories.bookmarks', {category: 'Development'});
			}

			CategoriesService.getCategories()
				.then(function (categories) {
					vm.categories = categories;
				});

			vm.currentCategory = {};

			vm.setCurrentCategory = setCurrentCategory;

			// Set current category
			function setCurrentCategory(category) {
				vm.currentCategory = category;
			}
		}
	};

	angular
		.module('app.categories.components', [])
		.component('categoriesList', categoriesList)
})();