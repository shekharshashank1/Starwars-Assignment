angular.module('loginPage').factory('userService',['$http', function($http) {
		var url = 'https://swapi.co/api/people';
		
	 	var getUsersInfo = function() {
		  return $http.get(url).then(function(response){ 
   		  	var data = response.data;   		     		  	   	  
   		  	return data.results;
 		  });
		};
		var userService = {
	    	user: undefined,
	    	login: function(userCredentials) {	    		
	    		return getUsersInfo().then(function(allUsers){
	    			for(var i = 0; i < allUsers.length; i++){
	    				if(( userCredentials.username === allUsers[i].name && ( allUsers[i].birth_year === userCredentials.password ) )){
	    					userService.user = allUsers[i].name;
	    					break;
	    				} else {
	    					userService.user = undefined;	    					
	    				}
	    			}
	    			// $windowProvider.$get().sessionStorage['userInfo'] = userService.user;
	    			return userService.user;   					            
	    		});   	
	            
	        },
	        logout: function() {
	        	// $windowProvider.$get().sessionStorage['userInfo'] = undefined;
	        	userService.user = undefined;
	        }
	    }
	    
	    return userService;
	
}])