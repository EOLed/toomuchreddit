'use strict';

angular.module('tmrApp').controller('CommentsCtrl', function ($scope, $routeParams, $http) {
  function getCommentsJsonPermalink() {
    return 'http://reddit.com/' + getCommentsPermalink() + '.json?jsonp=JSON_CALLBACK';
  }

  function getCommentsPermalink() {
    return 'r/' + $routeParams.subreddit + '/comments/' + $routeParams.id + '/' +
      $routeParams.slug;
  }

  function sendToServer(data) {
    return $http.post('http://toomuchreddit.com/comments', data);
  }

  $http.jsonp(getCommentsJsonPermalink())
    .success(function (data) {
      sendToServer(data);
    }).error(function () {
      console.log('could not send comments to toomuchreddit.com');
    }
  );
});
