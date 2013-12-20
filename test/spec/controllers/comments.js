/* jshint camelcase: false */
'use strict';

describe('Controller: CommentsCtrl', function () {

  // load the controller's module
  beforeEach(module('tmrApp'));

  var CommentsCtrl, scope, $routeParams, $httpBackend;
  var commentListing = [
    {
      kind: 'Listing',
      data: {
        children: [
          {
            data: {
              domain: 'example.com',
              subreddit: 'programming',
              id: '1tcgez',
              author: 'magnanamos',
              subreddit_id: 't5_2fwo',
              title: 'OP Title'
            }
          }
        ]
      }
    }
  ];

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$routeParams_, _$httpBackend_) {
    scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    $routeParams = _$routeParams_;
    $routeParams.subreddit = 'nba';
    $routeParams.id = '1t';
    $routeParams.slug = 'kobe_out';
    $httpBackend.expectJSONP('http://reddit.com/r/nba/comments/1t/kobe_out.json?jsonp=JSON_CALLBACK')
      .respond(200, commentListing);
    $httpBackend.expectPOST('/comments', commentListing).respond(200, { });
    CommentsCtrl = $controller('CommentsCtrl', {
      $scope: scope,
      $routeParams: $routeParams,
      $httpBackend: $httpBackend
    });
    $httpBackend.flush();
  }));

  it('fetches comments from reddit and sends it back to server', function () {
  });

  describe('original post', function () {
    it('is attached to scope', function () {
      expect(scope.op).toBeDefined();
    });

    it('contains a title', function () {
      expect(scope.op.title).toEqual('OP Title');
    });

    it('contains a subreddit', function () {
      expect(scope.op.subreddit).toEqual('programming');
    });
  });
});
