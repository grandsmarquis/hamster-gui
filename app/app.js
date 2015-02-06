'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
'ngRoute',
'ngCookies',
'ngClipboard',
'myApp.view1',
'myApp.view2',
'hamster.signin',
'hamster.login',
'hamster.dashboard',
'hamster.apps',
'hamster.app',
'hamster.appcreate',
'hamster.devices',
'hamster.device',
'hamster.devicecreate'

])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/login'});
}]);

app.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
]);

app.config(['ngClipProvider', function(ngClipProvider) {
    ngClipProvider.setPath("bower_components/zeroclipboard/dist/ZeroClipboard.swf");
}]);

app.service('ApiService', function(){
  this.getUrl = function() { return "http://hamster-api.herokuapp.com/"; };
});

app.service('LoginService', function($cookieStore, $rootScope){


  this.putInfo = function(email, key) {
    $cookieStore.put('mail', String(email));
    $cookieStore.put('key', String(key));
    this.update(this);
  };

  this.getMail = function() {
    return ($cookieStore.get('mail'));;
  };


  this.getKey = function() {
    return $cookieStore.get('key');
  };

  this.isConnected = function() {
    return ((this.getMail())? this.getMail() !== 'undefined' : false);
  };

  this.update = function(login) {
    console.log('apply');
    $rootScope.mail = login.getMail();
    console.log('key == ' + login.getMail());
    $rootScope.key = login.getKey();
    $rootScope.connected = login.isConnected();
  };
});

app.run(function($rootScope, LoginService, $location)
{
  $rootScope.logout = function() { LoginService.putInfo('', ''); $location.path('/login')}
  console.log($rootScope.logout);
  LoginService.update(LoginService);
});
