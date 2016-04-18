app.controller('ClanInfoController', function($http, $scope, wars, configure, Auth, $uibModal, $log) {
	wars.setActiveLink("claninfo");

	$scope.clanRoleList = configure.clanRoleList;

	wars.getMembers().success(function(data) {
		$scope.members = data.clanDetails.results.memberList;
		$scope.clanBadge = data.clanDetails.results.clanBadgeImg.xl;
		$scope.clanName = data.clanDetails.results.name;
		$scope.clanTag = data.clanDetails.results.tag;
		$scope.clanDescription = data.clanDetails.results.description;
		$scope.clanLevel = data.clanDetails.results.clanLevel;
		$scope.location = data.clanDetails.results.locationName;
		$scope.warWins = data.clanDetails.results.warWins;
		$scope.memberLength = data.clanDetails.results.members;
	});

	$scope.receiveNotification = function() {
		wars.setNotification(false);
	}

	$scope.notificationModal = function(size) {
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'partials/_confirmCancel.html',
			controller: 'ModalController',
			size: size,
			resolve: {
				messageHeader: function() {
					return configure.modalDialog.notification;
				},
				message: function () {
					return configure.modalDialog.arrangementUpdateMessage;
				},
				onlyOneButton: function() {
					return true;
				},
				okayText: function() {
					return "Got it";
				}
			}
		});

		modalInstance.result.then(function () {
			$scope.receiveNotification();
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
	}

	if(Auth.getUser()) {
		if(Auth.getUser().role == "member" && wars.getNotification()) {
			$scope.notificationModal("sm");
		}
	}
});