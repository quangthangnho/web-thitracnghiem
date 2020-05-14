var app = angular.module("myapp", []);
        app.controller("myctrl", function ($scope, $http) {
          $scope.quizzz = [];
          $http.get("db/Quizs/ADAV.js").then(function(d){
                $scope.quizzz = d.data;
            })
          $scope.begin = 0;
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
                $scope.begin = 0;
                $scope.indexx = 0;
            }
            $scope.prev = function() {
                if($scope.begin > 0){
                    $scope.begin -= 1;
                }
                $scope.indexx = 0;
            }
            $scope.next = function() {
                if($scope.begin < (Math.ceil($scope.quizzz.length / 1) - 1)* 1){
                    $scope.begin += 1;
                }
                $scope.indexx = 0;
            }
            $scope.last = function() {
                $scope.begin = (Math.ceil($scope.quizzz.length / 1) - 1) * 1;
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
             
                
              
            
            
    });