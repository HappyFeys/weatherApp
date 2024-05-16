import { Get, Set } from "./LocalStorage.js";

// Step 1: Get user coordinates 
export function getCoordinates() {
    let options = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos) {
        let crd = pos.coords;
        let lat = crd.latitude.toString();
        let lng = crd.longitude.toString();
        let coordinates = [lat, lng];
        console.log(`Latitude: ${lat}, Longitude: ${lng}`);
        getCity(coordinates);
        return;
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
}

// Step 2: Get city name 
function getCity(coordinates) {
    let lat = coordinates[0];
    let lng = coordinates[1];

    // Call api
    const apiKeyLocation="pk.154f1d8042bf9d082c7c9b8df31190b8"
    const api = fetch("https://us1.locationiq.com/v1/reverse.php?key=" + apiKeyLocation + "&lat=" + lat + "&lon=" + lng + "&format=json")
    const response = api.then((response) => response.text());
    response.then((text) => {
        text = JSON.parse(text)
        console.log(text.address);
        if (text.address.town) {
            Set("city",text.address.town)
        } else if(text.address.city) {
            Set("city",text.address.city)
        }else{
            Set("city",text.address.village)
        }
        
    })
    //ici l'évent
    const coordinatesReadyEvent = new Event('coordinatesReady')
    document.dispatchEvent(coordinatesReadyEvent)
}