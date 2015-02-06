'use strict';

angular.module('hamster.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'user/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', function($scope, $http, $rootScope, $location, ApiService, LoginService) {
$scope.submit = function() {
  $http.post(ApiService.getUrl() + 'sessions.json', {"session" : {"email" : email.value, "password" : password.value}}).
    success(function(data, status, headers, config) {
        LoginService.putInfo(data.email, data.token);
        $location.path('/dashboard')
    }).
    error(function(data, status, headers, config) {
        console.log(data);
    });
  };
  if (LoginService.isConnected())
  {
    $location.path('/dashboard');
  }

});
