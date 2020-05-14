        var app = angular.module("myapp", ["ngRoute"]);
        app.controller("myctrl", function ($scope, $http) {
           // lấy vị tri index của user
           $scope.begin = 0;
           
           $scope.alo = true;
           $scope.alo = false;
           var viTri = 0;
          if ( typeof(Storage) !== "undefined") {
            //get sessionStorage
            var viTri  =  sessionStorage.getItem('index');      
        } else {
            alert('Trình duyệt của bạn đã quá cũ. Hãy nâng cấp trình duyệt ngay!');
        }
        if(viTri != null){
            $scope.alo1 = true;
           $scope.alo = false;
        }else {
          $scope.alo1 = false;
           $scope.alo = true;
        }
          // get list môn học
          $scope.list = [];
          $http.get("db/Subjects.js").then(function(d){
                $scope.list = d.data;
            });
          // get list sinh vien
          $scope.student = {};
          $scope.students = [];
          $http.get("db/Students.js").then(function(d){
                $scope.students = d.data;
                if(viTri == null ){
              $scope.taiKhoan = "Tài Khoản";
            }else {
              $scope.taiKhoan = $scope.students[viTri].fullname
            }
            });
            //end
            $scope.logoff = function() {
                sessionStorage.clear();
                $scope.taiKhoan = "Tài Khoản";
                $scope.alo1 = false;
           $scope.alo = true;
            }
            $scope.first = function() {
                $scope.begin = 0;
            }
            $scope.prev = function() {
                if($scope.begin > 0){
                    $scope.begin -= 12;
                }
            }
            $scope.next = function() {
                if($scope.begin < (Math.ceil($scope.list.length / 12) - 1)* 12){
                    $scope.begin += 12;
                }
            }
            $scope.last = function() {
                $scope.begin = (Math.ceil($scope.list.length / 12) - 1) * 12;
            }
         
    });
    ////////// route
    app.config(function($routeProvider) {
        $routeProvider
        .when("/trangchuu", {
            templateUrl: "trangcon/trangchuu.html"
        })
        .when("/lienhe", {
            templateUrl: "trangcon/lienhe.html"
        })
        .when("/gioithieu", {
            templateUrl: "trangcon/gioithieu.html"
        })
        .when("/gopy", {
            templateUrl: "trangcon/gopy.html"
        })
        .when("/hoidap", {
            templateUrl: "trangcon/hoidap.html"
        })
        .when("/quiz/:id/:name", {
            templateUrl: "trangcon/ADAV.html",
            controller: "ctrlquiz"
        })
        .when("/user/forgot", {
            templateUrl: "trangcon/forgot.html",
            controller: "ctrlforgot"
        })
        .when("/user/change", {
            templateUrl: "trangcon/change.html",
            controller: "ctrlchange"
        })
        .when("/user/profile", {
            templateUrl: "trangcon/profile.html",
            controller: "ctrlprofile"
        })
        .otherwise({redirectTo:"/trangchuu"
    })
    });
    
    app.run(function ($rootScope) {
        $rootScope.$on('$routeChangeStart', function(){
            $rootScope.loading = true;
        });
        $rootScope.$on('$routeChangeSuccess', function(){
            $rootScope.loading = false;
        });
        $rootScope.$on('$routeChangeError', function(){
            $rootScope.loading = false;
            alert("lỗi, không tải được template");
        });
    });
    // quizzzzzzzzzzzzzzzzzz
    app.controller("ctrlquiz", function ($scope, $http, $routeParams) {
      function startTimer(duration, display) {
        var start = Date.now(),
            diff,
            minutes,
            seconds;
        function timer() {
            // get the number of seconds that have elapsed since 
            // startTimer() was called
            diff = duration - (((Date.now() - start) / 1000) | 0);
            
            // does the same job as parseInt truncates the float
            minutes = (15) | 0;
            seconds = (diff % 60) | 0;
    
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
    
            display.textContent = minutes + ":" + seconds; 
    
            if (diff <= 0) {
                // add one second so that the count down starts at the full duration
                // example 05:00 not 04:59
                start = Date.now() + 1000;
            }
        };
        // we don't want to wait a full second before the timer starts
        timer();
        setInterval(timer, 1000);
    }
    
    window.onload = function () {
        var fiveMinutes = 60 * 5,
            display = document.querySelector('#time');
        startTimer(fiveMinutes, display);
    };
        $scope.quizzz = [];
        $scope.titlee = $routeParams.name;
        
        $http.get("db/Quizs/"+$routeParams.id+".js").then(function(d){
              $scope.quizzz = d.data;
              
          })
          
        $scope.begin1 = 0;
        $scope.diem = 0;
        $scope.tl = false;
         // lấy vị tri index của user
         var viTri = 0;
        if ( typeof(Storage) !== "undefined") {
          //get sessionStorage
          var viTri  =  sessionStorage.getItem('index');      
      } else {
          alert('Trình duyệt của bạn đã quá cũ. Hãy nâng cấp trình duyệt ngay!');
      }
        // get list môn học
        $scope.list = [];
        $http.get("db/Subjects.js").then(function(d){
              $scope.list = d.data;
          });
        // get list sinh vien
        $scope.student = {};
        $scope.students = [];
        $http.get("db/Students.js").then(function(d){
              $scope.students = d.data;
              if(viTri == null ){
            $scope.taiKhoan = "Tài Khoản";
          }else {
            $scope.taiKhoan = $scope.students[viTri].fullname
          }
          });
          //end
      ////-------------
      $scope.first = function() {
              $scope.begin1 = 0;
              $scope.indexx = 0;
          }
          $scope.prev = function() {
              if($scope.begin1 > 0){
                  $scope.begin1 -= 1;
              }
              $scope.indexx = 0;
          }
          $scope.next = function() {
              if($scope.begin1 < (Math.ceil($scope.quizzz.length / 1) - 1)* 1){
                  $scope.begin1 += 1;
              }
              $scope.indexx = 0;
          }
          $scope.last = function() {
              $scope.begin1 = (Math.ceil($scope.quizzz.length / 1) - 1) * 1;
              $scope.indexx = 0;
          }
          var a = $scope.dapAn = {checked: ""};
          $scope.indexx = 0;
          $scope.kiemTra = function(indexx){
            var b =  $("#myinput1").val();
            var c =  $("#myinput").val();
            if(parseInt(c) == parseInt(b)){
              Swal.fire(
                'Chính xác!',
                'Bạn đã trả lời đúng!',
                'success'
              )
              $scope.diem = $scope.diem + 1;
              $scope.tl = true;
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Sai mất rồi...',
                text: 'Bạn đã trả lời sai!'
              })
              $scope.tl = true;
            }
            $scope.indexx = 1;

            
            }
            ///dong ho
  });
    ///////////////////////// quên mật khẩu
    app.controller("ctrlforgot", function ($scope, $http, $routeParams) {
        // lấy vị tri index của user
        var viTri = 0;
        if ( typeof(Storage) !== "undefined") {
          //get sessionStorage
          var viTri  =  sessionStorage.getItem('index');      
      } else {
          alert('Trình duyệt của bạn đã quá cũ. Hãy nâng cấp trình duyệt ngay!');
      }
       // get list môn học
       $scope.list = [];
        $http.get("db/Subjects.js").then(function(d){
              $scope.list = d.data;
          });
        // get list sinh vien
        $scope.student = {};
        $scope.students = [];
        $http.get("db/Students.js").then(function(d){
              $scope.students = d.data;
              if(viTri == null ){
            $scope.taiKhoan = "Tài Khoản";
          }else {
            $scope.taiKhoan = $scope.students[viTri].fullname
          }
          });
      
      $scope.click = function () {
        var a = $scope.student.email;
        var b = $scope.student.maXN;
        var c = "";
        var d = "123";
        for (var index = 0; index < $scope.students.length; index++) {
          c = $scope.students[index].email;
            if(a.valueOf() == c.valueOf() && b.valueOf() == d.valueOf()){
              Swal.fire({
                icon: 'success',
                title: 'Thành công',
                text: 'Mật khẩu của bạn là: '+$scope.students[index].password
                
            })
              break;  
            }else {
              Swal.fire({
                icon: 'error',
                title: 'Lỗi...',
                text: 'Sai tài khoản hoặc mã xác nhận!'
                
              })
            }
          
        }
      }
  });
  ////////////// đổi mật khẩu
  app.controller("ctrlchange", function ($scope, $http, $routeParams) {
    // lấy vị tri index của user
    var viTri = 0;
    if ( typeof(Storage) !== "undefined") {
      //get sessionStorage
      var viTri  =  sessionStorage.getItem('index');      
  } else {
      alert('Trình duyệt của bạn đã quá cũ. Hãy nâng cấp trình duyệt ngay!');
  }
    // get list môn học
    $scope.list = [];
    $http.get("db/Subjects.js").then(function(d){
          $scope.list = d.data;
      });
    // get list sinh vien
    $scope.student = {};
    $scope.students = [];
    $http.get("db/Students.js").then(function(d){
          $scope.students = d.data;
          if(viTri == null ){
        $scope.taiKhoan = "Tài Khoản";
      }else {
        $scope.taiKhoan = $scope.students[viTri].fullname
      }
      });
      //end
  $scope.click11 = function () {
    if($scope.student.password.valueOf() != $scope.students[viTri].password){
    Swal.fire({
          icon: 'error',
          title: 'Lỗi...',
          text: 'Sai mật khẩu cũ!'
          
        })
  }else if($scope.student.xnmk.valueOf() != $scope.student.xnmk1.valueOf()){
    Swal.fire({
          icon: 'error',
          title: 'Lỗi...',
          text: 'Mật khẩu mới và xác nhận mật khẩu không trùng khớp nhau!'
          
        })
  }else {
    Swal.fire({
          icon: 'success',
          title: 'Thành công',
          text: 'Mật khẩu mới của bạn là: '+$scope.student.xnmk
          
      })
  }
  }

});
    /// cạp nhập thông tin
    app.controller("ctrlprofile", function ($scope, $http) {
        var viTri = 0;
      if ( typeof(Storage) !== "undefined") {
        //get sessionStorage
        var viTri  =  sessionStorage.getItem('index');      
    } else {
        alert('Trình duyệt của bạn đã quá cũ. Hãy nâng cấp trình duyệt ngay!');
    }
      // get list môn học
      $scope.list = [];
      $http.get("db/Subjects.js").then(function(d){
            $scope.list = d.data;
        });
      // get list sinh vien
      $scope.student = {};
      $scope.students = [];
      $http.get("db/Students.js").then(function(d){
            $scope.students = d.data;
            $scope.student.fullname = $scope.students[viTri].fullname;
    $scope.student.username = $scope.students[viTri].username;
    $scope.student.email = $scope.students[viTri].email;
    $scope.student.gender = $scope.students[viTri].gender;
    $scope.student.birthday = $scope.students[viTri].birthday;
    $scope.student.schoolfee = $scope.students[viTri].schoolfee;
            if(viTri == null ){
          $scope.taiKhoan = "Tài Khoản";
        }else {
          $scope.taiKhoan = $scope.students[viTri].fullname
        }
        });
        //end
        $scope.update = function(){
    if(viTri != null){
      $scope.students[$scope.viTri] = angular.copy($scope.student);
      Swal.fire({
            icon: 'success',
            title: 'Thành công',
            text: 'Cập nhập thông tin tài khoản thành công'
            
        })
    }else{
      aler("sai");
    }
   }

    });
    ///////////////////log off
