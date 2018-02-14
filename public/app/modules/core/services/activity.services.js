(function () {
	angular
		.module('app.activity.services', [])
		.service('ActivityServices', ActivityServices)
	;

	function ActivityServices() {

		let vm = this,
			activity = [];

		vm.addActivity = addActivity;
		vm.getAllActivities = getAllActivities;

		/**
		 * Add new activity
		 * @param item
		 * @param type
		 */
		function addActivity(item, type) {
			let current = angular.copy(item);
			current.id = activity.length;
			current.date = new Date();
			current.type = type;

			switch (type) {
				case 1: current.desc = 'added bookmark';
				break;
				case 2: current.desc = 'updated bookmark';
				break;
				case 3: current.desc = 'deleted bookmark';
				break;
			}

			activity.push(current);
		}

		/**
		 * Get all activity
		 * @returns {Array}
		 */
		function getAllActivities() {
			return activity;
		}
	}
})();