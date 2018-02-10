(function () {

	const validationUrl = function() {
		const URL_REGEXP = /^https?:\/\//;

		return {
			require: 'ngModel',
			link: function(scope, item, attrs, ctrl) {
				ctrl.$validators.url = (modelValue, viewValue) => {
					if(ctrl.$isEmpty(modelValue) || URL_REGEXP.test(viewValue)) {
						return true;
					}

					return false;
				}
			}
		}
	};

	angular
		.module('app.validation', [])
		.directive('validationUrl', validationUrl)
})();