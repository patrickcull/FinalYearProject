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

    console.log(imageURI);

    window.localStorage.setItem("imgsource", imageURI);

    // Get image handle
    var cameraImage = document.getElementById('image');
    var uploadB = document.getElementById('uploadButton');
    uploadB.style.display = 'block';

    // Unhide image elements
    cameraImage.style.display = 'block';

    // Show the captured photo
    cameraImage.src = imageURI;
}

//When photo is loaded from gallery
function onPhotoURISuccess(imageURI) {
    console.log(imageURI);

    window.localStorage.setItem("imgsource", imageURI);

    // Unhide image elements
    var galleryImage = document.getElementById('image');
    galleryImage.style.display = 'block';

    //Unhide Upload Button.
    var uploadB = document.getElementById('uploadButton');
    uploadB.style.display = 'block';

    // Show the captured photo
    galleryImage.src = imageURI;
}

// This function is called by the take photo button.
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

// This function is called by the browse gallery button.
function getPhoto(source) {

    var img = document.getElementById('image');
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {
        quality: 80,
        destinationType: destinationType.FILE_URI,
        sourceType: source
    });
}

// Called if image fails to be loaded
function onFail(message) {
    alert('Failed because: ' + message);
}

//These functions are called when the photo gets uploaded successfully.
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