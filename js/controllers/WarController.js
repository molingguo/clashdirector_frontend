app.controller('WarController', function ($scope, $routeParams, wars, configure, Auth) {
	wars.setActiveLink("warlog");
	$scope.clanName = "USA UNITED";
	$scope.editMode = false;
	$scope.warSizeOptions = configure.warSizeOptions;
	$scope.warSizeText = $scope.warSizeOptions[0];
	$scope.warSize = function() {
		return Number($scope.warSizeText.substring(0, 2));
	}

	$scope.isLeader = function() {
		return Auth.isLeader();
	}

	$scope.switchEditMode = function() {
		console.log("here");
		$scope.editMode = !$scope.editMode;
	}

	$scope.setWarSize = function(size) {
		$scope.warSizeText = size;
	}

	$scope.targetOptions = function() {
		return _.range(1, $scope.warSize()+1);
	}

	$scope.warMembers = [];

	wars.getWars().success(function(data) {
		$scope.war = data.reverse()[$routeParams.id];
		$scope.warDate = moment($scope.war.date);
		$scope.warMembers = $scope.war.warMembers;
		
		if ($scope.war.won) {
			$scope.wonText = "Victory";
		} else {
			$scope.wonText = "Defeat";
		}
	});

	$scope.today = function() {
		$scope.dt = new Date();
	};
	$scope.today();

	$scope.clear = function() {
		$scope.dt = null;
	};

	$scope.popup2 = {
		opened: false
	};

	$scope.open2 = function() {
		$scope.popup2.opened = true;
	};

	$scope.getAttackTarget = function(target) {
		if(target==null) {
			return "Not Used";
		}	
		else return target;
	}

	$scope.dateOptions = {
		formatYear: 'yy',
		maxDate: new Date(),
		minDate: new Date(2012, 1, 1),
		startingDay: 1
	};

	$scope.processSubmit = function() {
		//TODO: IF attack is not null but star is null.
		//Set to default value: 0 stars
	}

});