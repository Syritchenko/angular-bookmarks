(function () {

	const validationUrl = function() {
		const URL_REGEXP = /^https?:\/\//;

		return {
			require: 'ngModel',
			link: function(scope, item, attrs, ctrl) {
				ctrl.$validators.url = (modelValue, viewValue) => {
					return ctrl.$isEmpty(modelValue) || URL_REGEXP.test(viewValue);
				}
			}
		}
	};

	angular
		.module('app.validation', [])
		.directive('validationUrl', validationUrl)
})();