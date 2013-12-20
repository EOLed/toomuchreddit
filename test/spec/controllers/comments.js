'use strict';

describe('Controller: CommentsCtrl', function () {

  // load the controller's module
  beforeEach(module('tmrApp'));

  var CommentsCtrl, scope, $routeParams, $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$routeParams_, _$httpBackend_) {
    scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    $routeParams = _$routeParams_;
    $routeParams.subreddit = 'nba';
    $routeParams.id = '1t';
    $routeParams.slug = 'kobe_out';
    $httpBackend.expectJSONP('http://reddit.com/r/nba/comments/1t/kobe_out.json?jsonp=JSON_CALLBACK')
      .respond(200, { test: 'data' });
    $httpBackend.expectPOST('http://toomuchreddit.com/comments', { test: 'data' }).respond(200, { });
    CommentsCtrl = $controller('CommentsCtrl', {
      $scope: scope,
      $routeParams: $routeParams,
      $httpBackend: $httpBackend
    });
  }));

  it('fetches comments from reddit and sends it back to server', function () {
    $httpBackend.flush();
  });
});
