angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $sce) {
	//The current user will be sent to the map page using POST
  	$scope.username =  window.localStorage.getItem("uname");
  	$scope.url = "http://patrick-cull.com/map/index.php?uname=" + $scope.username;
  	//$scope.url = "http://patrick-cull.com/map/index.php";
  	$scope.mapurl = $sce.trustAsResourceUrl($scope.url);

})

.controller('CamCtrl', function($scope, $ionicLoading) {

	$scope.showLoading = function() {
	    $ionicLoading.show({
	      template: 'Uploading...'
	    });
  	};
	$scope.hideLoading = function(){
	    $ionicLoading.hide();
	};



    $scope.username =  window.localStorage.getItem("uname");

    $scope.uploadPhoto = function() {
    //alert('Uploading Photo...');     
    $scope.showLoading();
    var img = document.getElementById('image');
    var imageURI = img.src;
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    options.headers = {
       Connection: "close"
    };
    options.chunkedMode = false;

    var params = new Object();

    //$scope.username =  window.localStorage.getItem("uname");

    navigator.geolocation.getCurrentPosition( 
        function(position) { 
          params.lon = position.coords.longitude;
          params.lat = position.coords.latitude;
          params.uname = $scope.username;
          alert(params.lon + ',' + params.lat); 

          options.params = params;

          var ft = new FileTransfer();
          ft.upload(imageURI, "http://patrick-cull.com/map/php/upload.php", win, fail, options, true);
    	  $scope.hideLoading();

        }, 

        function() { 
          alert('Error getting location'); 
        }
    );

}

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

	  //Function to add friend.
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
            else if(data == "3"){
             $scope.responseMessage = "You can't add yourself as a friend!"
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
