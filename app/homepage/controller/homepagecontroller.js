
angular.module('homePage').controller('homepageController', ['$scope','$state', '$interval', 'userService', 'homepageService', function($scope, $state, $interval, userService, homepageService){
	
	  // var self = this;
	  $scope.user = userService.user;
	  var planetsCache = {};
	  $scope.planets = [];
	  $scope.query = '';	  
	  $scope.currentPageNumber = 1;
	  $scope.disableSearch = false;
	  $scope.totalPages = 0;	  
	  $scope.queryCounter = 0;
	  $scope.loadingData = true;
	  

	  $scope.logout = function() {
	  	userService.logout();
	  	$state.go('login');
	  }

	  $scope.populateAllPlanets = function() {	  		
	  		populateData();
	  };

	  $scope.nextPage = function() {
	  		$scope.currentPageNumber += 1;
	  		if(planetsCache.hasOwnProperty($scope.currentPageNumber)){
	  			$scope.planets = planetsCache[$scope.currentPageNumber];
	  			return;
	  		}
	  		populateData($scope.currentPageNumber === 1 ? undefined: $scope.currentPageNumber);	  		
	  };

	  $scope.prevPage = function() {
	  		$scope.currentPageNumber -= 1;
	  		if(planetsCache.hasOwnProperty($scope.currentPageNumber)){
	  			$scope.planets = planetsCache[$scope.currentPageNumber];
	  			return;
	  		}
	  		populateData($scope.currentPageNumber === 1 ? undefined: $scope.currentPageNumber);
	  };

	  var populateData = function(currentPageNumber) {
	  		$scope.planets = [];
	  		$scope.loadingData = true;
	  		homepageService.getAllPlanets(currentPageNumber).then(function(data){	  			
	  			if($scope.totalPages === 0){
	  				$scope.totalPages = Math.floor(data.count/10) + data.count % 6;	
	  			}	  			
	  			var allPlanetsData = data.results;
	  			var allPlanets = [];
	  			allPlanetsData.map(function(planetInfo){
	  				allPlanets.push({name: planetInfo.name, 
	  								 population: planetInfo.population,
	  								 diameter: planetInfo.diameter,
	  								 climate: planetInfo.climate,
	  								 gravity: planetInfo.gravity,
	  								 terrain: planetInfo.terrain,
	  								 created: planetInfo.created,
	  								 showMore: false
	  								});
	  			});
	  			allPlanets.sort(compare);
	  			setStyleAttr(allPlanets);
	  			planetsCache[$scope.currentPageNumber] = allPlanets;
	  			$scope.planets = allPlanets;
	  			$scope.loadingData = false;
	  		});
	  };

	  $scope.isPreviousDisabled = function() {
	  	return ($scope.currentPageNumber === 1);
	  };

	  $scope.isNextDisabled = function() {
	  	return ($scope.currentPageNumber === $scope.totalPages);
	  };

	  var compare = function compare(a,b) {
		
		var populationA = a.population == 'unknown' ? 0 : a.population;
		var populationB = b.population == 'unknown' ? 0 : b.population;
		
  		return populationA - populationB;
	  };

	  var setStyleAttr = function(allPlanets){	  		
	  		var lastIndex = -1;
	  		for(var i = 0; i < allPlanets.length; i++) {
	  			if(allPlanets[i].population === 'unknown') {
	  				allPlanets[i].styleWidth = '5px solid darkgoldenrod';
	  				continue;
	  			} 

	  			if(i > 0 && allPlanets[i].population === allPlanets[i - 1].population) {
	  				if(lastIndex != -1){
	  					lastIndex = i - 1;
	  				}
	  				allPlanets[i].styleWidth = (lastIndex * 2 * 5) + 'px solid darkturquoise';
	  				continue;
	  			} 
	  			lastIndex = -1;
	  			allPlanets[i].styleWidth = (i * 2 * 5) + 'px solid darkseagreen';
	  		}
	  };

	  $scope.getPanelBorderWidth = function(index) {
	  		
	  		return {'border-left': $scope.planets[index].styleWidth};
	  };

	  $scope.showMoreSubmit = function(index) {
	  		$scope.planets[index].showMore = !$scope.planets[index].showMore;
	  };

	  $scope.queryChanged = function() {
	  		$scope.queryCounter++;
	  		if(userService.user !== 'Luke Skywalker' && $scope.queryCounter > 15) {
	  			$scope.disableSearch = true;
	  		}
	  };

	  // $scope.isPageLoading = function() {
	  // 	return $scope.loadingData === '';
	  // }

	  $interval(function(){	 
	  		$scope.queryCounter = 0; 	
	  		$scope.disableSearch = false;
	  }, 60000);
	  	  

	
}]);