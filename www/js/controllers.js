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

.controller('NotifikasiCtrl', function($rootScope, $scope, $state, $ionicHistory) {
  $scope.nav_button_back = function(){
    backDefault();
  }
})

.controller('ChatCtrl', function($rootScope, $scope, $state, $ionicHistory) {
  $scope.nav_button_back = function(){
    backDefault();
  }
})

.controller('DashboardTabCtrl', function($rootScope, $scope, $state) {
  $scope.nav_button_notifikasi = function(){
    $state.go('notifikasi');
  }
})

.controller('ProfileTabCtrl', function($rootScope, $scope, $state) {
  $scope.nav_button_search = function(){
    $state.go('search');
  }
  $scope.nav_button_notifikasi = function(){
    $state.go('notifikasi');
  }
})

.controller('MessagesTabCtrl', function($rootScope, $scope, $state) {
  $scope.nav_button_notifikasi = function(){
    $state.go('notifikasi');
  }
})

.controller('SettingsTabCtrl', function($rootScope, $scope, $state) {
})

.controller('SettingProfileCtrl', function($rootScope, $scope, $state) {
  $scope.nav_button_back = function(){
    backDefault();
  }
})

.controller('SettingNotifikasiCtrl', function($rootScope, $scope, $state) {
  $scope.nav_button_back = function(){
    backDefault();
  }
  $scope.updatex = function(){
    console.log($scope.datax);
  }
})

.controller('SettingBantuanCtrl', function($rootScope, $scope, $state) {
  $scope.nav_button_back = function(){
    backDefault();
  }
})

.controller('SettingTentangCtrl', function($rootScope, $scope, $state) {
  $scope.nav_button_back = function(){
    backDefault();
  }
})

.controller('PenawaranBaruCtrl', function($rootScope, $scope, $state) {
  $scope.nav_button_back = function(){
    backDefault();
  }
});
