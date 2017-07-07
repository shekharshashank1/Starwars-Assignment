angular.module('starWarsApp').config(['$urlRouterProvider','$stateProvider', 
  function($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    
    $stateProvider.state('login', {
          url: '/',
          templateUrl: 'login/views/login.html'
        })              
        .state('home', {
            url: '/home',
            resolve: {
              auth: function(userService, $q, $timeout) {
                
                  var deferred = $q.defer();                                       
                   $timeout(function() {
                        if ( angular.isUndefined(userService.user) ) {
                            return deferred.reject({redirectTo: 'login'});
                        }
                        else {
                            return deferred.resolve(userService.user);
                        }
                    });
                    
                    return deferred.promise;
                }
            },
           templateUrl: 'homepage/views/homepage.html'            
        });        
    }
]);