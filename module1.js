// myMod is the name of module
var app=angular.module("myMod",[]);
// ngEnter directive will search the city on enter press.
app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

// myController is the name of controller
app.controller("myController",function($scope,$http,$window,$interval)
{
    //$scope,$http,$window and $interval services are used.
    // interval service that will be automatically fired after every 1 sec to display time.
    $interval(function(){
     $scope.myDate=new Date();
    },1000);
    // Dewas is a default city name whose weather conditions will be displayed
    $scope.name="Dewas";
    //$http service to call an api using get method.
    $http.get("https://api.openweathermap.org/data/2.5/weather?q=Dewas&appid=23dfb5123d09946fa3980ab4794afe37").then(function(response){
    $scope.record=response.data;
    });
    // message function will be fired when user will send message.
    $scope.message=function()
    {
    $http.get("https://www.fast2sms.com/dev/bulkV2?authorization=JqWF24NPndw5oxECMtuviHj8AgGKzRfL6sl0mTQ9I7rVka3DZhsTXJlBCU9rKjOu6EHifmk3Yxc84N21&route=v3&sender_id=TXTIND&message=Welcome to Mayank Weather Forecast %0A State/City : "+$scope.record.name+"%0A Description : "+$scope.record.weather[0].description+"%0A Temperature : "+Math.round($scope.record.main.temp-273)+"C"+"%0A Wind : "+$scope.record.wind.speed+"m/s"+"%0A"+$scope.typeHere+"&language=english&flash=0&numbers="+$scope.number).then(function(response){
    $scope.record=response.data;
    //$window service for poping a message if sent successfully or not. 
    $scope.notify=$window.alert("Message sent successfully");
    location.reload(); 
    },function(response){
    $scope.record=$window.alert("Message not sent");
})
}
    // show function will be fired when user has to search any city name.
    $scope.show=function(){
    $http.get("https://api.openweathermap.org/data/2.5/weather?q="+$scope.name+"&appid=23dfb5123d09946fa3980ab4794afe37").then(function(response){
    //$scope.record has successful/unsuccessful response  
    $scope.record=response.data;     

    }, function (response) {
        $scope.record = $window.alert('Please enter correct city name');
        location.reload();
    });
}
});
