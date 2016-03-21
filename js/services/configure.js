app.factory('configure', function(){
  // service body
  var configure = {};

  configure.warSizeOptions = ["10 vs 10", "15 vs 15", "20 vs 20", "25 vs 25", "30 vs 30", "35 vs 35", "40 vs 40", "45 vs 45", "50 vs 50"];
  configure.clanRoleList = {
		leader: "Leader",
		coLeader: "Co-leader",
		admin: "Elder",
		member: "Member"
	};

  configure.planner = {
  	header: {
  		signup: "Choose Targets",
  		arrange: "Arrangement"
  	}
  }

  return configure;
});