/* jshint camelcase: false */
'use strict';

describe('Controller: CommentsCtrl', function () {

  // load the controller's module
  beforeEach(module('tmrApp'));

  var scope, $routeParams, $httpBackend, localStorageService;
  var commentListing = [
    {
      kind: 'Listing',
      data: {
        children: [
          {
            data: {
              domain: 'nba.com',
              subreddit: 'nba',
              id: '1t',
              author: 'magnanamos',
              subreddit_id: 't5_2fwo',
              title: 'test title'
            }
          }
        ]
      }
    }
  ];

  beforeEach(
    inject(
      function ($rootScope, _$routeParams_, _$httpBackend_, _localStorageService_) {
        scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        $routeParams = _$routeParams_;
        $routeParams.subreddit = 'nba';
        $routeParams.id = '1t';
        $routeParams.slug = 'kobe_out';
        localStorageService = _localStorageService_;
      }
    )
  );

  function loadController($controller) {
    return $controller('CommentsCtrl', {
      $scope: scope,
      $routeParams: $routeParams,
      $httpBackend: $httpBackend
    });
  }

  describe('scope.loadingComments', function () {
    it('returns true while in process of loading comments', inject(function ($controller) {
      $httpBackend
        .expectJSONP('http://reddit.com/r/nba/comments/1t/kobe_out.json?jsonp=JSON_CALLBACK')
        .respond(200, commentListing);

      loadController($controller);

      expect(scope.loadingComments).toBeTruthy();
    }));

    it('returns false on failure of retrieving comments', inject(function ($controller) {
      $httpBackend
        .expectJSONP('http://reddit.com/r/nba/comments/1t/kobe_out.json?jsonp=JSON_CALLBACK')
        .respond(500);

      loadController($controller);

      $httpBackend.flush();

      expect(scope.loadingComments).toBeFalsy();
    }));

    it('returns false on success of retrieving comments', inject(function ($controller) {
      $httpBackend
        .expectJSONP('http://reddit.com/r/nba/comments/1t/kobe_out.json?jsonp=JSON_CALLBACK')
        .respond(200, commentListing);
      $httpBackend.expectPOST('/comments', commentListing).respond(200, { });

      loadController($controller);

      $httpBackend.flush();

      expect(scope.loadingComments).toBeFalsy();
    }));
  });

  describe('OP found in cache', function () {
    beforeEach(inject(function ($controller) {
      $httpBackend
        .expectJSONP('http://reddit.com/r/nba/comments/1t/kobe_out.json?jsonp=JSON_CALLBACK')
        .respond(200, commentListing);
      $httpBackend.expectPOST('/comments', commentListing).respond(200, { });

      spyOn(localStorageService, 'get').andReturn([{
        id: '1t',
        title: 'test title',
        subreddit: 'nba',
        domain: 'nba.com'
      }, {
        id: 'notthis',
        title: 'bogus title',
        subreddit: 'programming',
        domain: 'imgur.com'
      }, {
        id: 'andnotthis',
        title: 'crap title',
        subreddit: 'technology',
        domain: 'bgr.com'
      }]);

      loadController($controller);

      $httpBackend.flush();
    }));

    it('fetches comments from reddit and sends it back to server', function () {
    });

    expectPostRetrieved();
  });

  describe('OP not found in cache', function () {
    beforeEach(inject(function ($controller) {
      $httpBackend
        .expectJSONP('http://reddit.com/r/nba/comments/1t/kobe_out.json?jsonp=JSON_CALLBACK')
        .respond(200, commentListing);
      $httpBackend.expectPOST('/comments', commentListing).respond(200, { });

      spyOn(localStorageService, 'get').andReturn(null);
      loadController($controller);
      $httpBackend.flush();
    }));

    expectPostRetrieved();
  });

  function expectPostRetrieved() {
    describe('original post', function () {
      it('is attached to scope from localstorage', function () {
        expect(scope.op).toBeDefined();
      });

      it('contains a title', function () {
        expect(scope.op.title).toEqual('test title');
      });

      it('contains a subreddit', function () {
        expect(scope.op.subreddit).toEqual('nba');
      });

      it('contains the op domain', function () {
        expect(scope.op.domain).toEqual('nba.com');
      });
    });
  }
});
