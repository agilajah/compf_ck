var dump = [];
var backDefault;
var scopeChat;

var scopePointer = [];

var alamatServer = "http://finddor.coolpage.biz/"
var GLOBAL_ID;
var GLOBAL_USER = [];
var GLOBAL_VENDOR = [];
var GLOBAL_CHAT_DATA = [];

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

var APP_USER = makeEnum('DASHBOARD', 'PROFILE', 'CHAT', 'SETTING', 'NOTIFIKASI');
var APP_VENDOR = makeEnum('DASHBOARD', 'TIMELINE', 'PROFILE', 'CHAT', 'SETTING', 'NOTIFIKASI');

angular.module('starter.controllers', [/*'luegg.directives'*/])

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
      var reqURL = alamatServer + 'index.php?kode=auth&username=' + $scope.username + '&password=' + $scope.password;
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
          GLOBAL_VENDOR[APP_VENDOR.PROFILE] = response.data.profile.history;
          GLOBAL_VENDOR[APP_VENDOR.CHAT] = response.data.chat.message;
          GLOBAL_VENDOR[APP_VENDOR.SETTING] = response.data.setting;
          GLOBAL_VENDOR[APP_VENDOR.NOTIFIKASI] = response.data.Notifications;

          $state.go('tab_vendor.v_dashboard');
          $rootScope.header_bar = true;
          $rootScope.button_top_tab = true;

          // Initializing data
          // scopePointer[APP_VENDOR.DASHBOARD].initData();

          return;
        }

        if(response.data.is_vendor == "0"){

          GLOBAL_USER[APP_USER.DASHBOARD] = response.data.dashboard;
          GLOBAL_USER[APP_USER.PROFILE] = response.data.profile.history;
          GLOBAL_USER[APP_USER.CHAT] = response.data.chat.message;
          GLOBAL_USER[APP_USER.SETTING] = response.data.setting;
          GLOBAL_USER[APP_USER.NOTIFIKASI] = response.data.Notifications;

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

      var reqURL = alamatServer + 'index.php?kode=create&nama=' + $scope.nama + '&username=' + $scope.username + '&password=' + $scope.password + '&email=' + $scope.email + '&is_vendor=' + $scope.jenis;
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

  // $scope.notifs = typeof(GLOBAL_VENDOR[APP_VENDOR.NOTIFIKASI]) == "object" 
  //                 ? GLOBAL_VENDOR[APP_VENDOR.NOTIFIKASI] 
  //                 : GLOBAL_USER[APP_USER.NOTIFIKASI];

  $scope.notifs = [
    {
      body:"notif user 6",
      created_at:"2016-12-09 00:00:00",
      id:"11",
      subject: "lihat inbox coy",
      is_read: false
    },
    {
      body:"notif user 6",
      created_at:"2016-12-09 00:00:00",
      id:"12",
      subject: "lihat inbox coy",
      is_read: true
    },
    {
      body:"notif user 6",
      created_at:"2016-12-09 00:00:00",
      id:"13",
      subject: "lihat inbox coy",
      is_read: true
    }
  ]
})

.controller('ChatCtrl', function($rootScope, $scope, $state, $ionicHistory, $ionicScrollDelegate) {
  if(scopeChat == undefined)
    scopeChat = $scope;

  $scope.gotoBottom = function(){
    setTimeout(function() {
      $ionicScrollDelegate.scrollBottom(false);
    }, 100);
  }

  $scope.chatContainer = [];
  GLOBAL_CHAT_DATA[$state.params.parent_id].forEach(function(chat){
    $scope.chatContainer.push({
      picture: (GLOBAL_VENDOR[APP_VENDOR.SETTING].profile.username == chat.creator_name ? null : 'img/adam.jpg'),
      messages: chat.body
    });
  })
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


  $scope.initData = function(){
    // check if data is empty
    if(GLOBAL_USER[APP_USER.DASHBOARD] == undefined)
      return;

    $scope.bindVal_money = GLOBAL_USER[APP_USER.DASHBOARD].money;
    $scope.bindVal_works = GLOBAL_USER[APP_USER.DASHBOARD].works;
    $scope.bindVal_rating = parseFloat(GLOBAL_USER[APP_USER.DASHBOARD].rating).toFixed(1);

    // binding data to view
    $scope.dashboardCardContainer = [];

    // applying data
    var len = GLOBAL_USER[APP_USER.DASHBOARD].timelineOnProgress.length
    GLOBAL_USER[APP_USER.DASHBOARD].timelineOnProgress.forEach(function(data){
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

.controller('ProfileTabCtrl', function($rootScope, $scope, $state) {
  $scope.nav_button_search = function(){
    $state.go('search');
  }
  $scope.nav_button_notifikasi = function(){
    $state.go('notifikasi');
  }

  $scope.initData = function(){
    // check if data is empty
    if(GLOBAL_USER[APP_USER.PROFILE] == undefined)
      return;

    $scope.bindVal_name = GLOBAL_USER[APP_USER.SETTING].profile.name;
    $scope.bindVal_phoneNo = GLOBAL_USER[APP_USER.SETTING].profile.phoneNo;
    $scope.bindVal_address = GLOBAL_USER[APP_USER.SETTING].profile.address;
    $scope.bindVal_ppurl = GLOBAL_USER[APP_USER.SETTING].profile.profilePictureUrl;

    // binding data to view
    $scope.profileCardContainer = [];

    // applying data
    var len = GLOBAL_USER[APP_USER.PROFILE].length
    GLOBAL_USER[APP_USER.PROFILE].forEach(function(data){
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

  $scope.gotoChat = function(parentId){
    // console.log(parentId);
    $state.go('chat', {parent_id: parentId});
  }

  $scope.chatContainer = [];
  GLOBAL_CHAT_DATA = [];

  $scope.init = function(){
    // check if data is empty
    if(GLOBAL_VENDOR[APP_VENDOR.CHAT] == undefined)
      return;

    var parentIdArr = [];

    GLOBAL_VENDOR[APP_VENDOR.CHAT].forEach(function(data){
      if(GLOBAL_CHAT_DATA[data.parent_id] == undefined)
        GLOBAL_CHAT_DATA[data.parent_id] = [];

      GLOBAL_CHAT_DATA[data.parent_id].push(data);

      
      if(parentIdArr.indexOf(data.parent_id) === -1){
        parentIdArr.push(data.parent_id);

        $scope.chatContainer.push({
          "parent_id": data.parent_id,
          "picture": null,
          "name": (GLOBAL_VENDOR[APP_VENDOR.SETTING].profile.username == data.creator_name ? data.recipient_name : data.creator_name),
          "summary_msg": data.body
        })
      }
    })
  }

  $scope.init();
})

.controller('VTimelineTabCtrl', function($rootScope, $scope, $state) {
  $scope.nav_button_notifikasi = function(){
    $state.go('notifikasi');
  }
  $scope.nav_button_search = function(){
    $state.go('search');
  }
  // binding data to view
  $scope.cardContainer = [];

  // applying data
  var len = GLOBAL_VENDOR[APP_VENDOR.TIMELINE].length
  GLOBAL_VENDOR[APP_VENDOR.TIMELINE].forEach(function(data){
    var str_tag = data.tags[0];
    if(data.tags.length > 1)
      for(var i = 1; i < data.tags.length; i++)
        str_tag += ', ' + data.tags[i]

    var avg_pros = 0;
    data.proposer.forEach(function(x){
      avg_pros += parseInt(x.bid);
      console.log(avg_pros)
    })
    avg_pros = parseInt(avg_pros / data.proposer.length);
    console.log("avg: " + avg_pros)

    // formatting data
    $scope.cardContainer.push({
      'picture': data.photoUrl,
      'title': data.title,
      'postDate': data.postDate,
      'star': data.rating,
      'budget': data.budget,
      'briefDesc': data.deskripsi,
      'tags': str_tag,
      'dueDate': data.dueDate,
      'proposal': {
        'n': data.proposer.length,
        'avg': avg_pros
      }
    });
  });
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

  $scope.init = function(){
    // check if data is empty
    if(GLOBAL_VENDOR[APP_VENDOR.SETTING] == undefined)
      return;

    var len = GLOBAL_VENDOR[APP_VENDOR.SETTING].profile.tags.length
    var str_tag = GLOBAL_VENDOR[APP_VENDOR.SETTING].profile.tags[0];
    if(len > 1)
      for(var i = 1; i < len; i++)
        str_tag += ', ' + GLOBAL_VENDOR[APP_VENDOR.SETTING].profile.tags[i];

    $scope.bindVal_ppurl = GLOBAL_VENDOR[APP_VENDOR.SETTING].profile.profilePictureUrl;
    $scope.bindVal_name = GLOBAL_VENDOR[APP_VENDOR.SETTING].profile.name;
    $scope.bindVal_phoneNo = GLOBAL_VENDOR[APP_VENDOR.SETTING].profile.phoneNo;
    $scope.bindVal_availability = GLOBAL_VENDOR[APP_VENDOR.SETTING].profile.availability;
    $scope.bindVal_address = GLOBAL_VENDOR[APP_VENDOR.SETTING].profile.address;
    $scope.bindVal_description = GLOBAL_VENDOR[APP_VENDOR.SETTING].profile.description;
    $scope.bindVal_tags = str_tag;
    $scope.bindVal_email = GLOBAL_VENDOR[APP_VENDOR.SETTING].profile.email;
  }

  $scope.init();
})

// GENERAL SETTING → NOTIFIKASI
.controller('SettingNotifikasiCtrl', function($rootScope, $scope, $state) {
  $scope.nav_button_back = function(){
    backDefault();
  }
  $scope.updatex = function(){
    console.log($scope.datax);
  }

  $scope.init = function(){
    // check if data is empty
    if(GLOBAL_VENDOR[APP_VENDOR.SETTING] == undefined)
      return;

    $scope.bindVal_status = GLOBAL_VENDOR[APP_VENDOR.SETTING].notification.status;
    $scope.show_notif = GLOBAL_VENDOR[APP_VENDOR.SETTING].notification.status;
    $scope.bindVal_vibrate = GLOBAL_VENDOR[APP_VENDOR.SETTING].notification.vibrate;
    $scope.bindVal_led = GLOBAL_VENDOR[APP_VENDOR.SETTING].notification.led;
  }

  $scope.init();
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
