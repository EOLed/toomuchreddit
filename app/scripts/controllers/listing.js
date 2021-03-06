/* jshint camelcase: false */
'use strict';

angular.module('tmrApp').controller('ListingCtrl',
    function ($scope, $http, localStorageService, $routeParams, Page) {
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
      authorFlairText: data.author_flair_text,
      selfText: data.selftext
    };
  }

  function fetchListing(subreddit) {
    var subredditUrl = '';
    if (!isFrontPageListing()) {
      subredditUrl = 'r/' + subreddit;
    }

    return $http.jsonp('http://www.reddit.com/' + subredditUrl + '.json?jsonp=JSON_CALLBACK');
  }

  function isFrontPageListing() {
    return angular.isUndefined($routeParams.subreddit);
  }

  function updateTitle() {
    var title = isFrontPageListing() ? 'real-time reddit comments' : '/r/' + $routeParams.subreddit;
    Page.setTitle(title);
  }

  updateTitle();
  fetchListing($routeParams.subreddit).success(function (data) {
    var listing = getListingFromResponse(data);
    $scope.listing = listing;
    localStorageService.set('listing', listing);
  });
});
