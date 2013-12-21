/* jshint camelcase: false */
'use strict';

angular.module('tmrAppDev', ['tmrApp', 'ngMockE2E'])
       .run(function ($httpBackend) {
  var frontPageListing = {
    data: {
      children: [
        {
          data: {
            domain: 'bgr.com',
            subreddit: 'technology',
            id: '1tcabu',
            author: 'FOXBERRY',
            score: 4767,
            over_18: false,
            permalink: '/r/technology/comments/1tcabu/tmobiles_next_move_could_be_devastating_for_att/',
            created: 1387593435,
            url: 'http://bgr.com/2013/12/20/t-mobile-uncarrier-4-rumor',
            title: 'T-Mobile’s next move could be devastating for AT&amp;T and Verizon: Paying off subscribers’ early termination fees if they switch from a rival carrier.',
            num_comments: 1577,
            visited: false
          }
        },
        {
          data: {
            domain: 'self.Christianity',
            subreddit: 'Christianity',
            id: '3jds93',
            author: 'magnanamos',
            score: 1337,
            over_18: false,
            permalink: '/r/Christianity/comments/3jds93/the_most_wise_thing_ive_heard_about_the_duck/',
            created: 1387293435,
            url: 'http://www.reddit.com/r/Christianity/comments/1tbbe5/the_most_wise_thing_ive_heard_about_the_duck/',
            title: 'The most wise thing I\'ve heard about the Duck Dynasty issue.',
            num_comments: 123,
            visited: false
          }
        },
        {
          data: {
            domain: 'i.imgur.com',
            subreddit: 'Coffee',
            id: '224bu',
            author: 'sebash',
            score: 31,
            over_18: false,
            permalink: '/r/Coffee/comments/224bu/amazing_hawaiian_coffee_menu/',
            created: 1386593435,
            url: 'http://i.imgur.com/CF5GbTZ.jpg',
            title: 'Amazing Hawaiian Coffee Menu',
            num_comments: 21,
            visited: false
          }
        }
      ]
    }
  };

  $httpBackend.whenGET(/^views\//).passThrough();
  $httpBackend.whenPOST(/^\/comments$/).respond(200);
  $httpBackend.whenJSONP('http://reddit.com/.json?jsonp=JSON_CALLBACK').respond(frontPageListing);
  $httpBackend.whenJSONP(/.*/).respond(

  [{'kind': 'Listing', 'data': {'modhash': 'f2meyy0s9vab285adae21ec50c425c86e645086962cc006a03', 'children': [{'kind': 't3', 'data': {'domain': 'idc.com', 'banned_by': null, 'media_embed': {}, 'subreddit': 'programming', 'selftext_html': null, 'selftext': '', 'likes': null, 'secure_media': null, 'link_flair_text': null, 'id': '1tcgez', 'secure_media_embed': {}, 'clicked': false, 'stickied': false, 'author': 'surfersbeware', 'media': null, 'score': 1, 'approved_by': null, 'over_18': false, 'hidden': false, 'thumbnail': '', 'subreddit_id': 't5_2fwo', 'edited': false, 'link_flair_css_class': null, 'author_flair_css_class': null, 'downs': 1, 'saved': false, 'is_self': false, 'permalink': '/r/programming/comments/1tcgez/according_to_this_current_idc_study_about_40_of/', 'name': 't3_1tcgez', 'created': 1387597703.0, 'url': 'http://www.idc.com/getdoc.jsp?containerId=244709', 'author_flair_text': null, 'title': 'According to this current IDC study, about 40% of developers are hobbyists.', 'created_utc': 1387568903.0, 'ups': 2, 'num_comments': 2, 'visited': false, 'num_reports': null, 'distinguished': null}}], 'after': null, 'before': null}}, {'kind': 'Listing', 'data': {'modhash': 'f2meyy0s9vab285adae21ec50c425c86e645086962cc006a03', 'children': [{'kind': 't1', 'data': {'subreddit_id': 't5_2fwo', 'banned_by': null, 'subreddit': 'programming', 'likes': null, 'replies': {'kind': 'Listing', 'data': {'modhash': 'f2meyy0s9vab285adae21ec50c425c86e645086962cc006a03', 'children': [{'kind': 't1', 'data': {'subreddit_id': 't5_2fwo', 'banned_by': null, 'subreddit': 'programming', 'likes': null, 'replies': '', 'saved': false, 'id': 'ce6jzq2', 'gilded': 0, 'author': 'surfersbeware', 'parent_id': 't1_ce6jiye', 'approved_by': null, 'body': 'You\'re right, maybe the wording of my title is a little bit ... off.\n\nAccording to the study, there are about 11 million professional programmers. Additionally, there are 7.5 million hobby programmers, which brings us to a total of 18,5 million developers.', 'edited': false, 'author_flair_css_class': null, 'downs': 0, 'body_html': '&lt;div class=\"md\"&gt;&lt;p&gt;You&amp;#39;re right, maybe the wording of my title is a little bit ... off.&lt;/p&gt;\n\n&lt;p&gt;According to the study, there are about 11 million professional programmers. Additionally, there are 7.5 million hobby programmers, which brings us to a total of 18,5 million developers.&lt;/p&gt;\n&lt;/div&gt;', 'link_id': 't3_1tcgez', 'score_hidden': false, 'name': 't1_ce6jzq2', 'created': 1387599248.0, 'author_flair_text': null, 'created_utc': 1387570448.0, 'distinguished': null, 'num_reports': null, 'ups': 1}}], 'after': null, 'before': null}}, 'saved': false, 'id': 'ce6jiye', 'gilded': 0, 'author': 'comosayllama', 'parent_id': 't3_1tcgez', 'approved_by': null, 'body': 'So that means what exactly? I\'d have guessed that 100% of developers are hobbyists.\n\nDo they mean 60% are employed as developers, the rest just sort of \"are doing it without pay\"?', 'edited': false, 'author_flair_css_class': null, 'downs': 0, 'body_html': '&lt;div class=\"md\"&gt;&lt;p&gt;So that means what exactly? I&amp;#39;d have guessed that 100% of developers are hobbyists.&lt;/p&gt;\n\n&lt;p&gt;Do they mean 60% are employed as developers, the rest just sort of &amp;quot;are doing it without pay&amp;quot;?&lt;/p&gt;\n&lt;/div&gt;', 'link_id': 't3_1tcgez', 'score_hidden': false, 'name': 't1_ce6jiye', 'created': 1387598153.0, 'author_flair_text': null, 'created_utc': 1387569353.0, 'distinguished': null, 'num_reports': null, 'ups': 3}}], 'after': null, 'before': null}}]
  );
});
