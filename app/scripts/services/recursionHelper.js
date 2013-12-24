'use strict';

/**
 * Helper for compiling recursive directives.
 * http://stackoverflow.com/a/18609594
 */
angular.module('tmrApp').factory('recursionHelper', function ($compile) {
  var RecursionHelper = {
    compile: function(element){
      var contents = element.contents().remove();
      var compiledContents;
      return function(scope, element){
        if (!compiledContents) {
          compiledContents = $compile(contents);
        }

        compiledContents(scope, function (clone) {
          element.append(clone);
        });
      };
    }
  };

  return RecursionHelper;
});
