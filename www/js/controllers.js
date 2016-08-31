var backDefault;
angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state, $rootScope) {
  backDefault = $rootScope.$ionicGoBack;
  $rootScope.header_bar = false;
  $rootScope.button_top_tab = false;
  $scope.daftar = function(){
    $state.go('register');
    $rootScope.header_bar = true;
  }
  $scope.login = function(){
    $state.go('tab.t_dashboard');
    $rootScope.header_bar = true;
    $rootScope.button_top_tab = true;
  }
})

.controller('RegisterCtrl', function($scope, $ionicHistory, $rootScope){
  $rootScope.$ionicGoBack = function(){
    backDefault();
    $rootScope.header_bar = false;
  }
})

.controller('TabCtrl', function($rootScope, $scope, $state) {
})

.controller('SearchCtrl', function($rootScope, $scope, $state, $ionicHistory) {
  $scope.nav_button_back = function(){
    backDefault();
  }
})

.controller('DashboardTabCtrl', function($rootScope, $scope, $state) {
})

.controller('ProfileTabCtrl', function($rootScope, $scope, $state) {
  $scope.nav_button_search = function(){
    $state.go('search');
  }
})

.controller('MessagesTabCtrl', function($rootScope, $scope, $state) {
})

.controller('SettingsTabCtrl', function($rootScope, $scope, $state) {
});
