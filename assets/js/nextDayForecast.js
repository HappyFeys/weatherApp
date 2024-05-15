import { Get, Set } from "./LocalStorage.js";
import { generateElement, createDiv, resetHTML, generateImg } from "./generateElement.js";

const API_KEY = "84991b6146769bdc92f5e3eacd0ff7a5"
let input = document.querySelector("#location--first")
const nextDay = document.querySelector(".forecast__main")

export function nextDayForecast(city) {
    getCoord(city)
        .then(({ lat, lon }) => {
            let QUERY_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
            return fetch(QUERY_URL);
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            // console.log(json.);
        })
        .catch((error) => {
            console.log("Une erreur s'est produite !", error);
        });
}


export function getCoord(city) {
    return new Promise((resolve, reject) => {
        let QUERY_URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        fetch(QUERY_URL)
            .then((response) => response.json())
            .then((json) => {
                let lat = json.coord.lat;
                let lon = json.coord.lon;
                resolve({ lat, lon });
            })
            .catch((error) => {
                reject(error);
            });
    });
}

