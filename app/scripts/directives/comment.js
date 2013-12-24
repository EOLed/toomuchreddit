'use strict';

angular.module('tmrApp').directive('comment', function () {
  return {
    templateUrl: 'views/directives/comment.html',
    restrict: 'E',
    scope: {
      'comment': '='
    },
    link: function () {
    }
  };
});
