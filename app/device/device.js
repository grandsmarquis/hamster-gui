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

    $scope.data = {};

    $scope.device = {};

    $scope.current_day = {};

    $scope.xAxisFormatFunction = function(){
      return function(d){
        console.log("lool")
        return d3.time.format('%H:%M:%S')(new Date(d)); //uncomment for date format
      }
    }

    $scope.selectType = function(value)
    {
      $scope.current_device = value;
      $scope.drawGraph();
    }

    $scope.drawGraph = function(data)
    {
      $scope.current_day.selected_data = [{}];
      $scope.current_day.selected_data[0].key = "values";
      $scope.current_day.selected_data[0].values = [];
      var i = 0;
      console.log($scope.device);
      for (var index in $scope.device.day_datas.data[$scope.current_device])
      {
        var val = $scope.device.day_datas.data[$scope.current_device][index];
        var date = new Date(val.time * 1000);
        $scope.current_day.selected_data[0].values.push([val.time * 1000 - 3600, val.value]);
        i++;
      }
    }



    console.log($rootScope.token);
    $scope.appkey = $routeParams.appkey;

    ApiService.getDeviceDatatype($scope, $scope.device, $rootScope.key, $routeParams.appkey, $routeParams.devicekey,
      function() {
        ApiService.getDeviceDataByDay($scope, $scope.device, $rootScope.key, $routeParams.appkey, $routeParams.devicekey,
          function($scope)
          {

            $scope.initCalendar();
          }
        );
      });
    };

    $scope.initCalendar = function()
    {
      $scope.cal = new CalHeatMap();
      $scope.cal.init({
        start: new Date(1423526400000),
        domain: "month",
        subDomain: "x_day",
        cellSize: 20,
        highlight: "now",
        considerMissingDataAsZero : true,
        cellPadding: 5,
        domainGutter: 20,
        subDomainTextFormat: "%d",
        data: $scope.device.days,
        onClick: $scope.cal.onClick,
        range: 1
      });
      $scope.cal.onClick = function(date, value)
      {
        var timestamp = date.getTime() / 1000 + 3600; //Check out GMT + 1!!!
        $scope.current_day = {};
        $scope.current_day.timestamp = timestamp;
        $scope.current_day.pushes = $scope.device.days[timestamp];
        console.log($scope.current_day);
        ApiService.getDay($scope, $scope.device, $rootScope.key, $routeParams.appkey, $routeParams.devicekey, timestamp, timestamp + 3600 * 24,
          function(s, data)
          {
            if ($scope.current_device)
            {
              $scope.drawGraph();
            }
            else
            {
              var first;
              console.log($scope.device)
              for (var i in $scope.device.datatype) {
                if ($scope.device.datatype.hasOwnProperty(i) && typeof(i) !== 'function') {
                  first = i
                  break;
                }
              }
              $scope.selectType(first);
            }
          }
        );
      }
    }

    $scope.init();
  });
