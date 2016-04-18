app.controller('ClanWarPlannerController', function($http, $scope, $location, $uibModal, $log, wars, configure, Auth) {
	wars.setActiveLink("clanwar");
	if (!wars.getCurrentWar()) {
		$location.path('clanwar');
		return;
	}

	/*
	Initialize
	 */
	$scope.isLeader = function() {
		return Auth.isLeader();
	}
	$scope.planner = configure.planner;
	$scope.warSize = wars.getCurrentWar().size;
	$scope.currentUser = Auth.getUser();
	$scope.viewMode = function() {
		return wars.getSignUpViewMode();
	}
	$scope.submitSignUp = function() {
		wars.setSignerList($scope.signerList);
		wars.setSignUpViewMode(true);
	}
	$scope.editSignUp = function() {
		wars.setSignUpViewMode(false);
	}
	$scope.arrangeViewMode = false;
	
	var arrangementList = function() {
		var list = [];
		for (i = 0; i < $scope.warSize; i++) {
			list.push(_.range(0));
		}
		return list;
	}

	//Create an temporary signer list (randomly for prototyping)
	var createSignList = function() {
		var list = [];
		for (i = 0; i < $scope.warSize; i++) {
			var sublist = [];
			if(Math.random() < 0.25) {
			} else {
				var rand = Math.random();
				if(rand < 0.4) {
					if (i > 0) sublist.push($scope.warMembers[i]);
				} else if (rand < 0.7) {
					if (i > 0) sublist.push($scope.warMembers[i]);
					if (i > 1) sublist.push($scope.warMembers[i-1]);
				} else {
					sublist.push($scope.warMembers[i]);
					if (i > 1) sublist.push($scope.warMembers[i-1]);
					if (i+1 < $scope.warSize) sublist.push($scope.warMembers[i+1]);
				}
			}
			list.push(sublist);
		}
		return list;
	}
	//$scope.warMembers = wars.getWarMembers();
	$scope.warMembers = wars.getCurrentWar().warMembers;
	$scope.signerList = wars.getSignerList() ? wars.getSignerList() : createSignList();
	$scope.arrangementList = $scope.signerList;
	$scope.waitingList = $scope.warMembers;

	/*
	For Development Use, skip the start war part
	 */
	// wars.getMembers().success(function(data) {
	// 	var members = data.clanDetails.results.memberList;
	// 	$scope.warMembers = members.slice(0, 15);
	// 	console.log($scope.warMembers);
	// 	$scope.signerList = createSignList();
	// 	$scope.arrangementList = $scope.signerList;
	// 	$scope.waitingList = $scope.warMembers;
	// });

	/*
	TODO: Check Duplicates
	 */
	// $scope.arrangementOptions = function(index) {
	// 	return {
	// 		accept: function(dragEl) {
	// 			var list = $scope.arrangementList[index];
	// 			var findEl = _.find(list, function(item) {
	// 				return angular.element(dragEl).text() == item.name;
	// 			});
	// 			if (findEl) {
	// 				return false;
	// 			} else {
	// 				return true;
	// 			}
	// 		}
	// 	}
	// }
	// 
	$scope.selectTargets = function() {
		if(!$scope.signerList) return;
		var targetArray = [];

		for (i = 0; i < $scope.signerList.length; i++) {
			if ($scope.containsCurrentUser(i)) {
				targetArray.push(i);
			}
		}
		return targetArray;
	};

	$scope.range = function(start, stop) {
		return _.range(start, stop);
	}

	$scope.checkTarget = function(index) {
		if ($scope.containsCurrentUser(index)) {
			$scope.signerList[index] = _.reject($scope.signerList[index], function(mem) {
				return mem.name == Auth.getUser().name;
			});
		} else {
			if ($scope.selectTargets().length >= 4) return;
			$scope.signerList[index].push($scope.currentUser);
		}
	}

	$scope.containsCurrentUser = function(index) {
		if (!$scope.signerList || !Auth.getUser()) return;
		return _.findWhere($scope.signerList[index], {name: Auth.getUser().name});
	}

	$scope.isCurrentUser = function(signer) {
		if(!signer || !Auth.getUser()) return;
		return signer.name == Auth.getUser().name;
	}

	$scope.clearAllTargets = function() {
		for (i = 0; i < $scope.signerList.length; i++) {
			if ($scope.containsCurrentUser(i)) {
				$scope.signerList[i] = _.reject($scope.signerList[i], function(mem) {
					return mem.name == Auth.getUser().name;
				});
			}
		}
	}

	$scope.removeLabel = function(item, arrayindex) {
		var index = $scope.arrangementList[arrayindex].indexOf(item);
		$scope.arrangementList[arrayindex].splice(index, 1);  
		$scope.waitingList.push(item);
	}

	$scope.startNewWar = function() {
		wars.addNotRecordedWar(wars.getCurrentWar());
		wars.clearCurrentWar();
		wars.setNewWarDetailView(false);
		$location.path('clanwar');
	}

	$scope.startNewWarModal = function (size) {
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
					return configure.modalDialog.startNewWarMessage;
				}
			}
		});

		modalInstance.result.then(function () {
			$scope.startNewWar();
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};

});