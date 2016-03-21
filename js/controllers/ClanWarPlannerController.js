app.controller('ClanWarPlannerController', function($http, $scope, $location, wars, configure) {
	wars.setActiveLink("clanwar");

	if (!wars.getCurrentWar()) {
		$location.path('clanwar');
		return;
	}
	$scope.planner = configure.planner;
	$scope.warSize = wars.getCurrentWar().size;
	$scope.warMembers = wars.getWarMembers();
	
	//Suppose current user is the first war member
	$scope.currentUser = $scope.warMembers[0];
	$scope.selectTargets = [];
	$scope.viewMode = false;
	$scope.arrangeViewMode = false;

	var arrangementList = function() {
		var list = [];
		for (i = 0; i < $scope.warSize; i++) {
			list.push(_.range(0));
		}
		return list;
	}
	$scope.arrangementList = arrangementList();

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
	$scope.signerList = createSignList();
	$scope.arrangementList = $scope.signerList;
	$scope.waitingList = $scope.warMembers;
	// $scope.waitingList = [
	// 	{"title": 'Chieh Lee', 'drag': true}, 
	// 	{"title": 'Moling Guo', 'drag': true}, 
	// 	{"title": 'Xiang Fan', 'drag': true}, 
	// 	{"title": 'Alfred Song', 'drag': true}, 
	// 	{"title": 'Starin Wang', 'drag': true}, 
	// 	{"title": 'Chieh Lee', 'drag': true}, 
	// 	{"title": 'Chieh Lee', 'drag': true}, 
	// 	{"title": 'Chieh Lee', 'drag': true}, 
	// 	{"title": 'Chieh Lee', 'drag': true}, 
	// 	{"title": 'Chieh Lee', 'drag': true}, 
	// 	{"title": 'Chieh Lee', 'drag': true}, 
	// 	{"title": 'Chieh Lee', 'drag': true}
	// ];

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

	$scope.range = function(start, stop) {
		return _.range(start, stop);
	}

	$scope.checkTarget = function(index) {
		if (_.contains($scope.selectTargets, index)) {
			$scope.selectTargets = _.without($scope.selectTargets, index);
			$scope.signerList[index].pop();
		} else {
			if ($scope.selectTargets.length >= 4) return;
			$scope.selectTargets.push(index);
			$scope.signerList[index].push($scope.currentUser);
		}
	}

	$scope.containsTarget = function(index) {
		return _.contains($scope.selectTargets, index);
	}

	$scope.getPreference = function(index) {
		if ($scope.containsTarget(index)) {
			return $scope.selectTargets.indexOf(index) + 1;
		} else {
			return null;
		}
	}

	$scope.clearAllTargets = function() {
		for (i = 0; i < $scope.selectTargets.length; i++) {
			$scope.signerList[$scope.selectTargets[i]].pop();
		}
		$scope.selectTargets.length = 0;
	}

	$scope.removeLabel = function(item, arrayindex) {
		console.log(item);
		var index = $scope.arrangementList[arrayindex].indexOf(item);
		$scope.arrangementList[arrayindex].splice(index, 1);  
		$scope.waitingList.push(item);
	}

});