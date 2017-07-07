angular.module('homePage').factory('homepageService',['$http', function($http) {
		var url = 'https://swapi.co/api/planets';
		
	 	
		var planetDataService = {
	    	
	    	getAllPlanets: function(pageNumber) {	    		
	    		var newUrl = pageNumber ? url + '?page=' + pageNumber: url;
	            return $http.get(newUrl).then(function(response){ 
   		  			var data = response.data;   		     		  	   	  
   		  			return data;
 		  		});
	        },
	       
	    }
	    
	    return planetDataService;
	
}])