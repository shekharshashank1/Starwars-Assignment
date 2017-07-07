angular.module('starWarsApp').controller('mainCtrl',[ '$rootScope', '$scope', function($rootScope, $scope) {
	$rootScope.showLogout = false;
	
	$rootScope.logout = function() {
		$rootScope.$broadcast('logout');
	}	
}]);