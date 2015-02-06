'use strict';

angular.module('hamster.devices', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/devices/', {
    templateUrl: 'device/devices.html',
    controller: 'DevicesCtrl'
  });
}])

.controller('DevicesCtrl', function($scope, $http, $rootScope, $location, $routeParams, ApiService) {
  $scope.init = function () {
    console.log($rootScope.token);
  $http.get(ApiService.getUrl() + 'devices.json?token=' + $rootScope.key).
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
