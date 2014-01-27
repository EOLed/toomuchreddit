/* jshint camelcase: false */
'use strict';

describe('Service: redditResponseService', function () {

  // load the service's module
  beforeEach(module('tmrApp'));
  var commentListing = [{
    kind: 'Listing',
    data: {
      children: [{
        data: {
          domain: 'nba.com',
          subreddit: 'nba',
          id: '1t',
          url: 'http://nba.com/news',
          author: 'magnanamos',
          subreddit_id: 't5_2fwo',
          title: 'test title',
          is_self: false,
          author_flair_text: 'Raptors',
          created_utc: 1387762489,
          selftext: 'this is the op'
        }
      }]
    }
  }, {
    kind: 'Listing',
    data: {
      children: [{
        kind: 't1',
        data: {
          id: 'ce31a',
          author: 'mrlamb',
          subreddit: 'nba',
          body: 'test body',
          author_flair_text: 'Raptors',
          created_utc: 1387712489,
          replies: {
            kind: 'Listing',
            data: {
              children: [{
                kind: 't1',
                data: {
                  id: '1234',
                  author: 'replier',
                  subreddit: 'nba',
                  body: 'my response',
                  author_flair_text: 'Celtics',
                  created_utc: 1387812489,
                  replies: ''
                }
              }]
            }
          }
        }
      }, {
        kind: 't1',
        data: {
          id: 'ce1a',
          author: 'magnanamos',
          subreddit: 'nba',
          body: 'test again',
          author_flair_text: null,
          created_utc: 1387722489,
          replies: ''
        }
      }, {
        kind: 'more',
        data: {
          id: 'ssce1a'
        }
      }]
    }
  }];

  // instantiate service
  var redditResponseService;
  beforeEach(inject(function (_redditResponseService_) {
    redditResponseService  = _redditResponseService_;
  }));

  function createListing(title, subreddit, domain, url, selfPost, authorFlair, selfText) {
    commentListing[0].data.children[0].data.title = title;
    commentListing[0].data.children[0].data.subreddit = subreddit;
    commentListing[0].data.children[0].data.domain = domain;
    commentListing[0].data.children[0].data.url = url;
    commentListing[0].data.children[0].data.is_self = selfPost;
    commentListing[0].data.children[0].data.author_flair_text = authorFlair;
    commentListing[0].data.children[0].data.selftext = selfText;

    return commentListing;
  }

  function createOp(title, subreddit, domain, url, selfPost, authorFlair, selfText) {
    return {
      title: title,
      subreddit: subreddit,
      domain: domain,
      url: url,
      isSelfPost: selfPost,
      authorFlairText: authorFlair,
      selfText: selfText
    };
  }

  describe('getOriginalPost()', function () {
    it('converts response into a domain object', function () {
      var listing = createListing('my title', 'nba', 'nba.com', 'http://nba.com', false, 'My Flair',
                                  '');
      var expected = createOp('my title', 'nba', 'nba.com', 'http://nba.com', false, 'My Flair',
                              '');
      expect(redditResponseService.getOriginalPost(listing)).toEqual(expected);
    });
  });
});
