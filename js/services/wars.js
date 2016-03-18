app.factory('wars', function($http){
  // service body
  var wars = {};

  wars.getWars = function() {
  	return $http.get("../../sampleWars.json");
  };

  return wars;
});