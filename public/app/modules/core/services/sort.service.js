(function () {
	angular
		.module('app.sort.service', [])
		.service('SortService', SortService)
	;

	function SortService() {
		let sortValue;

		let service = {
			getSortValue: getSortValue,
			setSortValue: setSortValue
		};

		return service;

		function getSortValue(value) {
			sortValue = value;
		}

		function setSortValue() {
			return sortValue;
		}
	}
})();