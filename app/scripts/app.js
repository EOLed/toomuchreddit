'use strict';

angular.module('tmrApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/r/:subreddit/comments/:id/:slug', {
        templateUrl: 'views/comments.html',
        controller: 'CommentsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
