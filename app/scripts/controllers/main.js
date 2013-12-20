/* jshint camelcase: false */
'use strict';

angular.module('tmrApp').controller('MainCtrl', function ($scope, $http) {
  function getListingFromResponse(data) {
    var listing = [], apiListing = data.data.children;
    angular.forEach(apiListing, function (value) {
      listing.push(getPostFromResponse(value.data));
    });

    return listing;
  }

  function getPostFromResponse(data) {
    return {
      domain: data.domain,
      subreddit: data.technology,
      author: data.author,
      score: data.score,
      over18: data.over_18,
      permalink: data.permalink,
      created: data.created,
      url: data.url,
      title: data.title,
      numComments: data.num_comments,
      visited: data.visited
    };
  }

  $http.jsonp('http://reddit.com/.json?jsonp=JSON_CALLBACK')
       .success(function (data) {
    $scope.listing = getListingFromResponse(data);
  });
});
