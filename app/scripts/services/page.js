'use strict';

angular.module('tmrApp').factory('Page', function () {
  var title = 'real-time reddit';

  function getTitle() {
    return title;
  }

  function setTitle(newTitle) {
    title = newTitle;
  }

  return {
    getTitle: getTitle,
    setTitle: setTitle
  };
});
