// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider


  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('register', {
    url: '/register',
    templateUrl: 'templates/registrasi.html',
    controller: 'RegisterCtrl'
  })


  .state('search', {
    url: '/search',
    templateUrl: 'templates/search.html',
    controller: 'SearchCtrl'
  })

  .state('notifikasi', {
    url: '/notifikasi',
    templateUrl: 'templates/notifikasi.html',
    controller: 'NotifikasiCtrl'
  })

  .state('chat', {
    url: '/chat',
    templateUrl: 'templates/chat.html',
    controller: 'ChatCtrl'
  })



   // SETTING 
  .state('setting_profile', {
    url: '/setting_profile',
    templateUrl: 'templates/setting_profile.html',
    controller: 'SettingProfileCtrl'
  })

  .state('setting_notifikasi', {
    url: '/setting_notifikasi',
    templateUrl: 'templates/setting_notifikasi.html',
    controller: 'SettingNotifikasiCtrl'
  })

  .state('setting_bantuan', {
    url: '/setting_bantuan',
    templateUrl: 'templates/setting_bantuan.html',
    controller: 'SettingBantuanCtrl'
  })

  .state('setting_tentang', {
    url: '/setting_tentang',
    templateUrl: 'templates/setting_tentang.html',
    controller: 'SettingTentangCtrl'
  })

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/dashboard.html',
    controller: 'TabCtrl'
  })

  .state('tab.t_dashboard', {
    url: "/t_dashboard",
    views: {
      'dashboard-tab': {
        templateUrl: "templates/t_dashboard.html",
        controller: 'DashboardTabCtrl'
      }
    }
  })

  .state('tab.t_profile', {
    url: "/t_profile",
    views: {
      'profile-tab': {
        templateUrl: "templates/t_profile.html",
        controller: 'ProfileTabCtrl'
      }
    }
  })
  .state('tab.t_messages', {
    url: "/t_messages",
    views: {
      'messages-tab': {
        templateUrl: "templates/t_messages.html",
        controller: 'MessagesTabCtrl'
      }
    }
  })
  .state('tab.t_settings', {
    url: "/t_settings",
    views: {
      'settings-tab': {
        templateUrl: "templates/t_settings.html",
        controller: 'SettingsTabCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
