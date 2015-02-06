'use strict';

angular.module('hamster.devicecreate', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/devicecreate/:apptoken', {
    templateUrl: 'device/create.html',
    controller: 'DeviceCreateCtrl'
  });
}])

.controller('DeviceCreateCtrl', function($scope, $http, $rootScope, $location, $routeParams, ApiService) {

  $scope.submit = function() {
    console.log($scope.devicename);
    console.log($scope.datatype);

    $http.post(ApiService.getUrl() + 'devices.json', {"device" : {"name" : $scope.devicename, "datatype": {"temperature" : "int"}}, "token" : $rootScope.key, "app_key" : $routeParams.apptoken}).
      success(function(data, status, headers, config) {
          console.log(data);
          //$rootScope.apps = data.apps;
          //$location.path('/apps')
      }).
      error(function(data, status, headers, config) {
          console.log(data);
      });
    };

});
