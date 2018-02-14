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
			item.date = new Date();
			item.type = type;

			switch (type) {
				case 1: item.desc = 'added bookmark';
				break;
				case 2: item.desc = 'updated bookmark';
				break;
				case 3: item.desc = 'deleted bookmark';
				break;
			}

			activity.push(item);
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