
describe('HomePageController', function () {
    
beforeEach(module('homePage'));    
var homepageController,
	scope,
	homepageService;

beforeEach(inject(function(_$rootScope,_$controller,_homepageService){
    homepageController = _$controller;
    scope = _$rootScope.$new();
    homepageService = _homepageService; 
  }));

 it('should have a home page controller', function() {
    expect(homepageController).toBeDefined();
  });

 

});