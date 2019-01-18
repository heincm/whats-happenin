let map;
let infoWindow;
let service;
//function callGoogle(){
function initMap() {


    infoWindow = new google.maps.InfoWindow;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
localStorage.setItem("lat", pos.lat);

localStorage.setItem("lng", pos.lng);

            map = new google.maps.Map(document.getElementById('map'), {
                center: pos,
                zoom: 15
            });
            //   currentLocation= pos;
            generateService(map, pos);
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }
   
}


function generateService(map, currentLocation){
    let service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: currentLocation,
        openNow: true,    
        radius: 1000,
        type: "restaurant", 
    }, callback);

  
}
function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
            console.log(results[i]);
            console.log(results[i].photos[0].getUrl());
            //image url for the place:
            let imageUrl = results[i].photos[0].getUrl();
            //name: 
            let placeName = results[i].name;
            //price level (1-4)
            let priceLevel = results[i].price_level;


            //ratings:
            let rating = results[i].rating;
            let totalNumberRatings = results[i].user_ratings_total;   
            //address
            let placeAddress = results[i].vicinity;


            
            let newDiv = $(`
            <div>
                <img src=${imageUrl}></img>
                <h1>${placeName}</h1>
                <h2>Address: ${placeAddress}</h2>
                <h3>Price: ${priceLevel}</h3>
                <h4>Rating: ${rating} out of ${totalNumberRatings} total feedback.</h4>
            </div>   
            `)
               
           
            $("#resultsList").append(`
                <div class='row center'>
                    <div class='content col s12'>
                        <div class='card-panel teal lighten-4'>
                <span class='black-text'>${newDiv}</span>
                        </div>
                    </div>
                </div>
                `);
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
   
    let marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.setContent(place.name);
        infoWindow.open(map, this);
    });
}


