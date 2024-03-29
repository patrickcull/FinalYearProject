// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    //Check if the user has already logged in.
    var username = window.localStorage.getItem("uname");
    if(username == null || username == ""){
      $state.go('login');
    }
  });
})


//Ensures the interface is consistent across multiple platforms.
.config(['$ionicConfigProvider', function($ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom'); //other values: top
  $ionicConfigProvider.navBar.alignTitle('center');

}])

//Whitelist the devices file system for access to photos.
.config(function($compileProvider){
$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file|blob|cdvfile|content):|data:image\//);
})

.config(function($stateProvider, $urlRouterProvider) {


  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:
    .state('tab.dash', {
      cache: false,
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash.html',
          controller: 'DashCtrl'
        }
      }
    })

    .state('login',{
        cache: false,
        url:'/login',
        templateUrl:'templates/login.html',
        controller: 'LoginCtrl'
    })

    .state('create',{
        cache: false,
        url:'/signup',
        templateUrl:'templates/signup.html',
        controller: 'CreateCtrl'
    })

    .state('tab.camera', {
      cache: false,
      url: '/camera',
      views: {
        'tab-camera': {
          templateUrl: 'templates/tab-camera.html',
          controller: 'CamCtrl'
        }
      }
    })

    .state('tab.upload', {
      cache: false,
      url: '/camera/upload/?latlng',
      views: {
        'tab-camera': {
          templateUrl: 'templates/tab-upload.html',
          controller: 'UploadCtrl'
        }
      }
    })

    .state('tab.createPin', {
      cache: false,
      url: '/camera/upload/map',
      views: {
        'tab-camera': {
          templateUrl: 'templates/tab-createPin.html',
          controller: 'CreatePinCtrl'
        }
      }
    })

    .state('tab.friends', {
      cache: false,
      url: '/friends',
      views: {
        'tab-friends': {
          templateUrl: 'templates/tab-friends.html',
          controller: 'FriendsCtrl'
        }
      }
    })

    .state('tab.friend-detail', {
      url: '/friend/:fname',
      views: {
        'tab-friends': {
          templateUrl: 'templates/friend-detail.html',
          controller: 'FriendDetailCtrl'
        }
      }
    })

    .state('tab.group-detail', {
      url: '/group/:GID?gname',
      views: {
        'tab-groups': {
          templateUrl: 'templates/group-detail.html',
          controller: 'GroupDetailCtrl'
        }
      }
    })

    .state('tab.groups', {
      cache: false,
      url: '/groups',
      views: {
        'tab-groups': {
          templateUrl: 'templates/tab-groups.html',
          controller: 'GroupsCtrl'
        }
      }
    })

    .state('tab.account', {
      cache: false,
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
    })

    .state('tab.user', {
      url: '/account/pictures',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-user.html',
          controller: 'UserCtrl'
        }
      }
    });



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});

