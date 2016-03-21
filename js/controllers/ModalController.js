app.controller('ModalController', function ($scope, $uibModalInstance, members, configure, wars) {
	$scope.warSizeOptions = configure.warSizeOptions;
	$scope.warSize = $scope.warSizeOptions[0];
	$scope.warSizeNumber = function() {
		return Number($scope.warSize.substring(0, 2));
	}
	$scope.members = members;
	$scope.warMembers = wars.getWarMembers();
	
	$scope.addRemoveMember = function(member) {
		if (_.findWhere($scope.warMembers, {'name': member.name})) {
			$scope.warMembers = _.reject($scope.warMembers, function(warm) {
				return warm.name == member.name;
			});
		} else {
			$scope.warMembers.push(member);
		}
	}

	$scope.inOutWarText = function(member) {
		if (_.findWhere($scope.warMembers, {'name': member.name})) {
			return "In";
		} else {
			return "Out";
		}
	}

	$scope.getWarPosition = function(member) {
		var findIndex = _.findIndex($scope.warMembers, function(warm) {
			return warm.name == member.name;
		});
		if (findIndex >= 0) {
			return findIndex + 1;
		} else {
			return "";
		}
	}

	$scope.checkActive = function() {
		return Number($scope.warSize.substring(0, 2)) == $scope.warMembers.length;
	}

	$scope.ok = function () {
		wars.setWarMembers($scope.warMembers);
		//wars.setWarSize(Number($scope.warSize.substring(0, 2)));
		$uibModalInstance.close($scope.warSize);
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};

	$scope.setWarSize = function(size) {
		$scope.warSize = size;
	}
});