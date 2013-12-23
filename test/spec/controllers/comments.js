/* jshint camelcase: false */
'use strict';

describe('Controller: CommentsCtrl', function () {

  // load the controller's module
  beforeEach(module('tmrApp'));

  var scope, $routeParams, $httpBackend, localStorageService;
  var commentListing = [{
    kind: 'Listing',
    data: {
      children: [{
        data: {
          domain: 'nba.com',
          subreddit: 'nba',
          id: '1t',
          url: 'http://nba.com/news',
          author: 'magnanamos',
          subreddit_id: 't5_2fwo',
          title: 'test title',
          is_self: false
        }
      }]
    }
  }, {
    kind: 'Listing',
    data: {
      children: [{
        kind: 't1',
        data: {
          id: 'ce31a',
          author: 'mrlamb',
          subreddit: 'nba',
          body: 'test body'
        }
      }, {
        kind: 't1',
        data: {
          id: 'ce1a',
          author: 'magnanamos',
          subreddit: 'nba',
          body: 'test again'
        }
      }]
    }
  }];

  beforeEach(inject(function ($rootScope, _$routeParams_, _$httpBackend_, _localStorageService_) {
    scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    $routeParams = _$routeParams_;
    $routeParams.subreddit = 'nba';
    $routeParams.id = '1t';
    $routeParams.slug = 'kobe_out';
    localStorageService = _localStorageService_;
  }));

  function loadController($controller) {
    return $controller('CommentsCtrl', {
      $scope: scope,
      $routeParams: $routeParams,
      $httpBackend: $httpBackend
    });
  }

  describe('loading comments', function () {
    it('updates flag to indicate comments are loading', inject(function ($controller) {
      $httpBackend
        .expectJSONP('http://reddit.com/r/nba/comments/1t/kobe_out.json?sort=new&jsonp=JSON_CALLBACK')
        .respond(200, commentListing);

      loadController($controller);

      expect(scope.loadingComments).toBeTruthy();
    }));

    it('updates flag to indicate comments are done loading on failure', inject(function ($controller) {
      $httpBackend
        .expectJSONP('http://reddit.com/r/nba/comments/1t/kobe_out.json?sort=new&jsonp=JSON_CALLBACK')
        .respond(500);

      loadController($controller);

      $httpBackend.flush();

      expect(scope.loadingComments).toBeFalsy();
    }));

    describe('successfully retrieved comments', function () {
      beforeEach(inject(function($controller) {
        $httpBackend
          .expectJSONP('http://reddit.com/r/nba/comments/1t/kobe_out.json?sort=new&jsonp=JSON_CALLBACK')
          .respond(200, commentListing);
        $httpBackend.expectPOST('/comments', commentListing).respond(200, { });

        loadController($controller);

        $httpBackend.flush();
      }));

      it('updates flag to indicate comments are done loading', function () {
        expect(scope.loadingComments).toBeFalsy();
      });

      it('attaches comments to scope', function () {
        var expectedComments = [{
          id: 'ce31a',
          author: 'mrlamb',
          body: 'test body'
        }, {
          id: 'ce1a',
          author: 'magnanamos',
          body: 'test again'
        }];

        expect(scope.comments).toEqual(expectedComments);
      });
    });
  });

  describe('OP found in cache', function () {
    beforeEach(inject(function ($controller) {
      $httpBackend
        .expectJSONP('http://reddit.com/r/nba/comments/1t/kobe_out.json?sort=new&jsonp=JSON_CALLBACK')
        .respond(200, commentListing);
      $httpBackend.expectPOST('/comments', commentListing).respond(200, { });

      spyOn(localStorageService, 'get').andReturn([{
        id: '1t',
        title: 'test title',
        subreddit: 'nba',
        domain: 'nba.com',
        url: 'http://nba.com/news',
        isSelfPost: false
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
        .expectJSONP('http://reddit.com/r/nba/comments/1t/kobe_out.json?sort=new&jsonp=JSON_CALLBACK')
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

      it('contains the op url', function () {
        expect(scope.op.url).toEqual('http://nba.com/news');
      });

      it('contains whether op is a self post', function () {
        expect(scope.op.isSelfPost).toBeFalsy();
      });
    });
  }
});
