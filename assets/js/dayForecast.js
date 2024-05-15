import { Get, Set } from "./LocalStorage.js";
import { generateElement, createDiv, resetHTML, generateImg } from "./generateElement.js";
import { nextDayForecast } from "./nextDayForecast.js";

const API_KEY = "84991b6146769bdc92f5e3eacd0ff7a5"
const todayMain = document.querySelector(".today--main")
let input = document.querySelector("#location--first")

export function dayForecast(city) {
    if(input.value!==""){
        city= input.value
        Set("city", city)
    }
    let QUERY_URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    fetch(QUERY_URL)
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
        switchMode(city)
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
        resetHTML(".forecast__main")
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

let dayMode = "linear-gradient(150deg, rgba(41,178,221,1) 0%, rgba(51,170,221,1) 47%, rgba(45,200,234,1) 100%)"
let nightMode = "linear-gradient(150deg, rgba(8,36,79,1) 0%, rgba(19,76,181,1) 47%, rgba(11,66,171,1) 100%)"

export function switchMode(city) {
    let now = Date.now()
    console.log(now);
    
    const API_KEY = "84991b6146769bdc92f5e3eacd0ff7a5";
    let QUERY_URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    fetch(QUERY_URL)
    .then((response) => response.json())
        .then((json) => {
            let sunrise = json.sys.sunrise*1000
            let sunset = json.sys.sunset*1000
            let isDay = now>sunrise && now<sunset
            if (isDay) {
                document.documentElement.style.setProperty("--backgroundMain", dayMode)
            } else {
                document.documentElement.style.setProperty("--backgroundMain", nightMode)
            }
        })
}