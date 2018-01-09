angular.module('test', [
	'ngDialog',
	'ui.bootstrap.contextMenu'
])
	.controller('someCtrl', function ($scope, ngDialog) {
		$scope.categories = [
			{"id": 0, "name": "Development"},
			{"id": 1, "name": "Design"},
			{"id": 2, "name": "Exercise"},
			{"id": 3, "name": "Humor"}
		];

		$scope.bookmarks = [
			{"id":0, "title": "AngularJS", "url": "http://angularjs.org", "category": "Development" },
			{"id":1, "title": "Egghead.io", "url": "http://egghead.io", "category": "Development" },
			{"id":2, "title": "A List Apart", "url": "http://alistapart.com/", "category": "Design" },
			{"id":3, "title": "One Page Love", "url": "http://onepagelove.com/", "category": "Design" },
			{"id":4, "title": "MobilityWOD", "url": "http://www.mobilitywod.com/", "category": "Exercise" },
			{"id":5, "title": "Robb Wolf", "url": "http://robbwolf.com/", "category": "Exercise" },
			{"id":6, "title": "Senor Gif", "url": "http://memebase.cheezburger.com/senorgif", "category": "Humor" },
			{"id":7, "title": "Wimp", "url": "http://wimp.com", "category": "Humor" },
			{"id":8, "title": "Dump", "url": "http://dump.com", "category": "Humor" }
		];

		$scope.test = "Hello world!!!";

		// Get current category
		$scope.currentCategory = {};

		$scope.setCurrentCategory = function (category) {
			$scope.currentCategory = category;
		};

		// Show bookmarks depend on active category
		$scope.isCurrentCategory = function (category) {
			return category !== null && category.name === $scope.currentCategory.name
		};

		// Creating Bookmark
		function resetCreateForm() {
			$scope.newBookmark = {
				title: '',
				url: '',
				category: ''
			};
		}

		function createBookmark(bookmark) {
			bookmark.id = $scope.bookmarks.length;
			$scope.currentCategory.name = bookmark.category;
			bookmark.name = bookmark.category;
			$scope.isCurrentCategory(bookmark);
			delete bookmark.name;

			$scope.bookmarks.push(bookmark);


			resetCreateForm();
		}

		$scope.createBookmark = createBookmark;

		// Context menu for creating
		$scope.createOptions = [
			{
				text: 'Create',
				click: function () {
					$scope.openCreateDialog();
				}
			}
		];

		// Ng-dialog for create bookmark
		$scope.openCreateDialog = function () {
			ngDialog.open({
				template: './templates/addBookmarkPopup.html',
				className: 'ngdialog-theme-default',
				scope: $scope
			});
		};

		// Editing Bookmark
		$scope.editedBookmark = null;

		function updateBookmark(bookmark) {
			let index = _.findIndex($scope.bookmarks, function(b) {
				return b.id == bookmark.id;
			});

			$scope.bookmarks[index] = bookmark;
			$scope.editedBookmark = null;
		}

		$scope.updateBookmark = updateBookmark;

		// Context menu for editing
		$scope.editOptions = [
			{
				text: 'Edit',
				click: function ($itemScope) {
					$scope.editedBookmark = angular.copy($itemScope.bookmark);
					$scope.openEditDialog();
				}
			},
			{
				text: 'Remove',
				click: function ($itemScope) {
					removeBookmark($itemScope.bookmark);
				}
			}
		];

		// Ng-dialog for edit bookmark
		$scope.openEditDialog = function () {
			ngDialog.open({
				template: './templates/editBookmarkPopup.html',
				className: 'ngdialog-theme-default',
				scope: $scope
			});
		};

		// Remove bookmark
		function removeBookmark(bookmark) {
			_.remove($scope.bookmarks, function(b) {
				return b.id == bookmark.id;
			});
		}
	})
;