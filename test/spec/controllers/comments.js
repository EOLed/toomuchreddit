/* jshint camelcase: false */
'use strict';

describe('Controller: CommentsCtrl', function () {

  // load the controller's module
  beforeEach(module('tmrApp'));

  var scope, $routeParams, $httpBackend, localStorageService, $interval;
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
          is_self: false,
          author_flair_text: 'Raptors',
          created_utc: 1387762489,
          selftext: 'this is the op'
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
          body: 'test body',
          author_flair_text: 'Raptors',
          created_utc: 1387712489,
          replies: {
            kind: 'Listing',
            data: {
              children: [{
                kind: 't1',
                data: {
                  id: '1234',
                  author: 'replier',
                  subreddit: 'nba',
                  body: 'my response',
                  author_flair_text: 'Celtics',
                  created_utc: 1387812489,
                  replies: ''
                }
              }]
            }
          }
        }
      }, {
        kind: 't1',
        data: {
          id: 'ce1a',
          author: 'magnanamos',
          subreddit: 'nba',
          body: 'test again',
          author_flair_text: null,
          created_utc: 1387722489,
          replies: ''
        }
      }, {
        kind: 'more',
        data: {
          id: 'ssce1a'
        }
      }]
    }
  }];

  beforeEach(inject(function ($rootScope, _$routeParams_, _$httpBackend_, _localStorageService_, _$interval_) {
    scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    $routeParams = _$routeParams_;
    $routeParams.subreddit = 'nba';
    $routeParams.id = '1t';
    $routeParams.slug = 'kobe_out';
    localStorageService = _localStorageService_;
    $interval = _$interval_;
  }));

  function loadController($controller) {
    var controller = $controller('CommentsCtrl', {
      $scope: scope,
      $routeParams: $routeParams,
      $httpBackend: $httpBackend
    });

    return controller;
  }

  describe('loading comments', function () {
    it('updates flag to indicate comments are loading', inject(function ($controller) {
      $httpBackend
        .expectJSONP('http://www.reddit.com/r/nba/comments/1t/kobe_out.json?sort=new&jsonp=JSON_CALLBACK')
        .respond(200, commentListing);

      loadController($controller);

      expect(scope.loadingComments).toBeTruthy();
    }));

    it('updates flag to indicate comments are done loading on failure', inject(function ($controller) {
      $httpBackend
        .expectJSONP('http://www.reddit.com/r/nba/comments/1t/kobe_out.json?sort=new&jsonp=JSON_CALLBACK')
        .respond(500);

      loadController($controller);

      $httpBackend.flush();

      expect(scope.loadingComments).toBeFalsy();
    }));

    describe('successfully retrieved comments', function () {
      beforeEach(inject(function($controller) {
        $httpBackend
          .expectJSONP('http://www.reddit.com/r/nba/comments/1t/kobe_out.json?sort=new&jsonp=JSON_CALLBACK')
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
          body: 'test body',
          authorFlairText: 'Raptors',
          created: new Date(1387712489 * 1000),
          replies: [{
            id: '1234',
            author: 'replier',
            authorFlairText: 'Celtics',
            created: new Date(1387812489 * 1000),
            body: 'my response',
            replies: ''
          }]
        }, {
          id: 'ce1a',
          author: 'magnanamos',
          body: 'test again',
          authorFlairText: null,
          created: new Date(1387722489 * 1000),
          replies: ''
        }];

        expect(scope.comments).toEqual(expectedComments);
      });

      it('retrieves new comments every 20 seconds', function () {
        $httpBackend
          .expectJSONP('http://www.reddit.com/r/nba/comments/1t/kobe_out.json?sort=new&jsonp=JSON_CALLBACK')
          .respond(200, commentListing);
        $httpBackend.expectPOST('/comments', commentListing).respond(200, { });

        $interval.flush(20000);

        $httpBackend.flush();
      });

      it('cancels timer when controller is destroyed', function () {
        scope.$destroy();
        $interval.flush(20000);
        $httpBackend.verifyNoOutstandingRequest();
      });
    });
  });

  describe('OP found in cache', function () {
    beforeEach(inject(function ($controller) {
      $httpBackend
        .expectJSONP('http://www.reddit.com/r/nba/comments/1t/kobe_out.json?sort=new&jsonp=JSON_CALLBACK')
        .respond(200, commentListing);
      $httpBackend.expectPOST('/comments', commentListing).respond(200, { });

      spyOn(localStorageService, 'get').andReturn([{
        id: '1t',
        title: 'test title',
        subreddit: 'nba',
        domain: 'nba.com',
        url: 'http://nba.com/news',
        isSelfPost: false,
        authorFlairText: 'Raptors',
        selfText: 'this is the op'
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
        .expectJSONP('http://www.reddit.com/r/nba/comments/1t/kobe_out.json?sort=new&jsonp=JSON_CALLBACK')
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

      it('contains the op self text', function () {
        expect(scope.op.selfText).toEqual('this is the op');
      });

      it('contains op author flair text', function () {
        expect(scope.op.authorFlairText).toEqual('Raptors');
      });
    });

    it('specifies the subreddit url for this post', function () {
      expect(scope.subredditUrl).toEqual('http://www.reddit.com/r/nba');
    });
  }
});
