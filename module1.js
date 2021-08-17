var app=angular.module("myMod",[]);
app.controller("myController",function($scope,$http,$window,$interval)
{
    
    $interval(function(){
     $scope.myDate=new Date();
    },1000);
    $scope.name="Dewas";
    $http.get("https://api.openweathermap.org/data/2.5/weather?q=Dewas&appid=23dfb5123d09946fa3980ab4794afe37").then(function(response){
    $scope.record=response.data;
    });
    $scope.message=function()
    {
    $http.get("https://www.fast2sms.com/dev/bulkV2?authorization=JqWF24NPndw5oxECMtuviHj8AgGKzRfL6sl0mTQ9I7rVka3DZhsTXJlBCU9rKjOu6EHifmk3Yxc84N21&route=v3&sender_id=TXTIND&message=Welcome to Mayank Weather Forecast %0A State/City : "+$scope.record.name+"%0A Description : "+$scope.record.weather[0].description+"%0A Temperature : "+Math.round($scope.record.main.temp-273)+"C"+"%0A Wind : "+$scope.record.wind.speed+"m/s"+"%0A"+$scope.typeHere+"&language=english&flash=0&numbers="+$scope.number).then(function(response){
    $scope.record=response.data;  
    $scope.notify=$window.alert("Message sent successfully");
    location.reload(); 
    },function(response){
    $scope.record=$window.alert("Message not sent");
})
}
    $scope.show=function(){
    $http.get("https://api.openweathermap.org/data/2.5/weather?q="+$scope.name+"&appid=23dfb5123d09946fa3980ab4794afe37").then(function(response){

    $scope.record=response.data;     

    }, function (response) {
        $scope.record = $window.alert('Please enter correct city name');
        location.reload();
    });
}
});
