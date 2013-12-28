'use strict';

angular.module('tmrApp').directive('comment', function (recursionHelper) {
  return {
    templateUrl: 'views/directives/comment.html',
    restrict: 'E',
    scope: {
      'comment': '='
    },
    compile: function (element) {
      return recursionHelper.compile(element);
    }
  };
});
