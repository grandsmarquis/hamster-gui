'use strict';

angular.module('hamster.signin', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/signin', {
    templateUrl: 'user/signin.html',
    controller: 'SigninCtrl'
  });
}])

.controller('SigninCtrl', function($rootScope, $scope, $http, $location, ApiService, LoginService) {
  $scope.submit = function()
  {
    console.log(passwordrepeat);
    $http.post(ApiService.getUrl() + 'users.json', {"user" : {"email" : email.value, "password" : password.value, "password_confirmation" : passwordrepeat.value}}).
      success(function(data, status, headers, config) {
          LoginService.putInfo(data.email,data.token);
          $location.path('/dashboard');
      }).
      error(function(data, status, headers, config) {
          console.log(data);
      });

  };
});
