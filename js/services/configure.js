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
    newwarMessage: {
      leader: "Your clan ready? Take them to war!",
      member: "Ready to begin? Ask a clan leader to start a war"
    },
  	header: {
  		signup: "Choose Targets",
  		arrange: "Arrangement"
  	}
  }

  configure.modalDialog = {
    confirmation: "Confirmation", 
    notification: "Notification",
    cancelMessage: "Do you really want to discard your changes?",
    logoutMessage: "Do you really want to log out?",
    startNewWarMessage: "Do you really want to start a new war?",
    arrangementUpdateMessage: "Your leader updated the war arrangement. "
  }

  return configure;
});