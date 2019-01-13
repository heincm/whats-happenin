//  key
// AIzaSyDyCF43TkJJ6Pvfw7SISvyo1ItMHngisIU
//key with geolocation
// AIzaSyBvEsZp3Z49T2t5Eno1sMOJ3Dif_16z6_4
function initMap() {
    // Map Options
    let options = {
        zoom: 8,
        center: { lat: 33.7490, lng: -84.3880 }
    }
// New Map
    let map = new 
    google.maps.Map(document.getElementById('map'), options);

//Listen for click on map
google.maps.event.addListener(map, 'click', function(event){
    //add marker
    addMarker({coords:event.latLng});

    
});

    //Array of Markers
    let markers = [
        {
    coords:{lat:34.0029, lng:-84.1446},
    inconImage:'https://maps.google.com/mapfiles/kml/shapes/library_maps.png',
    content:'<h1>whatever</h1>'
    }
    ];

    //add marker
  for(let i = 0; i < markers.length; i++){
addMarker(markers[i]);
  }

    // add marker function
    function addMarker(props){
        let marker = new google.maps.Marker({
                 position:props.coords,
                 map:map,
                 icon:props.inconImage
             });
             //check if image
             if(props.inconImage){
               marker.setIcon(props.inconImage);

             }

             //check content
             if(props.content){

 let infowindow = new google.maps.InfoWindow({
     content:props.content
 });

 marker.addListener('click', function(){
     infowindow.open(map, marker);
 });
             }
    }
//geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          let pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent('Location found.');
          infoWindow.open(map);
          map.setCenter(pos);
        }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(map);


      //food
















}