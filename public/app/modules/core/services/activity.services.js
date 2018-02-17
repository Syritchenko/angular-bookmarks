(function () {
	angular
		.module('app.activity.services', [])
		.service('ActivityServices', ActivityServices)
	;

	function ActivityServices(actionsType) {
		let activity = [];

		let service = {
			addActivity: addActivity,
			getAllActivities: getAllActivities
		};

		 return service;

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
				case actionsType.add: current.desc = 'added bookmark';
				break;
				case actionsType.update: current.desc = 'updated bookmark';
				break;
				case actionsType.move: current.desc = 'move bookmark';
				break;
				case actionsType.remove: current.desc = 'delete bookmark';
				break;
				default: current.desc = 'general description';
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