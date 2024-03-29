<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
    <title></title>

    <link href="lib/ionic/css/ionic.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">

    <!-- IF using Sass (run gulp sass first), then uncomment below and remove the CSS includes above
    <link href="css/ionic.app.css" rel="stylesheet">
    -->

    <!-- ionic/angularjs js -->
    <script src="lib/ionic/js/ionic.bundle.js"></script>

    <!-- cordova script (this will be a 404 during development) -->
    <script src="cordova.js"></script>

    <!-- your app's js -->
    <script src="js/app.js"></script>
    <script src="js/controllers.js"></script>
    <script src="js/services.js"></script>
    <script src="http://code.ionicframework.com/1.0.0-beta.9/js/ionic.bundle.js"></script>
    <script src="js/contacts.js"></script>
    <script src="js/camera.js"></script>


        <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7/leaflet.css"/>
    <script src="http://cdn.leafletjs.com/leaflet-0.7/leaflet.js"></script>
     <script src="http://cdn-geoweb.s3.amazonaws.com/esri-leaflet/0.0.1-beta.5/esri-leaflet-core.js"></script>
      <!-- Esri Leaflet Geocoder -->
      <script src="http://cdn-geoweb.s3.amazonaws.com/esri-leaflet-geocoder/0.0.1-beta.3/esri-leaflet-geocoder.js"></script>
      <link rel="stylesheet" type="text/css" href="http://cdn-geoweb.s3.amazonaws.com/esri-leaflet-geocoder/0.0.1-beta.3/esri-leaflet-geocoder.css">

      <!--MarkerCLusterer-->
      <link rel="stylesheet" href="css/MarkerCluster.css" />
    <link rel="stylesheet" href="css/MarkerCluster.Default.css" />
    <script src="js/leaflet.markercluster-src.js"></script>
    <script src="realworld.388.js"></script>

  </head>
  <body ng-app="starter" animation="slide-left-right-ios7">
    <!-- 
      The nav bar that will be updated as we navigate between views.
    -->
    <ion-nav-bar class="bar-positive nav-title-slide-ios7">
      <ion-nav-back-button class="button-icon icon  ion-ios7-arrow-back">
        Back
      </ion-nav-back-button>
    </ion-nav-bar>
    <!-- 
      The views will be rendered in the <ion-nav-view> directive below
      Templates are in the /templates folder (but you could also
      have templates inline in this html file if you'd like).
    -->
    <ion-nav-view></ion-nav-view>
  </body>


    <script type="text/javascript">


    //Set the default view
    var map = L.map('map').setView([-41.2858, 174.78682], 12);

    //Add the map layer
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
    }).addTo(map);

    //Load the pins from DB using PHP
    var pins = <?php include 'php/query.php'; ?>

    /*//Non markercluster version

      for (var i = 0; i < pins.length; i++) {
    marker = new L.marker([pins[i][1],pins[i][2]])
    .bindPopup(pins[i][0])
    .addTo(map);
    }*/

    //Load pins onto map one by one
    var markers = L.markerClusterGroup({ disableClusteringAtZoom: 15 });
    
    for (var i = 0; i < pins.length; i++) {
      var a = pins[i];
      var title = a[0];
      var marker = L.marker(new L.LatLng(a[1], a[2]), { title: title });
      marker.bindPopup(title);
      markers.addLayer(marker);
    }

    map.addLayer(markers);

    //Set up search bar
    var searchControl = new L.esri.Controls.Geosearch({
        position:'topright',
        expanded:'true'
        }).addTo(map);

    // listen for the results event and add every result to the map
    var results = new L.LayerGroup().addTo(map);

        searchControl.on("results", function(data){
        results.clearLayers();
        for (var i = data.results.length - 1; i >= 0; i--) {
          results.addLayer(L.marker(data.results[i].latlng));
        };
      });




  </script>
</html>
