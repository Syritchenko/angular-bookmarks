(function () {
	angular
		.module('app.filterBookmarks', [])
		.filter('bookmarkFilter', bookmarkFilter)
		.filter('sliceLongData', sliceLongData)
		.filter('toLowerCase', toLowerCase)
	;

	/**
	 * Filter for bookmarks
	 * @param CategoriesService
	 * @param BookmarksService
	 * @returns {Function}
	 */
	function bookmarkFilter(CategoriesService, BookmarksService) {
		return items => {
			let filtered = [];

			if(!BookmarksService.newValBoomark) {
				_.forEach(items, item => {
					if(item.category === CategoriesService.currentCategory.name) {
						filtered.push(item);
					}
				});
			} else {
				let value = BookmarksService.newValBoomark;
				let regexp = new RegExp(value, 'gi');

				_.forEach(items, item => {
					if(item.title.match(regexp)) {
						filtered.push(item);
					}
				});
			}

			return filtered;
		}
	}

	/**
	 * Filter for slice long data
	 * @returns {function(*, *=)}
	 */
	function sliceLongData() {
		return (item, number) => {
			if(item.length > number) {
				return item.slice(0, number) + '...';
			}

			return item;
		}
	}

	/**
	 * To lower case
	 * @returns {function(*): (*|string)}
	 */
	function toLowerCase() {
		return item => item.toLowerCase();
	}
})();