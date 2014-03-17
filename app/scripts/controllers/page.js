'use strict';

angular.module('tmrApp').controller('PageCtrl', function ($scope, pageInfo, Page) {
  Page.setTitle(pageInfo.title);
});
