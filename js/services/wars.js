app.factory('wars', function($http){
  // service body
  var wars = {};

  /*
  Nav Links
   */
  var activeLink = "";
  wars.getActiveLink = function() {
    return activeLink;
  }
  wars.setActiveLink = function(link) {
    activeLink = link;
  }

  //var wararrays = [];
  wars.getWars = function() {
  	return $http.get("../../sampleWars.json");
  };

  wars.getMembers = function() {
  	return $http.get("../../sample2.json");
  }

  /*
  Current War
   */
  //var currentWar = {size: 15};
  var currentWar = null;
  wars.getCurrentWar = function() {
    return currentWar;
  }
  wars.setCurrentWar = function(war) {
    currentWar = war;
  }
  wars.clearCurrentWar = function() {
    currentWar = null;
  }

  /*
  War Size
   */
  // var warSize = 10;
  // wars.getWarSize = function() {
  // 	return warSize;
  // }
  // wars.setWarSize = function(size) {
  // 	warSize = size;
  // }

  /*
  New War
   */
  var newWarDetailView = false;
  wars.isNewWarDetailView = function() {
    return newWarDetailView;
  }
  wars.setNewWarDetailView = function(toset) {
    newWarDetailView = toset;
  }

  /*
  Wars not recorded 
   */
  var notRecordedWars = [];
  wars.getNotRecordedWars = function() {
    return notRecordedWars;
  }

  wars.addNotRecordedWar = function(war) {
    notRecordedWars.push(war);
  }

  /*
  start new war after planner is active
   */
  wars.restartNewWar = function() {
    //clear war members
    warMembers.length = 0;
    wars.clearCurrentWar();
  }

  /*
  WAR PLANNER
   */
  var signUpViewMode = false;
  var arrangementViewMode = false;
  var signerList = null;

  wars.getSignerList = function() {
    return signerList;
  }

  wars.setSignerList = function(toset) {
    signerList = toset;
  }

  wars.getSignUpViewMode = function() {
    return signUpViewMode;
  }

  wars.setSignUpViewMode = function(toset) {
    signUpViewMode = toset;
  }

  wars.getArrangementViewMode = function() {
    return arrangementViewMode;
  }

  wars.setArrangementViewMode = function(toset) {
    arrangementViewMode = toset;
  }

  return wars;
});