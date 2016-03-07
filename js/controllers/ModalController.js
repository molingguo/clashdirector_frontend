app.controller('ModalController', function ($scope, $uibModalInstance, warSizeOptions, members) {
	$scope.warSizeOptions = warSizeOptions;
	$scope.warSize = $scope.warSizeOptions[0];
	$scope.members = members;
	
	$scope.ok = function () {
		$uibModalInstance.close($scope.warSize);
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};

	$scope.setWarSize = function(size) {
		$scope.warSize = size;
	}
});