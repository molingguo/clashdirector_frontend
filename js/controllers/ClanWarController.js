app.controller('ClanWarController', function($http, $scope, $location, wars, $uibModal, $log, configure, Auth) {
	/*
	If a war is active, go to planner page
	 */
	wars.setActiveLink("clanwar");
	if (wars.getCurrentWar()) {
		$location.path('clanwarplanner');
		return;
	}

	/*
	INITIAL VALUE
	 */
	$scope.isLeader = function() {
		return Auth.isLeader();
	}
	$scope.leaderMessage = configure.planner.newwarMessage.leader;
	$scope.memberMessage = configure.planner.newwarMessage.member;
	$scope.newWarView = function() {
		return wars.isNewWarDetailView();
	}
	$scope.warSizeOptions = configure.warSizeOptions;
	$scope.warSizeText = $scope.warSizeOptions[0];
	$scope.warSize = function() {
		return Number($scope.warSizeText.substring(0, 2));
	}
	$scope.newWar = {
		opponent: ""
	};
	//$scope.opponentClan = "";

	/*
	Initialize member data
	 */
	wars.getMembers().success(function(data) {
		$scope.members = data.clanDetails.results.memberList;
	});
	$scope.warMembers = [];
	//$scope.warMembers = wars.getWarMembers();

	/*
	Initialize war data
	 */
	wars.getWars().success(function(data) {
		$scope.wars = data;
	});

	$scope.switchWarView = function() {
		wars.setNewWarDetailView(true);
	}

	$scope.setWarSize = function(size) {
		$scope.warSizeText = size;
	}

	$scope.containsMember = function(member) {
		return _.findWhere($scope.warMembers, {'name': member.name});
	}

	$scope.addRemoveMember = function(member) {
		if ($scope.containsMember(member)) {
			$scope.warMembers = _.reject($scope.warMembers, function(warm) {
				return warm.name == member.name;
			});
		} else {
			$scope.warMembers.push(member);
		}
	}

	$scope.inOutWarText = function(member) {
		if ($scope.containsMember(member)) {
			return "In";
		} else {
			return "Out";
		}
	}

	/*
	Disable start button if selected members length 
	ot equal war size
	 */
	$scope.checkActive = function() {
		return $scope.warSize() == $scope.warMembers.length;
	}

	/*
	Add and start the new war
	 */
	$scope.startWar = function() {
		$scope.warMembers = _.map($scope.warMembers, function(mem, index) {
			mem.warrank = index+1;
			return mem;
		});
		//wars.setWarMembers($scope.warMembers);
		$scope.newWar.size = $scope.warSize();
		$scope.newWar.warMembers = $scope.warMembers;
		$scope.wars.push($scope.newWar);
		wars.setCurrentWar($scope.newWar);
		console.log($scope.newWar);
		$location.path('clanwarplanner');
	}

	$scope.reset = function() {
		//clear war members
		$scope.warMembers.length = 0;
	}

	$scope.cancel = function() {
		$scope.reset();
		$scope.warSizeText = $scope.warSizeOptions[0];
		$scope.newWar.opponent = "";
		wars.setNewWarDetailView(false);
	}

	$scope.openModal = function (size) {
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'partials/_confirmCancel.html',
			controller: 'ModalController',
			size: size,
			resolve: {
				messageHeader: function() {
					return configure.modalDialog.confirmation;
				},
				message: function () {
					return configure.modalDialog.cancelMessage;
				},
				onlyOneButton: function() {
					return false;
				},
				okayText: function() {
					return "Okay";
				}
			}
		});

		modalInstance.result.then(function () {
			$scope.cancel();
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};
});