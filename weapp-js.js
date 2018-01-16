
var lat, lon, info;


function getLocation() {
    if (navigator.geolocation) {
        //ur browser support geolocation:
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        //if ur browser does not support:
        alert("Geolocation is not supported by this browser.");
    }
}

//get the latitude and longitude defined:
function showPosition(position) {
    info = position;
    lat = "Latitude: " + position.coords.latitude ;
    lon = "Longitude: " + position.coords.longitude;
}

//Error messages:
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.")
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.")
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.")
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.")
            break;
    }
}

getLocation();
