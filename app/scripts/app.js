'use strict';

angular.module('LocalStorageModule').value('prefix', 'tmr');
angular.module('tmrApp',
      ['ngCookies','ngResource', 'ngSanitize', 'ngRoute', 'LocalStorageModule', 'achan.snuownd',
          'angularMoment', 'achan.previewer'])
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
  }).run(function ($window) {
    var customDateFormats = {
      future: '%s',
      past: '%s',
      s: '%ds',
      ss: '%ds',
      m: '%dm',
      mm: '%dm',
      h: '%dh',
      hh: '%dh',
      d: '%dd',
      dd: '%dd',
      M: '%dm',
      MM: '%dm',
      y: '%dy',
      yy: '%dy'
    };

    $window.moment.lang('en', { relativeTime:  customDateFormats });
  });
