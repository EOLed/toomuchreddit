'use strict';

describe('Controller: PageCtrl', function () {

  // load the controller's module
  beforeEach(module('tmrApp'));

  var PageCtrl, scope, Page, pageInfo;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _Page_) {
    scope = $rootScope.$new();
    Page = _Page_;

    pageInfo = { title: 'The title' };

    PageCtrl = $controller('PageCtrl', {
      $scope: scope,
      Page: Page,
      pageInfo: pageInfo
    });
  }));

  it('sets title to the title injected from pageInfo', function () {
    expect(Page.getTitle()).toEqual('The title');
  });
});
