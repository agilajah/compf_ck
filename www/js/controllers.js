var header = {};

angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('LoginCtrl', function($scope, $state) {
  $scope.$parent.showheader = false;

  $scope.daftar = function(){
    $state.go('register');
  }

  $scope.login = function(){
    $state.go('dashboard');
  }

})

.controller('RegisterCtrl', function($scope, $ionicHistory){
  $scope.$parent.showheader = true;
  $scope.$parent.headertext = "Register";
  $scope.$parent.left_show = true;
  $scope.$parent.left_icon = "ion-ios-arrow-left";
  $scope.$parent.left_text = "Kembali";
  $scope.$parent.left_click = function(){
    $scope.$parent.showheader = false;
    $ionicHistory.goBack();
  }
})

.controller('DashboardCtrl', function($scope, $state) {
});
