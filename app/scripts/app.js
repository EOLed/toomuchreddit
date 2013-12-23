'use strict';

angular.module('LocalStorageModule').value('prefix', 'tmr');
angular.module('tmrApp',
  ['ngCookies','ngResource', 'ngSanitize', 'ngRoute', 'LocalStorageModule', 'achan.snuownd'])
    .config(function ($routeProvider, localStorageServiceProvider) {
      $routeProvider.when('/r/:subreddit/comments/:id/:slug', {
        templateUrl: 'views/comments.html',
        controller: 'CommentsCtrl'
      }).when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      }).otherwise({
        redirectTo: '/'
      });
      
      localStorageServiceProvider.prefix = 'tmr';
    }
);
