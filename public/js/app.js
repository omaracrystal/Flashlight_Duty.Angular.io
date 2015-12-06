var app = angular.module("myApp", ["ngRoute"]);

  app.config(function($routeProvider) {
      $routeProvider
    //home page intro animation page
        .when('/', {
          templateUrl: '../partials/home.html',
          controller: 'homeController',
          access: {restricted: false}
        })
    //darkroom, play area page
        .when('/darkroom', {
          templateUrl: '../partials/darkroom.html',
          controller: 'darkroomController',
          access: {restricted: false}
        })
        .otherwise({
          redirectTo: '/',
          access: {restricted: false}
        });
  });



