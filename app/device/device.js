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
    $scope.appkey = $routeParams.appkey;
  $http.get(ApiService.getUrl() + 'devices.json?token=' + $rootScope.key + '&app_key=' + $routeParams.appkey + '&device_key=' + $routeParams.devicekey).
    success(function(data, status, headers, config) {
        console.log(data);
        $scope.device = data;
        $scope.device.datatype = JSON.parse($scope.device.datatype);
        console.log($scope.device.datatype);
    }).
    error(function(data, status, headers, config) {
        console.log(data);
    });


    $http.get(ApiService.getUrl() + 'fetch.json?token=' + $rootScope.key + '&app_key=' + $routeParams.appkey + '&device_key=' + $routeParams.devicekey + '&value=temperature').
      success(function(data, status, headers, config) {
          console.log(data);
          $scope.temperature = data.temperature;
          $scope.chartObject = {};

          var arrayLength = data.temperature.length;
          $scope.rows = [];

          for (var i = 0; i < arrayLength; i++) {
            console.log(data.temperature[i]);
            $scope.rows[i] = {c : [ {v: new Date(data.temperature[i].time * 1000)}, {v:data.temperature[i].value} ]};
          }

          $scope.chartObject.data = {"cols": [
          {id: "t", label: "Time", type: "date"},
          {id: "s", label: "Degrees", type: "number"}
          ], "rows": $scope.rows};


          $scope.chartObject.type = 'LineChart';
          $scope.chartObject.options = {};
          $scope.chartObject.options.explorer = {

          };


      }).
      error(function(data, status, headers, config) {
          console.log(data);
      });
};

  $scope.init();
});
