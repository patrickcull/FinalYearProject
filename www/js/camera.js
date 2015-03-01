var pictureSource; // picture source
var destinationType; // sets the format of returned value
// Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);
// device APIs are available
//

function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
}
// Called when a photo is successfully retrieved
//

function onPhotoDataSuccess(imageURI) {
    // Uncomment to view the base64-encoded image data
    console.log(imageURI);
    alert(imageURI);
    // Get image handle
    //
    var cameraImage = document.getElementById('image');
    // Unhide image elements
    //
    cameraImage.style.display = 'block';
    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    cameraImage.src = imageURI;
}
// Called when a photo is successfully retrieved
//

function onPhotoURISuccess(imageURI) {
    // Uncomment to view the image file URI
    console.log(imageURI);
    // Get image handle
    //
    var galleryImage = document.getElementById('image');
    // Unhide image elements
    //
    galleryImage.style.display = 'block';
    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    galleryImage.src = imageURI;
}
// A button will call this function
//

function capturePhoto() {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality: 80,
        targetWidth: 600,
        targetHeight: 600,
        destinationType: destinationType.FILE_URI,
        saveToPhotoAlbum: false
    });
}
// A button will call this function
//

function getPhoto(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {
        quality: 80,
        //targetWidth: 600,
        //targetHeight: 600,
        destinationType: destinationType.FILE_URI,
        sourceType: source
    });
}
// Called if something bad happens.
//

function onFail(message) {
    alert('Failed because: ' + message);
}

// function uploadPhoto(username) {
//     alert('Fire One'); 
//     var img = document.getElementById('image');
//     var imageURI = img.src;
//     var options = new FileUploadOptions();
//     options.fileKey = "file";
//     options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
//     options.mimeType = "image/jpeg";
//     options.headers = {
//        Connection: "close"
//     };
//     options.chunkedMode = false;


//     var params = new Object();

//     //$scope.username =  window.localStorage.getItem("uname");
//     alert(username);

//     navigator.geolocation.getCurrentPosition( 
//         function(position) { 
//           params.lon = position.coords.longitude;
//           params.lat = position.coords.latitude;
//           params.username = $scope.username;
//           alert(params.lon + ',' + params.lat); 

//           options.params = params;

//           var ft = new FileTransfer();
//           ft.upload(imageURI, "http://patrick-cull.com/map/php/upload.php", win, fail, options, true);
//         }, 

//         function() { 
//           alert('Error getting location'); 
//         }
//     );

//     //navigator.geolocation.getCurrentPosition(onSuccess, onError);

// }

function win(r) {
   alert("success");
   alert("Sent = " + r.bytesSent);
}

function fail(error) {
   alert("error");
   switch (error.code) {
     case FileTransferError.FILE_NOT_FOUND_ERR:
        alert("Photo file not found");
        break;
     case FileTransferError.INVALID_URL_ERR:
       alert("Bad Photo URL");
       break;
     case FileTransferError.CONNECTION_ERR:
       alert("Connection error");
       break;
   }
   alert("An error has occurred: Code = " + error.code);
}

 function onSuccess(position) {
           alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
    }

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }