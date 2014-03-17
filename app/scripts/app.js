'use strict';

angular.module('LocalStorageModule').value('prefix', 'tmr');
angular.module('tmrApp',
      ['ngCookies','ngResource', 'ngSanitize', 'ngRoute', 'LocalStorageModule', 'achan.snuownd',
       'angularMoment', 'achan.previewer'])
  .config(function ($routeProvider, localStorageServiceProvider, $locationProvider) {
    $routeProvider.when('/r/:subreddit/comments/:id/:slug', {
      templateUrl: 'views/comments.html',
      controller: 'CommentsCtrl'
    }).when('/', {
      templateUrl: 'views/index.html',
      controller: 'PageCtrl',
      resolve: {
        pageInfo: function () {
          return {
            title: 'This is the title'
          };
        }
      }
    }).when('/r/all', {
      templateUrl: 'views/listing.html',
      controller: 'ListingCtrl'
    }).when('/r/:subreddit', {
      templateUrl: 'views/subreddit.html',
      controller: 'ListingCtrl',
    }).otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true).hashPrefix('!');

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
