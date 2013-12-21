/* jshint camelcase: false */
'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('tmrApp'));

  var MainCtrl, scope, $httpBackend, localStorageService;
  var frontPageListing = {
    data: {
      children: [
        {
          data: {
            domain: 'bgr.com',
            subreddit: 'technology',
            id: '1tcabu',
            author: 'FOXBERRY',
            score: 4767,
            over_18: false,
            permalink: '/r/technology/comments/1tcabu/tmobiles_next_move_could_be_devastating_for_att/',
            created: 1387593435,
            url: 'http://bgr.com/2013/12/20/t-mobile-uncarrier-4-rumor',
            title: 'T-Mobile’s next move could be devastating for AT&amp;T and Verizon: Paying off subscribers’ early termination fees if they switch from a rival carrier.',
            num_comments: 1577,
            visited: false
          }
        },
        {
          data: {
            domain: 'self.Christianity',
            subreddit: 'Christianity',
            id: '1tbbe5',
            author: 'magnanamos',
            score: 1337,
            over_18: false,
            permalink: '/r/Christianity/comments/1tbbe5/the_most_wise_thing_ive_heard_about_the_duck/',
            created: 1387293435,
            url: 'http://www.reddit.com/r/Christianity/comments/1tbbe5/the_most_wise_thing_ive_heard_about_the_duck/',
            title: 'The most wise thing I\'ve heard about the Duck Dynasty issue.',
            num_comments: 123,
            visited: false
          }
        },
        {
          data: {
            domain: 'i.imgur.com',
            subreddit: 'Coffee',
            id: '1tc5rp',
            author: 'sebash',
            score: 31,
            over_18: false,
            permalink: '/r/Coffee/comments/1tc5rp/amazing_hawaiian_coffee_menu/',
            created: 1386593435,
            url: 'http://i.imgur.com/CF5GbTZ.jpg',
            title: 'Amazing Hawaiian Coffee Menu',
            num_comments: 21,
            visited: false
          }
        }
      ]
    }
  };

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_, _localStorageService_) {
    scope = $rootScope.$new();
    localStorageService = _localStorageService_;
    spyOn(localStorageService, 'set');
    $httpBackend = _$httpBackend_;
    $httpBackend.expectJSONP('http://reddit.com/.json?jsonp=JSON_CALLBACK')
                .respond(200, frontPageListing);
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      $httpBackend: $httpBackend
    });
    $httpBackend.flush();
  }));

  it('attaches listing to scope', function () {
    expect(scope.listing[0].id).toEqual('1tcabu');
    expect(scope.listing[0].permalink)
      .toEqual('/r/technology/comments/1tcabu/tmobiles_next_move_could_be_devastating_for_att/');
    expect(scope.listing[1].id).toEqual('1tbbe5');
    expect(scope.listing[1].permalink)
      .toEqual('/r/Christianity/comments/1tbbe5/the_most_wise_thing_ive_heard_about_the_duck/');
    expect(scope.listing[2].id).toEqual('1tc5rp');
    expect(scope.listing[2].permalink)
      .toEqual('/r/Coffee/comments/1tc5rp/amazing_hawaiian_coffee_menu/');
  });

  it('stores listing into localstorage', function () {
    expect(localStorageService.set).toHaveBeenCalledWith('listing', scope.listing);
  });
});
