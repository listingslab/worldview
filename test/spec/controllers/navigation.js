'use strict';

describe('Controller: NavigationctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('worldviewApp'));

  var NavigationctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NavigationctrlCtrl = $controller('NavigationctrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(NavigationctrlCtrl.awesomeThings.length).toBe(3);
  });
});
