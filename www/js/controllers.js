var header = {};

angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state) {

  $scope.daftar = function(){
    $state.go('register');
  }

  $scope.login = function(){
    $state.go('tab.t_dashboard');
  }

})

.controller('RegisterCtrl', function($scope, $ionicHistory){
})


.controller('DashboardTabCtrl', function($scope, $state) {
})
.controller('ProfileTabCtrl', function($scope, $state) {
})
.controller('MessagesTabCtrl', function($scope, $state) {
})
.controller('SettingsTabCtrl', function($scope, $state) {
});
