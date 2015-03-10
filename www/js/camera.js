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

//When a photo is taken
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

//When photo is loaded from gallery
function onPhotoURISuccess(imageURI) {
    console.log(imageURI);
    var galleryImage = document.getElementById('image');
    // Unhide image elements
    galleryImage.style.display = 'block';
    // Show the captured photo
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
        destinationType: destinationType.FILE_URI,
        sourceType: source
    });
}



// Called if something bad happens.
function onFail(message) {
    alert('Failed because: ' + message);
}

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