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


    $http.get(ApiService.getUrl() + 'fetch.json?token=' + $rootScope.key + '&app_key=' + $routeParams.appkey + '&device_key=' + $routeParams.devicekey + '&groupby=day').
      success(function(data, status, headers, config) {
          console.log(data);
          $scope.temperature = data.temperature;
          $scope.chartObject = {};

          var arrayLength = data.data[0].temperature.length;
          $scope.rows = [];
          console.log("lol" + arrayLength);
          for (var i = 0; i < arrayLength; i++) {
console.log(data.data[0].temperature[i].from * 1000);

            var date = new Date(data.data[0].temperature[i].from * 1000);
            console.log(date);

            $scope.rows[i] = {c : [ {v: new Date(date.getFullYear(), date.getMonth(), date.getDate())}, {v:data.data[0].temperature[i].data_count} ]};
          }
        console.log($scope.rows);
          $scope.chartObject.data = {"cols": [
              {id: "date", label: "Date", type: "date", p : {}},
              {id: "pushes", label: "Pushes", type: "number", p:{}}
          ], "rows": $scope.rows};
          $scope.chartObject.type = 'Calendar';
          $scope.chartObject.options = {title: "Pushes by days"};
          $scope.chartObject.options.explorer = {

          };


      }).
      error(function(data, status, headers, config) {
          console.log(data);
      });
};

  $scope.init();
});
