app.controller('ModalController', function ($scope, $uibModalInstance, messageHeader, message, onlyOneButton, okayText) {
	$scope.messageHeader = messageHeader;
	$scope.message = message;
	$scope.onlyOneButton = onlyOneButton ? onlyOneButton : false;
	$scope.okayText = okayText ? okayText : "Okay";

	$scope.ok = function () {
		$uibModalInstance.close();
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
});