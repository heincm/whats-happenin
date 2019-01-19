let map;
let infoWindow;
let service;


function initMap() {

    infoWindow = new google.maps.InfoWindow;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            // save users current location in local storage
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

};



function generateService(map, currentLocation) {
    let service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: currentLocation,
        openNow: true,
        radius: 16000,
        type: "restaurant",
    }, callback);


}
function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {

            //image url for the place:
            let imageUrl = results[i].photos[0].getUrl();
            //name: 
            let placeName = results[i].name;
            //price level (1-4)
            let priceLevel = results[i].price_level;
            //ratings:
            let rating = results[i].rating + " " + "out of";
            //total ratings:
            let totalNumberRatings = results[i].user_ratings_total + " " + "total feedback.";
            //address
            let placeAddress = results[i].vicinity;
            //display messages for undefined values
            let displayMessage = " ";


            // Display numbers as $ for price level
            if (priceLevel === 1) {
                displayMessage = "$";
                priceLevel = "";
            }
            if (priceLevel === 2) {
                displayMessage = "$$";
                priceLevel = "";
            }
            if (priceLevel === 3) {
                displayMessage = "$$$";
                priceLevel = "";
            }
            if (priceLevel === 4) {
                displayMessage = "$$$$";
                priceLevel = "";
            }

            // handle cases where there is no price level or ratings
            if (priceLevel === undefined) {
                displayMessage = "No price level at this time.";
                priceLevel = "";
            }
            if (rating === undefined) {
                displayMessage = "No user rating at this time.";
                rating = "";
            }
            if (totalNumberRatings === undefined) {
                displayMessage = " ";
                totalNumberRatings = "";
            }

            $("#resultsList").append(`
                <div class='row center'>
                    <div class='content col s12'>
                        <div class='card-panel grey lighten-2'>
                <span class='black-text'>
                <p>${placeName}</p>
                <img class="responsive-img" src=${imageUrl}/>
                <p>Address: ${placeAddress}</p>
                <p>Price: ${priceLevel} ${displayMessage}</p>
                <p>Rating: ${rating} ${totalNumberRatings}</p>
                </span>
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

