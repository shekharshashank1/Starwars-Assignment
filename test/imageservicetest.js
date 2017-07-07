describe("Image Service Finder", function () {


        beforeEach(function(){
            angular.mock.module('inputSearch');
            module("imageChatApp");
        });

        var service, $httpBackend;
        var retData = {            
                'hits': [{
                    webformatUrl: 'https://pixabay.com/BigBen'
                }]                        
        };       

        beforeEach(inject(function($injector) {
            service = $injector.get('imagesService');
            $httpBackend = $injector.get('$httpBackend');

            $httpBackend.when('GET', "https://pixabay.com/api?key=5537510-1513f1715e0ed263b2b612efd&hp=&image_type=&cat=&min_width=&min_height=&q=BigBen&order=popular").respond(retData);
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('getImageURL - should return 1 URL for BigBen', function () {
            service.getImageUrl('BigBen').then(function(response) {                
                expect(response.imgUrl.webformatUrl).toEqual('https://pixabay.com/BigBen'); //the response is null
            });
            $httpBackend.flush();
        });


   
});