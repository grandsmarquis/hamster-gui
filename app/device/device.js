'use strict';

angular.module('hamster.device', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/device/:appkey/:devicekey', {
    templateUrl: 'device/device.html',
    controller: 'DeviceCtrl'
  });
}])

.controller('DeviceCtrl', function($scope, $http, $rootScope, $location, $routeParams, ApiService) {
  $scope.init = function () {
    console.log($rootScope.token);
  $http.get(ApiService.getUrl() + 'devices.json?token=' + $rootScope.key + '&app_key=' + $routeParams.appkey + '&device_key=' + $routeParams.devicekey).
    success(function(data, status, headers, config) {
        console.log(data);
        $scope.devices = data.devices;
    }).
    error(function(data, status, headers, config) {
        console.log(data);
    });
};

  $scope.init();
});
