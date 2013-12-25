/* jshint camelcase: false */
'use strict';

angular.module('tmrApp').controller('MainCtrl', function ($scope, $http, localStorageService) {
  function getListingFromResponse(data) {
    var listing = [],
        apiListing = data.data.children;

    angular.forEach(apiListing, function (value) {
      listing.push(getPostFromResponse(value.data));
    });

    return listing;
  }

  function getPostFromResponse(data) {
    return {
      id: data.id,
      domain: data.domain,
      subreddit: data.subreddit,
      author: data.author,
      score: data.score,
      over18: data.over_18,
      permalink: data.permalink,
      created: data.created,
      url: data.url,
      title: data.title,
      numComments: data.num_comments,
      visited: data.visited,
      isSelfPost: data.is_self,
      authorFlairText: data.author_flair_text
    };
  }

  $http.jsonp('http://www.reddit.com/.json?jsonp=JSON_CALLBACK').success(function (data) {
    var listing = getListingFromResponse(data);
    $scope.listing = listing;
    localStorageService.set('listing', listing);
  });
});
