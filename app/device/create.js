'use strict';

angular.module('hamster.devicecreate', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/devicecreate/:apptoken', {
    templateUrl: 'device/create.html',
    controller: 'DeviceCreateCtrl'
  });
}])

.controller('DeviceCreateCtrl', function($scope, $http, $rootScope, $location, $routeParams, ApiService) {
  $scope.datatype = {};

  $scope.current = {};

  $('select').material_select();

  $scope.add = function()
  {
    console.log($scope.current.type);
    if (!($scope.current.name && $scope.current.type))
    {
      alert("Please fill both fields");
    }
    else if ($scope.datatype[$scope.current.name])
    {
      alert("key already exists");
    }
    else
    {
      $scope.datatype[$scope.current.name] = $scope.current.type;
    }
  };

  $scope.remove = function(key)
  {
    console.log(key);
    delete $scope.datatype[key];
  };

  $scope.submit = function() {
    console.log($scope.devicename);
    console.log($scope.datatype);

    if (!($scope.devicename && $scope.datatype))
    {
      alert("Please complete all fields");
    } else
    {


    $http.post(ApiService.getUrl() + 'devices.json', {"device" : {"name" : $scope.devicename, "datatype": JSON.stringify($scope.datatype)}, "token" : $rootScope.key, "app_key" : $routeParams.apptoken}).
      success(function(data, status, headers, config) {
          console.log(data);
          $location.path('/device/' + $routeParams.apptoken + '/' + data.device_key);
      }).
      error(function(data, status, headers, config) {
          console.log(data);
      });
    };
  }

});
