angular.module('loginPage').controller('loginController', ['$rootScope','$scope','$state', 'userService', function($rootScope, $scope, $state, userService){
	
	$scope.username = '';
	$scope.password = '';
	$scope.error = '';

	$scope.login = function() {
        var user = undefined;
        userService.login({username: $scope.username, password: $scope.password}).then(function(userInfo){
        	user = userInfo;
        	if (angular.isUndefined(user)) {
        		$scope.username = '';
        		$scope.password = '';
        		$state.go('login');           		
        		$scope.error = "Incorrect username/password !";
                
        	}  else {
                $rootScope.showLogout = true;
           		$state.go('home');
        	}
       
    	});
                    
        
    };

    $rootScope.$on('logout', function() {   
        $rootScope.showLogout = false;     
        userService.logout();

    })
     
	
}]);