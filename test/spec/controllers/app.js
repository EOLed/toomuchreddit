'use strict';

describe('Controller: AppCtrl', function () {

  // load the controller's module
  beforeEach(module('tmrApp'));

  var AppCtrl, scope, Page;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _Page_) {
    scope = $rootScope.$new();
    Page = _Page_;
    AppCtrl = $controller('AppCtrl', {
      $scope: scope
    });
  }));

  it('attaches the Page service to scope', function () {
    expect(scope.Page).toEqual(Page);
  });
});
