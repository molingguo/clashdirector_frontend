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
  // wars.setWars = function(wars) {
  //   wararrays = wars;
  // }

  wars.getMembers = function() {
  	return $http.get("../../sample2.json");
  }

  /*
  Current War
   */
  //var currentWar = {size: 15, isActive: true};
  var currentWar = null;
  wars.getCurrentWar = function() {
    return currentWar;
  }
  wars.setCurrentWar = function(war) {
    currentWar = war;
  }

  /*
  War Size
   */
  var warSize = 10;
  wars.getWarSize = function() {
  	return warSize;
  }
  wars.setWarSize = function(size) {
  	warSize = size;
  }

  /*
  War Members
   */
  var warMembers = [];
  wars.getWarMembers = function() {
  	return warMembers;
  }

  wars.setWarMembers = function(warmembers) {
  	warMembers = warmembers;
  }

  return wars;
});