'use strict';

describe('Directive: comment', function () {

  // load the directive's module
  beforeEach(module('tmrApp'));
  beforeEach(module('views/directives/comment.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();
    scope.comment = {
      author: 'achan',
      authorFlairText: 'Raptors',
      created: new Date(new Date().getTime() - 3 * 60 * 1000),
      body: '**hello**'
    };
    element = angular.element('<comment comment="comment"></comment>');
    element = $compile(element)(scope);
    scope.$digest();
  }));

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
});
