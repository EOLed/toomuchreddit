/* jshint camelcase: false */
'use strict';

angular.module('tmrApp').controller('CommentsCtrl',
  function ($scope, $routeParams, $http, localStorageService, $interval, Page) {
    function createAutoRefreshCommentsTimer() {
      return $interval(loadLatestComments, 20000, 0, false);
    }

    function cancelAutoRefreshCommentsTimer() {
      $interval.cancel(loadLatestCommentsTimer);
    }

    function loadLatestComments() {
      $http.jsonp(getCommentsApiPermalink()).success(function (data) {
        onLatestCommentsLoaded(data);
      }).error(function () {
        indicateCommentsLoaded();
        console.log('could not send comments to toomuchreddit.com');
      });
    }

    function onLatestCommentsLoaded(response) {
      if (isOpNotFoundInCache()) {
        setOriginalPost(getOriginalPostFromResponse(response));
      }

      indicateCommentsLoaded();
      $scope.comments = getCommentsFromResponse(response);
      sendToServer(response);
    }

    var loadLatestCommentsTimer = createAutoRefreshCommentsTimer();

    function toggleAutoRefresh() {
      $scope.autoRefresh = !$scope.autoRefresh;

      if ($scope.autoRefresh) {
        loadLatestComments();
        loadLatestCommentsTimer = createAutoRefreshCommentsTimer();
      } else {
        cancelAutoRefreshCommentsTimer();
      }
    }
    
    function getCommentsApiPermalink() {
      return 'http://www.reddit.com/' + getCommentsPermalink() + '.json?sort=new&jsonp=JSON_CALLBACK';
    }

    function getCommentsPermalink() {
      return 'r/' + $routeParams.subreddit + '/comments/' + $routeParams.id + '/' +
        $routeParams.slug;
    }

    function sendToServer(data) {
      return $http.post('/comments', data);
    }

    function getOriginalPostFromCache(postId) {
      var listing = localStorageService.get('listing');

      if (listing === null) {
        return null;
      }

      var op = null;
      var opNotFound = true;
      angular.forEach(listing, function (post) {
        // no support for breaking angular.forEach :(
        // https://github.com/angular/angular.js/issues/263
        if (opNotFound && post.id === postId) {
          op = post;
          opNotFound = false;
        }
      });

      return op;
    }

    function getOriginalPostFromResponse(data) {
      var op = data[0].data.children[0].data;
      return {
        title: op.title,
        subreddit: op.subreddit,
        domain: op.domain,
        url: op.url,
        isSelfPost: op.is_self,
        authorFlairText: op.author_flair_text,
        selfText: op.selftext
      };
    }

    function isOpNotFoundInCache() {
      return $scope.op === null;
    }

    function indicateCommentsLoading() {
      $scope.loadingComments = true;
    }

    function indicateCommentsLoaded() {
      $scope.loadingComments = false;
    }

    function getSingleCommentFromResponse(data) {
      var comment = data.data;
      return {
        id: comment.id,
        author: comment.author,
        body: comment.body,
        authorFlairText: comment.author_flair_text,
        created: new Date(comment.created_utc * 1000),
        replies: getCommentsFromListing(comment.replies)
      };
    }

    function getCommentsFromResponse(data) {
      return getCommentsFromListing(data[1]);
    }

    function getCommentsFromListing(listing) {
      if (listing === '') {
        return '';
      }

      var listingComments = listing.data.children;
      var comments = [];
      angular.forEach(listingComments, function (comment) {
        if (comment.kind === 't1') {
          comments.push(getSingleCommentFromResponse(comment));
        }
      });

      return comments;
    }

    function setOriginalPost(op) {
      $scope.op = op;

      if (op === null) {
        return;
      }

      Page.setTitle(op.title);
      $scope.subredditUrl = 'http://www.reddit.com/r/' + op.subreddit;
    }

    $scope.autoRefresh = true;
    $scope.toggleAutoRefresh = toggleAutoRefresh;

    indicateCommentsLoading();
    setOriginalPost(getOriginalPostFromCache($routeParams.id));
    loadLatestComments();
    $scope.$on('$destroy', function () {
      cancelAutoRefreshCommentsTimer();
    });
  }
);
