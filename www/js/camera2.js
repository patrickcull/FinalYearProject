
    var pictureSource;   // picture source
    var destinationType; // sets the format of returned value

    // Wait for device API libraries to load
    //
    document.addEventListener("deviceready",onDeviceReady,false);

    // device APIs are available
    //
    function onDeviceReady() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoDataSuccess(imageData) {
      // Uncomment to view the base64-encoded image data
      // console.log(imageData);

      // Get image handle
      //
      var smallImage = document.getElementById('smallImage');
      var largeImage = document.getElementById('largeImage');


      // Unhide image elements
      //
      largeImage.style.display = 'none';
      smallImage.style.display = 'block';

      // Show the captured photo
      // The in-line CSS rules are used to resize the image
      //
      smallImage.src = "data:image/jpeg;base64," + imageData;
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoURISuccess(imageURI) {
      // Uncomment to view the image file URI
      // console.log(imageURI);

      // Get image handle
      //
      var smallImage = document.getElementById('smallImage');
      var largeImage = document.getElementById('largeImage');

      // Unhide image elements
      //
      smallImage.style.display = 'none';
      largeImage.style.display = 'block';

      // Show the captured photo
      // The in-line CSS rules are used to resize the image
      //
      largeImage.src = imageURI;
    }

    // A button will call this function
    //
    function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { 
        quality: 50,
        destinationType: destinationType.DATA_URL 
      });
    }

    // A button will call this function
    //
    function capturePhotoEdit() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { 
        quality: 20, 
        allowEdit: true,
        destinationType: destinationType.DATA_URL 
      });
    }

    // A button will call this function
    //
    function getPhoto(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { 
        quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source 
      });
    }

    /*function uploadPhoto() {      // Get URI of picture to upload
            var img = document.getElementById('largeImage');
            var imageURI = img.src;
            if (!imageURI || (img.style.display == "none")) {
                document.getElementById('camera_status').innerHTML = "Take picture or select picture from library first.";
                return;
            }        // Verify server has been entered
            server = "http://patrick-cull.com/map/php/upload.php";
            if (server) {               // Specify transfer options
                var options = new FileUploadOptions();
                options.fileKey = "file";
                options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
                options.mimeType = "image/jpeg";
                options.chunkedMode = false; // Transfer picture to server
                var ft = new FileTransfer();
                ft.upload(imageURI, server, function(r) {
                    document.getElementById('camera_status').innerHTML = "Upload successful: " + r.bytesSent + " bytes uploaded.";
                }, function(error) {
                    document.getElementById('camera_status').innerHTML = "Upload failed: Code = " + error.code;
                }, options);
            }
        }*/

  function uploadPhoto() {
    var img = document.getElementById('image');
    var imageURI = img.src;
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    var params = new Object();
    options.params = params;
    options.chunkedMode = false;
    var ft = new FileTransfer();
    ft.upload(imageURI, "https://www.example.com/upload.php", win, fail,
        options);
}
 
function win(r) {
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
}
 
function fail(error) {
    alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}


    // Called if something bad happens.
    //
    function onFail(message) {
      alert('Failed because: ' + message);
    }