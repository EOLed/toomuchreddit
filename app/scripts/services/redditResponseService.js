/* jshint camelcase: false */
'use strict';

angular.module('tmrApp').service('redditResponseService', function () {
  function getOriginalPost(listing) {
    var op = listing[0].data.children[0].data;
    return {
      title: op.title,
      subreddit: op.subreddit,
      domain: op.domain,
      url: op.url,
      isSelfPost: op.is_self,
      authorFlairText: op.author_flair_text,
      selfText: op.selftext
    };
  }

  return {
    getOriginalPost: getOriginalPost
  };
});
