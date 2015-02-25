angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('CamCtrl', function($scope) {
})

.controller('FriendsCtrl', function($scope, $http, Friends) {
  //$scope.friends = Friends.all();
  $scope.username =  window.localStorage.getItem("uname");


    //Get list of friends
  $http.get('http://patrick-cull.com/map/php/getfriends.php')
  .success(function(data) {
        $scope.pals = data;
   });


})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
	$scope.username =  window.localStorage.getItem("uname");

	$scope.logout = function(){
		//Clear the set username
		window.localStorage.setItem("uname", "");
	}
})


.controller('LoginCtrl', function($scope, $http, $state) {

	$scope.create = function(){
		$state.go('create');
	};

	$scope.login = function (user) {

        var request = $http({
            method: "post",
            url: "http://patrick-cull.com/map/php/login.php",
            crossDomain : true,
            data: {
	            'uname': user.uname,
	            'password': user.password,
        	},
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        /* Successful HTTP post request or not */
        request.success(function(data) {
            if(data == "1"){
			 $state.go('tab.dash');
			 $scope.responseMessage = "";
			 window.localStorage.setItem("uname", user.uname);
        	 $scope.username =  window.localStorage.getItem("uname");
            }
            else if(data == "0") {
             $scope.responseMessage = "No user found. Please try again, or create a new account."
            }  
        });
}
})


.controller('CreateCtrl', function($scope, $http, $state) {


$scope.signUp = function (user) {

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


        window.localStorage.setItem("uname", user.username);
        $scope.username =  window.localStorage.getItem("uname");



        /* Successful HTTP post request or not */
        request.success(function(data) {
            if(data == "1"){
             $scope.responseMessage = "Successfully Created Account";

			 $state.go('tab.dash');

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
