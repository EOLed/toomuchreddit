'use strict';

describe('Service: Page', function () {

  // load the service's module
  beforeEach(module('tmrApp'));

  var Page;
  beforeEach(inject(function (_Page_) {
    Page = _Page_;
  }));

  it('has a default title of "real-time reddit"', function () {
    expect(Page.getTitle()).toEqual('real-time reddit');
  });

  describe('setTitle', function () {
    it('changes the title to the one provided', function () {
      Page.setTitle('new title');
      expect(Page.getTitle()).toEqual('new title');
    });
  });
});
