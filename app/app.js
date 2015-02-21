'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
'ngRoute',
'ngCookies',
'ngClipboard',
'calHeatmap',
'nvd3ChartDirectives',
'googlechart',
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

app.service('ApiService', function($http){
  this.getUrl = function() { return "http://hamster-api.herokuapp.com/"; };

  this.getDeviceDatatype = function($scope, device, key, appkey, devicekey, trigger)
  {
    $http.get(this.getUrl() + 'devices.json?token=' + key + '&app_key=' + appkey + '&device_key=' + devicekey).
    success(function(data, status, headers, config) {
      device.name = data.name;
      device.device_key = data.device_key;
      device.datatype = JSON.parse(data.datatype);
      console.log(device.datatype);
      if (trigger != null)
      {
        trigger(device);
      }
    }).
    error(function(data, status, headers, config) {
      console.log("ERROR" + data);
    });
  };

  this.getDay = function($scope, device, key, appkey, devicekey, from, to, trigger)
  {
    $http.get(this.getUrl() + 'fetch.json?token=' + key + '&app_key=' + appkey + '&device_key=' + devicekey + '&groupby=day&from=' + from + '&to=' + to).
    success(function(data, status, headers, config) {
      device.day_datas = data;
      if (trigger)
      {
        trigger($scope, data)
      }
}).
error(function(data, status, headers, config) {
  console.log(data);
});
}


  this.getDeviceDataByDay = function($scope, device, key, appkey, devicekey, trigger)
  {
    console.log(this.getUrl() + 'fetch.json?token=' + key + '&app_key=' + appkey + '&device_key=' + devicekey + '&groupby=day')
    $http.get(this.getUrl() + 'fetch.json?token=' + key + '&app_key=' + appkey + '&device_key=' + devicekey + '&groupby=day').
    success(function(data, status, headers, config) {
      console.log(data);
      device.days = [];
      for (var datatypesindex in data.data) {
        var datatypes = data.data[datatypesindex];
        for (var dayindex in datatypes)
        {
          var day = datatypes[dayindex]
          if (device.days["" + day.from])
          {
            device.days["" + day.from] += day.data_count
          }
          else
          {
            device.days["" + day.from] = day.data_count
          }
        }
      }
      console.log(device.days);
      if (trigger)
      {
        trigger($scope)
      }

}).
error(function(data, status, headers, config) {
  console.log(data);
});
}

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
