angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('CamCtrl', function($scope) {
})

.controller('FriendsCtrl', function($scope, $http, $ionicModal) {
  //$scope.friends = Friends.all();
  $scope.username =  window.localStorage.getItem("uname");

  //Get friends of current user, and return query data on success.
	var request = $http({
	    method: "post",
	    url: "http://patrick-cull.com/map/php/getfriends.php",
	    crossDomain : true,
	    data: {
	        'username':  $scope.username,
		},
	    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
	});

	request.success(function(data) {
		$scope.pals = data;
	});



	//The following code handles the modal popup
	$ionicModal.fromTemplateUrl('templates/addFriendModal.html', {
	    scope: $scope,
	    animation: 'slide-in-up',
	    focusFirstInput: true
	  }).then(function(modal) {
	    $scope.modal = modal;
	  })  

	  $scope.openModal = function() {
	    $scope.modal.show()
	  }

	  $scope.closeModal = function() {
	    $scope.modal.hide();
	  };

	  $scope.$on('$destroy', function() {
	    $scope.modal.remove();
	  });

	  $scope.addFriend = function(friend){
        var request = $http({
            method: "post",
            url: "http://patrick-cull.com/map/php/addFriend.php",
            crossDomain : true,
            data: {
	            'username': $scope.username,
	            'fname': friend.fname,
        	},
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        /* Successful HTTP post request or not */
        request.success(function(data) {
            if(data == "1"){
			 $scope.responseMessage = "Friend Added Successfully!";
            }
            else if(data == "0") {
             $scope.responseMessage = "No user found. Please check spelling."
            }  
             else if(data == "2") {
             $scope.responseMessage = "Already friends with this user :)"
            } 
        });

	  }


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


        /* Successful HTTP post request or not */
        request.success(function(data) {
            if(data == "1"){
             $scope.responseMessage = "Successfully Created Account";

			 $state.go('tab.dash');
	        window.localStorage.setItem("uname", user.username);
       		$scope.username =  window.localStorage.getItem("uname");

            }
            if(data == "2"){
             $scope.responseMessage = "Create Account failed";
            }
            else if(data == "0") {
             $scope.responseMessage = "Email or Username already exists. Please try another"
            }  
        });
}
});
