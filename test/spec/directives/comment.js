'use strict';

describe('Directive: comment', function () {

  // load the directive's module
  beforeEach(module('tmrApp'));
  beforeEach(module('views/directives/comment.html'));

  var element, scope;

  function expectCommentOutput() {
    it('renders the comment username', function () {
      expect(element.text().indexOf('achan')).toBeGreaterThan(-1);
    });

    it('renders the comment author flair text', function () {
      expect(element.text().indexOf('Raptors')).toBeGreaterThan(-1);
    });

    it('renders the created time in relative time', function () {
      expect(element.text().indexOf('3m')).toBeGreaterThan(-1);
    });

    it('converts body markdown into html', function () {
      expect(element.html().indexOf('<p><strong>hello</strong></p>')).toBeGreaterThan(-1);
    });
  }

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
    scope.comment = {
      author: 'achan',
      authorFlairText: 'Raptors',
      created: new Date(new Date().getTime() - 3 * 60 * 1000),
      body: '**hello**',
      replies: []
    };
    scope.op = { author: 'magnanamos' };
    element = angular.element('<comment comment="comment" op="op.author"></comment>');
  }));

  describe('comment is by OP', function () {
    beforeEach(inject(function($compile) {
      scope.op.author = 'achan';
      element = $compile(element)(scope);
      scope.$digest();
    }));

    expectCommentOutput();

    it('adds "op" style to author link', function () {
      expect(angular.element(element).find('a').hasClass('op')).toBeTruthy();
    });
  });

  describe('reply is from OP', function () {
    beforeEach(inject(function($compile) {
      scope.comment.replies = [{
        author: 'magnanamos',
        authorFlairText: 'Raptors',
        created: new Date(new Date().getTime() - 3 * 60 * 1000),
        body: '**hello**',
        replies: []
      }];

      element = $compile(element)(scope);
      scope.$digest();
    }));

    expectCommentOutput();

    it('adds "op" style to author link', function () {
      expect(angular.element(element).find('a').eq(1).hasClass('op')).toBeTruthy();
    });
  });

  describe('comment is not by OP', function () {
    beforeEach(inject(function($compile) {
      element = $compile(element)(scope);
      scope.$digest();
    }));

    expectCommentOutput();

    it('does not add "op" style to author link', function () {
      expect(angular.element(element).find('a').hasClass('op')).toBeFalsy();
    });
  });

  describe('reply is not from OP', function () {
    beforeEach(inject(function($compile) {
      scope.comment.replies = [{
        author: 'achan',
        authorFlairText: 'Raptors',
        created: new Date(new Date().getTime() - 3 * 60 * 1000),
        body: '**hello**',
        replies: []
      }];

      element = $compile(element)(scope);
      scope.$digest();
    }));

    expectCommentOutput();

    it('does not add "op" style to author link', function () {
      expect(angular.element(element).find('a').eq(1).hasClass('op')).toBeFalsy();
    });
  });
});
