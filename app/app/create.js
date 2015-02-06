'use strict';

angular.module('hamster.appcreate', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/appcreate', {
    templateUrl: 'app/create.html',
    controller: 'AppsCreateCtrl'
  });
}])

.controller('AppsCreateCtrl', function($scope, $http, $rootScope, $location, ApiService) {

  $scope.submit = function() {
    console.log($scope.appname);

    $http.post(ApiService.getUrl() + 'apps.json', {"app" : {"name" : $scope.appname}, "token" : $rootScope.key}).
      success(function(data, status, headers, config) {
          console.log(data);
          $rootScope.apps = data.apps;
          $location.path('/apps')
      }).
      error(function(data, status, headers, config) {
          console.log(data);
      });
    };


});
