angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $sce) {
	//The current user will be sent to the map page using POST
  	$scope.username =  window.localStorage.getItem("uname");
  	$scope.url = "http://paddycull.com/map/index.php?uname=" + $scope.username;
  	$scope.mapurl = $sce.trustAsResourceUrl($scope.url);

})

.controller('CamCtrl', function($scope, $ionicLoading, $state) {

	$scope.showLoading = function(message) {
	    $ionicLoading.show({
	      template: message
	    });
  	};
	$scope.hideLoading = function(){
	    $ionicLoading.hide();
	};

    $scope.username =  window.localStorage.getItem("uname");

    $scope.getEXIF = function() {
    
	    var img = document.getElementById('image');

	    //EXIF tag variables 
	    var elat = undefined, elon = undefined, elatRef = undefined, elonRef = undefined;

	    //Get the data from the EXIF file.
	    EXIF.getData(img, function() {
	    	elon = EXIF.getTag(img, 'GPSLongitude');
	    	elonRef = EXIF.getTag(img, 'GPSLongitudeRef');

	        elat = EXIF.getTag(img, 'GPSLatitude');
	        elatRef = EXIF.getTag(img, 'GPSLatitudeRef');

	        if(elat == undefined || elon == undefined)
		    	alert("No GPS data on photo");

		    else{
		        elat = toDecimal(elat, elatRef);
		        elon = toDecimal(elon, elonRef);

		        alert("I was taken by at Latitude:" + elat + " Longitude: " + elon );
		    }
	    });
	}

	//Function to go to the upload screen and pass the image.
	$scope.goUpload = function(){

		$state.go("tab.upload");
	}



	//This function converts the EXIF co-ordinates into decimal co-ordinates.
	var toDecimal = function (number, direction) {
		//Convert it.
		var dec = number[0] + (number[1] / 60) + (number[2]/3600);

		//Round it
		dec = dec.toFixed(7);

		//Check if the decimal value should be minus or not.
		if(direction == 'S' || direction == 'W'){
			dec = dec*-1;
		}
		return dec;
	};

})


//This screen deals with uploading the photo, along with other options attached to the photo.
.controller('UploadCtrl', function($scope, $state, $http) {

	$scope.imgsrc =  window.localStorage.getItem("imgsource");
	$scope.username =  window.localStorage.getItem("uname");

	//Get the users groups so they can select a group to upload to.

	$scope.selectedGroup = null;
	var request = $http({
	    method: "post",
	    url: "http://paddycull.com/map/php/getgroups.php",
	    crossDomain : true,
	    data: {
	        'username':  $scope.username,
		},
	    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
	});

	request.success(function(data) {
		$scope.groups = data;
	});

	$scope.update = function (groupID){
		$scope.selectedGroup = groupID;
	}




	$scope.checksrc = function(){
		alert($scope.imgsrc);
	}

	$scope.uploadPhoto = function() {
		
	    var img = document.getElementById('image');
	    var imageURI = img.src;

	    var options = new FileUploadOptions();
	    options.fileKey = "file";
	    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
	    options.mimeType = "image/jpeg";
	    options.headers = {
	       Connection: "close"
	    };
	    options.chunkedMode = true;

	    var params = new Object();

	    $scope.username =  window.localStorage.getItem("uname");

	    navigator.geolocation.getCurrentPosition( 
	        function(position) { 
	    	  // $scope.hideLoading();
	          params.lon = position.coords.longitude;
	          params.lat = position.coords.latitude;
	          params.uname = $scope.username;
	          params.gid = $scope.selectedGroup;
	          alert(params.lon + ',' + params.lat);

	          //Check if the photo is to be made public or not.
	          if (document.getElementById('checkbox').checked)
				params.pub = 1;
			  else
				params.pub = 0;

	          options.params = params;

	          var ft = new FileTransfer();
	          ft.upload(imageURI, "http://paddycull.com/map/php/upload.php", win, fail, options, true);
	        }, 

	        function() { 
	          alert('Error getting location'); 
	        }
	    );
	}
})

.controller('FriendsCtrl', function($scope, $http, $ionicModal, $ionicPopup) {
  //$scope.friends = Friends.all();
  $scope.username =  window.localStorage.getItem("uname");

  //Get friends of current user, and return query data on success.
	var request = $http({
	    method: "post",
	    url: "http://paddycull.com/map/php/getfriends.php",
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
	$ionicModal.fromTemplateUrl('templates/modals/addFriendModal.html', {
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
            url: "http://paddycull.com/map/php/addFriend.php",
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

	  $scope.deleteFriend = function(fname){

		var confirmPopup = $ionicPopup.confirm({
		     title: 'Confirm Delete',
		     template: 'Are you sure you want to delete "' + fname + '" as a friend?'
		   });
		   confirmPopup.then(function(res) {
		     if(res) {

			    var request = $http({
		            method: "post",
		            url: "http://paddycull.com/map/php/deleteFriend.php",
		            crossDomain : true,
		            data: {
			            'username': $scope.username,
			            'fname': fname,
		        	},
		            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        		});

		     } 
		     else {
		       console.log('You are not sure');
		     }
		   });

	  }


})

.controller('GroupsCtrl', function($scope, $http, $ionicModal, $ionicPopup) {
  $scope.username =  window.localStorage.getItem("uname");
	
	//Get groups current user belongs to, and return query data on success.
	var request = $http({
	    method: "post",
	    url: "http://paddycull.com/map/php/getgroups.php",
	    crossDomain : true,
	    data: {
	        'username':  $scope.username,
		},
	    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
	});

	request.success(function(data) {
		$scope.groups = data;
	});

	//The following code handles the modal popup
	$ionicModal.fromTemplateUrl('templates/modals/joinGroupModal.html', {
	    scope: $scope,
	    animation: 'slide-in-up',
	    focusFirstInput: true
	  }).then(function(modal) {
	    $scope.joinModal = modal;
	  })

	$ionicModal.fromTemplateUrl('templates/modals/createGroupModal.html', {
	    scope: $scope,
	    animation: 'slide-in-up',
	    focusFirstInput: true
	  }).then(function(modal) {
	    $scope.createModal = modal;
	  })   

	  $scope.openModal = function(index) {
	  	if(index == 1){
	  		$scope.joinModal.show();
	  	}
	  	else{
	  		$scope.createModal.show();
	  	}
	  };

	  $scope.closeModal = function(index) {
	  	$scope.responseMessage = "";
	  	if(index == 1){
	  		$scope.joinModal.hide();
	  	}
	  	else{
	  		$scope.createModal.hide();
	  	}
	  };

	  $scope.$on('$destroy', function() {
	    $scope.modal.remove();
	  });

	  //Function to join group. The username and group ID will be inserted into the group memebers table.
	  $scope.joinGroup = function(group){
        var request = $http({
            method: "post",
            url: "http://paddycull.com/map/php/joinGroup.php",
            crossDomain : true,
            data: {
	            'username': $scope.username,
	            'gid': group.gid,
        	},
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        /* Successful HTTP post request or not */
        request.success(function(data) {
            if(data == "1"){
			 $scope.responseMessage = "Added to group!";
            }
            else if(data == "0") {
             $scope.responseMessage = "No group found. Please ensure group ID is correct."
            }  
             else if(data == "2") {
             $scope.responseMessage = "Already part of this group. :)"
            }
        });

	  }

	   $scope.createGroup = function(group){
        var request = $http({
            method: "post",
            url: "http://paddycull.com/map/php/createGroup.php",
            crossDomain : true,
            data: {
	            'gname': group.gname,
	            'gid': group.gid,
	            'username': $scope.username,
        	},
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        /* Successful HTTP post request or not */
        request.success(function(data) {
            if(data == "1"){
			 $scope.responseMessage = "Created Group!";
            }
            else if(data == "0") {
             $scope.responseMessage = "Groud ID already in use. Try another."
            }  
             else if(data == "2") {
             $scope.responseMessage = "Already part of this group. :)"
            }
        });

	  }

	$scope.leaveGroup = function(group){

		var confirmPopup = $ionicPopup.confirm({
		     title: 'Confirm Delete',
		     template: 'Are you sure you want to leave the "' + group.gname + '" group?'
		   });
		   confirmPopup.then(function(res) {
		     if(res) {

			    var request = $http({
		            method: "post",
		            url: "http://paddycull.com/map/php/leaveGroup.php",
		            crossDomain : true,
		            data: {
			            'username': $scope.username,
			            'gid': group.GID,
		        	},
		            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        		});

		     } 
		     else {
		       console.log('You are not sure');
		     }
		   });

	  }
})

.controller('FriendDetailCtrl', function($scope, $stateParams, $http) {
 	 $scope.fname = $stateParams.fname;

	//Get friends photos, and return query data on success.
	var request = $http({
	    method: "post",
	    url: "http://paddycull.com/map/php/getPhotos.php",
	    crossDomain : true,
	    data: {
	        'username':  $scope.fname,
		},
	    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
	});

	request.success(function(data) {
		$scope.photos = data;
		// $scope.photos = $scope.photos.replace("'", "", 'g')
	});


})

.controller('GroupDetailCtrl', function($scope, $stateParams, $http) {
 	 $scope.gid = $stateParams.GID;
 	 $scope.gname = $stateParams.gname;


		//Get groups current user belongs to, and return query data on success.
	var request = $http({
	    method: "post",
	    url: "http://paddycull.com/map/php/getGroupPhotos.php",
	    crossDomain : true,
	    data: {
	        'gid':  $scope.gid,
		},
	    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
	});

	request.success(function(data) {
		$scope.photos = data;
	});


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
            url: "http://paddycull.com/map/php/login.php",
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
            url: "http://paddycull.com/map/php/user.php",
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
