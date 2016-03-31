app.factory('Auth', function(){

var sampleLeader = {
	name: "SampleLeader", 
	role: "leader",
	username: "leader",
	password: "123456"
}

var sampleMember = {
	name: "SampleMember",
	role: "member",
	username: "member",
	password: "123456"
}

var users = [sampleLeader, sampleMember];

var user = null;
//var user = sampleLeader;
//var user = sampleMember;

return{
	getUser: function() {
		return user;
	},
    setUser : function(aUser){
        user = aUser;
    },
    setSampleLeader : function() {
    	user = sampleLeader;
    },
    checkLogin: function(username) {
    	return _.find(users, function(user) {
    		return user.username==username;
    	});
    },
    isLoggedIn : function(){
        return(user)? user : false;
    },
    isLeader : function() {
    	return (user)? user.role == "leader" : false;
    },
    isMember : function() {
    	return (user)? user.role == "member" : false;
    }
  }
});