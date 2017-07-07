describe("HomePageService", function () {

    beforeEach(module("homePage"));

   

        var service, $httpBackend;

        var retData = {
                'count': 61,
                'results': [{
                   "name": "Alderaan",
                    "rotation_period": "24",
                    "orbital_period": "364",
                    "diameter": "12500",
                    "climate": "temperate",
                    "gravity": "1 standard",
                    "terrain": "grasslands, mountains",
                    "surface_water": "40",
                    "population": "2000000000",            
                }
            ]

        }
       

        beforeEach(inject(function($injector) {
            service = $injector.get('PlanetService');
            $httpBackend = $injector.get('$httpBackend');

            $httpBackend.when('GET', "https://swapi.co/api/planets/").respond(retData);
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('getPlanets - should return 1 planet', function () {
            service.getPlanets(1).then(function(response) {
                console.log(response);
                alert(response);
                expect(response.results.length).toEqual(1); //the response is null
            });
            $httpBackend.flush();
        });


   
});