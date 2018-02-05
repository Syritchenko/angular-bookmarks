(function () {
	'use strict';

	var categoriesList = {
		bindings: {
			categories: '<'
		},
		templateUrl: '/app/modules/categories/list.html',
		controller: function ($state) {
			"ngInject";
			var vm = this;

			if(!$state.params.category) {
				$state.go('app.categories.bookmarks', {category: 'Development'});
			}

			vm.$onInit = function() {
				vm.currentCategory = {};

				vm.setCurrentCategory = setCurrentCategory;

				// Set current category
				function setCurrentCategory(category) {
					vm.currentCategory = category;
				}
			};
		}
	};

	angular
		.module('app.categories.components', [])
		.component('categoriesList', categoriesList)
})();