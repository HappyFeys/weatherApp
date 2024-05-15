import { Get, Set } from "./LocalStorage.js";
import { generateElement, createDiv, resetHTML, generateImg } from "./generateElement.js";
import { getCoord } from "./nextDayForecast.js";

const API_KEY = "84991b6146769bdc92f5e3eacd0ff7a5";
const hourByHour = document.querySelector(".today__main");

export function hourForecast(city) {
    getCoord(city)
        .then(({ lat, lon }) => {
            let QUERY_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
            return fetch(QUERY_URL);
        })
        .then((response) => response.json())
        .then((json) => {
            for (let i = 0; i < 5; i++) {
                let timestampConvert = new Date((json.list[i].dt)*1000)
                let hour = timestampConvert.getHours()
                createDiv(hourByHour, "today--hour")
                let todayMain = document.querySelectorAll(".today--hour")
                generateElement("p",`${Math.floor(json.list[i].main.temp)}°C`,todayMain[i])
                generateImg(`https://openweathermap.org/img/wn/${json.list[i].weather[0].icon}.png`,"icon",todayMain[i])
                generateElement("p", `${hour-2}h00`,todayMain[i])
            }
            console.log(json.list[0]);
        })
        .catch((error) => {
            console.log("Une erreur s'est produite !", error);
        });
}


export function GetDate() {
    const todayDate = document.querySelector("#today__date")

    let today = new Date()
    let day = today.getDay()
    let numberDay = today.getDate()
    
    todayDate.innerText = `${switchDay(day)} ${numberDay}`
}

export function switchDay(day) {
    switch (day) {
        case 0:
            day="Sun."
            break;
        case 1:
            day="Mon."
            break;
        case 2:
            day="Tue."
            break;
        case 3:
            day="Wed."
            break;
        case 4:
            day="Thur."
            break;
        case 5:
            day="Fri."
            break;
        case 6:
            day="Sat."
            break;
    
        default:
            break;
    }
    return day
}