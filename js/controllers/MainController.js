app.controller('MainController', function($http, $scope, wars, configure, $uibModal, $log) {
	$http.get("https://set7z18fgf.execute-api.us-east-1.amazonaws.com/prod/?route=getClanDetails&clanTag=%2322CQYPVG").success(function(data) {
		console.log(data);
		//getJSON(data);
		$scope.members = data.clanDetails.results.memberList;
		console.log($scope.members);
	});

	$scope.wars = wars.wars;
	$scope.addNewWar = function(warSize) {
		$scope.wars.push({size: warSize});
		console.log($scope.wars);
	}

	$scope.warSizeOptions = configure.warSizeOptions;

	$scope.openModal = function (size) {

		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'partials/_modalDialog.html',
			controller: 'ModalController',
			size: size,
			resolve: {
				members: function() {
					return $scope.members;
				}

			}
		});

		modalInstance.result.then(function (warSize) {
			$scope.addNewWar(warSize);
			console.log(warSize);
			$scope.warSize = warSize;
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};
});