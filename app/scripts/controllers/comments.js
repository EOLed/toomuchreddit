'use strict';

angular.module('tmrApp')
  .controller('CommentsCtrl', function ($scope, $routeParams, $http, localStorageService) {
    function getCommentsJsonPermalink() {
      return 'http://reddit.com/' + getCommentsPermalink() + '.json?jsonp=JSON_CALLBACK';
    }

    function getCommentsPermalink() {
      return 'r/' + $routeParams.subreddit + '/comments/' + $routeParams.id + '/' +
        $routeParams.slug;
    }

    function sendToServer(data) {
      return $http.post('/comments', data);
    }

    function getOriginalPostFromLocalStorage(postId) {
      var listing = localStorageService.get('listing');
      var opNotFound = true;
      var op;
      angular.forEach(listing, function (post) {
        if (opNotFound && post.id === postId) {
          op = post;
          opNotFound = false;
        }
      });

      return op;
    }

    $scope.op = getOriginalPostFromLocalStorage($routeParams.id);
    $http.jsonp(getCommentsJsonPermalink())
      .success(function (data) {
        sendToServer(data);
      }).error(function () {
        console.log('could not send comments to toomuchreddit.com');
      }
    );
  }
);
