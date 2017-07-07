angular.module('homePage',[]);

angular.module('homePage').directive('planets', function(){
	return {
		replace: false,	
		restrict: 'E',
		scope: true,	
		templateUrl: 'homepage/directives/planets-directive.html'
	}
});

