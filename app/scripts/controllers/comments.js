'use strict';

angular.module('tmrApp')
  .controller('CommentsCtrl', function ($scope, $routeParams, $http, localStorageService) {
    function getCommentsApiPermalink() {
      return 'http://reddit.com/' + getCommentsPermalink() + '.json?jsonp=JSON_CALLBACK';
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
        domain: op.domain
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

    indicateCommentsLoading();
    $scope.op = getOriginalPostFromCache($routeParams.id);
    $http.jsonp(getCommentsApiPermalink()).success(function (data) {
      if (isOpNotFoundInCache()) {
        $scope.op = getOriginalPostFromResponse(data);
      }

      indicateCommentsLoaded();
      sendToServer(data);
    }).error(function () {
      indicateCommentsLoaded();
      console.log('could not send comments to toomuchreddit.com');
    });
  }
);
