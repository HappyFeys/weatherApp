import { Get, Set } from "./LocalStorage.js";
import { generateElement, createDiv, resetHTML, generateImg } from "./generateElement.js";
import { nextDayForecast } from "./nextDayForecast.js";

const API_KEY = "84991b6146769bdc92f5e3eacd0ff7a5"
const todayMain = document.querySelector(".today--main")
let input = document.querySelector("#location--first")

export function dayForecast(city) {
    let QUERY_URL;
    if(input.value!==""){
        city= input.value
        Set("city", city)
    }
    QUERY_URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    fetch(QUERY_URL)
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
        switchImage(json.weather[0].main)
        generateElement("h1", json.name, todayMain)
        generateElement("p", `${Math.floor(json.main.temp)}°C`, todayMain, "today--temperature");
        generateElement("p", json.weather[0].main,todayMain,"today--precipitation");
        generateElement("p", `Max. : ${Math.floor(json.main.temp_max)}°C  Min. : ${Math.floor(json.main.temp_min)}°C`,todayMain, "today--minmax");
        createDiv(todayMain, "today--other");
        const todayOther = document.querySelector(".today--other");
        createDiv(todayOther, "humidity")
        const humidity = document.querySelector(".humidity")
        createDiv(todayOther, "wind")
        const wind = document.querySelector(".wind")
        if(!json.rain==undefined){ 
            createDiv(todayOther, "rain")
            const rain = document.querySelector(".rain")
            generateElement("span", "rainy_light", rain, "material-symbols-outlined");
            generateElement("p",`${json.rain}mm`,rain);
        }
        generateElement("span", "humidity_high", humidity, "material-symbols-outlined");
        generateElement("p",`${json.main.humidity}%`, humidity)
        generateElement("span", "air", wind, "material-symbols-outlined");
        generateElement("p", `${Math.floor(json.wind.speed)}km/h`,wind)
        })
        .catch((error) => {
            console.log("There was an error!", error);
        });
    
}
    
input.addEventListener("keyup", (e)=>{
    if(e.code ==="Enter"){
        resetHTML(".today--main")
        dayForecast(e.target.value)
        nextDayForecast(e.target.value)     
    }
})

function switchImage(json) {
    switch (json) {
        case "Clouds":
            generateImg("/assets/img/iconsWeather/day/DayClouds.svg", "Clouds", todayMain)
            break;
        case "Rain":
            generateImg("/assets/img/iconsWeather/day/DayRain.svg", "Rain", todayMain)
            break;
        case "Snow":
            generateImg("/assets/img/iconsWeather/day/DaySnow.svg", "Snow", todayMain)
            break;
        case "Thunderstorm":
            generateImg("/assets/img/iconsWeather/day/DayStorm.svg", "Thunderstorm", todayMain)
            break;
        case "Atmosphere":
            generateImg("/assets/img/iconsWeather/day/DayWind.svg", "Squall", todayMain)
            break;
    
        default:
            generateImg("/assets/img/iconsWeather/day/DayWind.svg", "Sunny Day", todayMain)
            break;
    }
}