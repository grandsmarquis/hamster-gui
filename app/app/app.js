'use strict';

angular.module('hamster.app', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/app/:apptoken', {
    templateUrl: 'app/app.html',
    controller: 'AppCtrl'
  });
}])

.controller('AppCtrl', function($scope, $http, $rootScope, $location, $routeParams, ApiService) {
  $scope.init = function () {
    console.log($rootScope.token);
  $http.get(ApiService.getUrl() + 'apps.json?token=' + $rootScope.key + '&app_key=' + $routeParams.apptoken).
    success(function(data, status, headers, config) {
        console.log(data);
        $scope.app = data.app;
        console.log($scope.app);
    }).
    error(function(data, status, headers, config) {
        console.log(data);
    });
};

  $scope.init();
});
