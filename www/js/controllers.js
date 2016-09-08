var dump = [];
var backDefault;
var scopeChat;

var scopePointer = [];

var alamatServer = "http://localhost/"
var GLOBAL_ID;
var GLOBAL_USER = [];
var GLOBAL_VENDOR = [];

function makeEnum(){
  var o = new Object();
  var c = -1;
  var f = function(e, v) { Object.defineProperty(o, e, { value:v, writable:false, enumerable:true, configurable:true })};

  for (i in arguments) {
    var e = arguments[i];
    if ((!!e) & (e.constructor == Object))
      for (j in e)
        f(j, (c=e[j]));
    else
      f(e, ++c);
    }

  return Object.freeze ? Object.freeze(o) : o;
}

var APP_USER = makeEnum('DASHBOARD', 'PROFILE', 'CHAT', 'SETTING');
var APP_VENDOR = makeEnum('DASHBOARD', 'TIMELINE', 'PROFILE', 'CHAT', 'SETTING');

angular.module('starter.controllers', ['luegg.directives'])

.controller('LoginCtrl', function($scope, $state, $rootScope, $http, $timeout) {
  backDefault = $rootScope.$ionicGoBack;
  $rootScope.header_bar = false;
  $rootScope.button_top_tab = false;

  var Toast = function(pesan, style){
    $rootScope.kelasToast = style + ' toast-show';
    $timeout(function(){
      $rootScope.kelasToast = style + ' toast-hide';
    }, 2000);
    $rootScope.pesanToast = pesan;
  }

  $scope.daftar = function(){
    $state.go('register');
    $rootScope.header_bar = true;
  }
  $scope.login = function(){
    if($scope.username != undefined && $scope.username != '' && 
      $scope.password != undefined && $scope.password != ''){

      // loading($ionicLoading, 'show');
      var reqURL = alamatServer + 'postx.php?kode=auth&username=' + $scope.username + '&password=' + $scope.password;
      console.log(reqURL);
      $http.get(reqURL)
      .then(function(response){
        console.log(response);
        dump.push(response);
        if(response.data == null){
          Toast('Username atau password salah', 'alert');
          return ;
        }

        GLOBAL_ID = response.data.id;

        // console.log(GLOBAL_PROFILE);
        if(response.data.is_vendor == "1"){

          GLOBAL_VENDOR[APP_VENDOR.DASHBOARD] = response.data.dashboard;
          GLOBAL_VENDOR[APP_VENDOR.TIMELINE] = response.data.timeline;
          GLOBAL_VENDOR[APP_VENDOR.PROFILE] = response.data.profile;
          GLOBAL_VENDOR[APP_VENDOR.CHAT] = response.data.chat;
          GLOBAL_VENDOR[APP_VENDOR.SETTING] = response.data.setting;

          $state.go('tab_vendor.v_dashboard');
          $rootScope.header_bar = true;
          $rootScope.button_top_tab = true;

          // Initializing data
          // scopePointer[APP_VENDOR.DASHBOARD].initData();

          return;
        }

        if(response.data.is_vendor == "0"){

          GLOBAL_USER[APP_USER.DASHBOARD] = response.data.dashboard;
          GLOBAL_USER[APP_USER.PROFILE] = response.data.profile;
          GLOBAL_USER[APP_USER.CHAT] = response.data.chat;
          GLOBAL_USER[APP_USER.SETTING] = response.data.setting;

          $state.go('tab.t_dashboard');
          $rootScope.header_bar = true;
          $rootScope.button_top_tab = true;
          return;
        }
      });
    }else{
      Toast('Username atau password tidak boleh kosong', 'alert');
    }
    // alert("username | password = (X)")
  }
})

.controller('RegisterCtrl', function($scope, $ionicHistory, $rootScope, $http, $timeout, $state){
  $rootScope.$ionicGoBack = function(){
    backDefault();
    $rootScope.header_bar = false;
  }

  var Toast = function(pesan, style){
    $rootScope.kelasToast = style + ' toast-show';
    $timeout(function(){
      $rootScope.kelasToast = style + ' toast-hide';
    }, 2000);
    $rootScope.pesanToast = pesan;
  }

  $scope.daftar = function(){
    if($scope.username != undefined && $scope.username != '' && 
      $scope.password != undefined && $scope.password != '' && 
      $scope.nama != undefined && $scope.nama != '' && 
      $scope.email != undefined && $scope.email != '' && 
      $scope.jenis != undefined && $scope.jenis != ''){

      var reqURL = alamatServer + '/index.php?kode=create&nama=' + $scope.nama + '&username=' + $scope.username + '&password=' + $scope.password + '&email=' + $scope.email + '&is_vendor=' + $scope.jenis;
      console.log(reqURL);
      $http.get(reqURL)
      .then(function(response){
        console.log(response);
        Toast('Pendaftaran berhasil', 'notification');
        $state.go('login');
      });
    }else{
      Toast('Kolom data tidak boleh kosong', 'alert');
    }
  }
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

.controller('ChatCtrl', function($rootScope, $scope, $state, $ionicHistory, $ionicScrollDelegate) {
  if(scopeChat == undefined)
    scopeChat = $scope;

  $scope.gotoBottom = function(){
    setTimeout(function() {
      $ionicScrollDelegate.scrollBottom(false);
    }, 10);
  }

  $scope.chatContainer = [
    {
      picture: 'img/adam.jpg',
      messages: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
    },
    {
      picture: null,
      messages: 'Praesent aliquet libero dolor, at tincidunt augue mollis eget. Phasellus vestibulum pretium magna vel malesuada.'
    },
    {
      picture: 'img/adam.jpg',
      messages: 'Curabitur euismod lacus consectetur arcu rutrum,'
    },
    {
      picture: null,
      messages: 'sed hendrerit augue interdum. Ut non ullamcorper nibh. Integer ac erat nisl. '
    },
    {
      picture: 'img/adam.jpg',
      messages: 'ipsum risus tristique nulla,'
    },
    {
      picture: 'img/adam.jpg',
      messages: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus maximus, elit eget pharetra cursus'
    },
    {
      picture: null,
      messages: 'Praesent aliquet libero dolor, at tincidunt augue mollis eget. Phasellus vestibulum pretium magna vel malesuada.'
    },
    {
      picture: 'img/adam.jpg',
      messages: 'Curabitur euismod lacus consectetur arcu rutrum,'
    },
    {
      picture: null,
      messages: 'sed hendrerit augue interdum. Ut non ullamcorper nibh. Integer ac erat nisl. '
    },
    {
      picture: 'img/adam.jpg',
      messages: 'ipsum risus tristique nulla,'
    },
    {
      picture: 'img/adam.jpg',
      messages: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus maximus, elit eget pharetra cursus'
    }
  ]

  $scope.nav_button_back = function(){
    backDefault();
  }
})

// ------------

// MAIN TAB USER CONTROLLER
.controller('TabCtrl', function($rootScope, $scope, $state) {
})

// TAB USER CONTROLLER
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

  $scope.profileCardContainer = [
    {
      'picture': 'img/mcfly.jpg',
      'title': 'Butuh orderan cepat, nikahan',
      'postDate': '17:24',
      'budget': 'Rp 27.000.000,00',
      'briefDesc': 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus maximus, elit eget pharetra cursus',
      'tags': 'kuliner, fashion, pharetra',
      'dueDate': '22 Sep 2016',
      'proposal': {
        'n': '27',
        'avg': 'Rp 24.186.222,00'
      }
    },
    {
      'picture': 'img/mike.png',
      'title': 'Dicari vendor roti kukus',
      'postDate': '14:52',
      'budget': 'Rp 15.000.000,00',
      'briefDesc': 'Praesent aliquet libero dolor, at tincidunt augue mollis eget. Phasellus vestibulum pretium magna vel malesuada.',
      'tags': 'kuliner, roti, buku',
      'dueDate': '20 Sep 2016',
      'proposal': {
        'n': '7',
        'avg': 'Rp 12.716.912,00'
      }
    },
  ]
})

.controller('MessagesTabCtrl', function($rootScope, $scope, $state) {

  $scope.nav_button_notifikasi = function(){
    $state.go('notifikasi');
  }

  $scope.gotoChat = function(){
    if(scopeChat != undefined)
      scopeChat.gotoBottom();
  }
})

// ------------

// MAIN TAB VENDOR CONTROLLER
.controller('TabVendorCtrl', function($rootScope, $scope, $state) {
})

// TAB VENDOR CONTROLLER
.controller('VDashboardTabCtrl', function($rootScope, $scope, $state) {
  scopePointer[APP_VENDOR.DASHBOARD] = $scope;

  $scope.nav_button_notifikasi = function(){
    $state.go('notifikasi');
  }

  $scope.initData = function(){
    // check if data is empty
    if(GLOBAL_VENDOR[APP_VENDOR.DASHBOARD] == undefined)
      return;

    $scope.bindVal_money = GLOBAL_VENDOR[APP_VENDOR.DASHBOARD].money;
    $scope.bindVal_works = GLOBAL_VENDOR[APP_VENDOR.DASHBOARD].works;
    $scope.bindVal_rating = GLOBAL_VENDOR[APP_VENDOR.DASHBOARD].rating;

    // binding data to view
    $scope.dashboardCardContainer = [];

    // applying data
    var len = GLOBAL_VENDOR[APP_VENDOR.DASHBOARD].timelineOnProgress.length
    GLOBAL_VENDOR[APP_VENDOR.DASHBOARD].timelineOnProgress.forEach(function(data){
      var str_tag = data.tags[0];
      if(data.tags.length > 1)
        for(var i = 1; i < data.tags.length; i++)
          str_tag += ', ' + data.tags[i]

      // formatting data
      $scope.dashboardCardContainer.push({
        'picture': data.photoUrl,
        'title': data.title,
        'postDate': data.postDate,
        'star': data.rating,
        'budget': data.budget,
        'bid': data.bid,
        'briefDesc': data.deskripsi,
        'tags': str_tag,
        'dueDate': data.dueDate
      });
    });
  }

  // first initializing (only once init)
  $scope.initData();
})

.controller('VProfileTabCtrl', function($rootScope, $scope, $state) {
  $scope.nav_button_search = function(){
    $state.go('search');
  }
  $scope.nav_button_notifikasi = function(){
    $state.go('notifikasi');
  }

  $scope.initData = function(){
    // check if data is empty
    if(GLOBAL_VENDOR[APP_VENDOR.PROFILE] == undefined)
      return;

    $scope.bindVal_name = GLOBAL_VENDOR[APP_VENDOR.SETTING].profile.name;
    $scope.bindVal_phoneNo = GLOBAL_VENDOR[APP_VENDOR.SETTING].profile.phoneNo;
    $scope.bindVal_address = GLOBAL_VENDOR[APP_VENDOR.SETTING].profile.address;
    $scope.bindVal_ppurl = GLOBAL_VENDOR[APP_VENDOR.SETTING].profile.profilePictureUrl;

    // binding data to view
    $scope.profileCardContainer = [];

    // applying data
    var len = GLOBAL_VENDOR[APP_VENDOR.PROFILE].length
    GLOBAL_VENDOR[APP_VENDOR.PROFILE].forEach(function(data){
      var str_tag = data.tags[0];
      if(data.tags.length > 1)
        for(var i = 1; i < data.tags.length; i++)
          str_tag += ', ' + data.tags[i]

      // formatting data
      $scope.profileCardContainer.push({
        'picture': data.photoUrl,
        'title': data.title,
        'postDate': data.postDate,
        'star': data.rating,
        'budget': data.budget,
        'briefDesc': data.deskripsi,
        'tags': str_tag,
        'dueDate': data.dueDate,
        'proposal': {
          'n': data.proposal.n,
          'avg': data.proposal.avg
        }
      });
    });
  }

  // first initializing (only once init)
  $scope.initData();
})

.controller('VMessagesTabCtrl', function($rootScope, $scope, $state) {
  $scope.nav_button_notifikasi = function(){
    $state.go('notifikasi');
  }
})

.controller('VTimelineTabCtrl', function($rootScope, $scope, $state) {
  $scope.nav_button_notifikasi = function(){
    $state.go('notifikasi');
  }
  $scope.nav_button_search = function(){
    $state.go('search');
  }
  $scope.cardContainer = [
    {
      'picture': 'img/mcfly.jpg',
      'title': 'Butuh orderan cepat, nikahan',
      'postDate': '17:24',
      'star': 3.6,
      'budget': 'Rp 27.000.000,00',
      'briefDesc': 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus maximus, elit eget pharetra cursus',
      'tags': 'kuliner, fashion, pharetra',
      'dueDate': '22 Sep 2016',
      'proposal': {
        'n': '27',
        'avg': 'Rp 24.186.222,00'
      }
    },
    {
      'picture': 'img/mike.png',
      'title': 'Dicari vendor roti kukus',
      'postDate': '14:52',
      'star': 4.8,
      'budget': 'Rp 15.000.000,00',
      'briefDesc': 'Praesent aliquet libero dolor, at tincidunt augue mollis eget. Phasellus vestibulum pretium magna vel malesuada.',
      'tags': 'kuliner, roti, buku',
      'dueDate': '20 Sep 2016',
      'proposal': {
        'n': '7',
        'avg': 'Rp 12.716.912,00'
      }
    },
  ]
})

// ------------

// GENERAL SETTING
.controller('SettingsTabCtrl', function($rootScope, $scope, $state) {
})

// GENERAL SETTING → PROFILE
.controller('SettingProfileCtrl', function($rootScope, $scope, $state) {
  $scope.nav_button_back = function(){
    backDefault();
  }
})

// GENERAL SETTING → NOTIFIKASI
.controller('SettingNotifikasiCtrl', function($rootScope, $scope, $state) {
  $scope.nav_button_back = function(){
    backDefault();
  }
  $scope.updatex = function(){
    console.log($scope.datax);
  }
})

// GENERAL SETTING → BANTUAN
.controller('SettingBantuanCtrl', function($rootScope, $scope, $state) {
  $scope.nav_button_back = function(){
    backDefault();
  }
})

// GENERAL SETTING → TENTANG
.controller('SettingTentangCtrl', function($rootScope, $scope, $state) {
  $scope.nav_button_back = function(){
    backDefault();
  }
})

// ------------

// PENAWARAN BARU
.controller('PenawaranBaruCtrl', function($rootScope, $scope, $state) {
  $scope.nav_button_back = function(){
    backDefault();
  }
});
