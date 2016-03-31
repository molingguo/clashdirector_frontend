app.controller('ModalController', function ($scope, $uibModalInstance, messageHeader, message) {
	$scope.messageHeader = messageHeader;
	$scope.message = message;

	$scope.ok = function () {
		$uibModalInstance.close();
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
});