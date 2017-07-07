angular.module('starWarsApp').controller('mainCtrl',[ '$rootScope', function($rootScope) {
	$rootScope.logout = function() {
		$rootScope.$broadcast('logout');
	}
}]);