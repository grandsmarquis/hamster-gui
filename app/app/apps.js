'use strict';

angular.module('hamster.apps', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/apps', {
    templateUrl: 'app/apps.html',
    controller: 'AppsCtrl'
  });
}])

.controller('AppsCtrl', function($scope, $http, $rootScope, $location, ApiService) {
  $scope.init = function () {
    console.log($rootScope.key);
  $http.get(ApiService.getUrl() + 'apps.json?token=' + $rootScope.key).
    success(function(data, status, headers, config) {
        console.log(data);
        $rootScope.apps = data.apps;
    }).
    error(function(data, status, headers, config) {
        console.log(data);
    });
};

  $scope.init();
});
