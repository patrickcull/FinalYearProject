angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('CamCtrl', function($scope) {
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
})


.controller('LoginCtrl', function($scope, $http) {

	//$scope.responseMessage = "Please Login."

$scope.signUp = function (user, $localstorage) {

        var request = $http({
            method: "post",
            url: "http://patrick-cull.com/map/php/user.php",
            crossDomain : true,
            data: {
	            'email': user.email,
	            'password': user.password,
	            'username': user.username
        	},
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        /* Successful HTTP post request or not */
        request.success(function(data) {
            if(data == "1"){
             $scope.responseMessage = "Successfully Created Account";

             window.localStorage['userinfo'] = JSON.stringify(data);

			 var data = JSON.parse(window.localStorage['data'] || '{}');
            }
            if(data == "2"){
             $scope.responseMessage = "Create Account failed";
            }
            else if(data == "0") {
             $scope.responseMessage = "Email Already Exists. Try Another"
            }  
        });
}
});
