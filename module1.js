var app=angular.module("myMod",[]);
app.controller("myController",function($scope,$http,$window,$interval){
    
    $interval(function(){
     $scope.myDate=new Date();
    },1000);
    $scope.name="Dewas";
    $http.get("https://api.openweathermap.org/data/2.5/weather?q=Dewas&appid=23dfb5123d09946fa3980ab4794afe37").then(function(response){
    $scope.record=response.data;
    });
    $scope.show=function(){
    $http.get("https://api.openweathermap.org/data/2.5/weather?q="+$scope.name+"&appid=23dfb5123d09946fa3980ab4794afe37").then(function(response){

    $scope.record=response.data;     

    }, function (response) {
        $scope.record = $window.alert('Please enter correct city name');
        location.reload();
    });
}
});