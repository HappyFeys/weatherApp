import { Get, Set } from "./LocalStorage.js";
import { generateElement, createDiv, resetHTML, generateImg } from "./generateElement.js";
import { switchDay } from "./hourForecast.js";
// import { Chart} from '../../node_modules/chart.js/auto/auto.js'


const API_KEY = "84991b6146769bdc92f5e3eacd0ff7a5"
let input = document.querySelector("#location--first")
const nextDay = document.querySelector(".forecast__main")

export function nextDayForecast(city) {
    getCoord(city)
        .then(({ lat, lon }) => {
            let QUERY_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
            return fetch(QUERY_URL);
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            let x = 0
            for (let i = 0; i < json.list.length; i++) {
                let timestampConvert = new Date((json.list[i].dt)*1000)
                let hour = timestampConvert.getHours()
                let day = timestampConvert.getDay()
                let dayString = switchDay(day)
                if ((hour-2)==12) {
                    createDiv(nextDay,"forecast--day")
                    let forecastDay = document.querySelectorAll(".forecast--day")
                    generateElement("p",dayString, forecastDay[x])
                    generateImg(`https://openweathermap.org/img/wn/${json.list[i].weather[0].icon}.png`,"icon",forecastDay[x])
                    createDiv(forecastDay[x],"temp")
                    const temp= document.querySelectorAll(".temp")
                    generateElement("p", `${Math.floor(json.list[i].main.temp_max)}°C`,temp[x],"maxTemperature")
                    generateElement("p", `${Math.floor(json.list[i].main.temp_min)}°C`,temp[x],"minTemperature")
                    x++
                }
            }
        })
        .catch((error) => {
            console.log("Une erreur s'est produite !", error);
        });
}


export function getCoord(city) {
    return new Promise((resolve, reject) => {
        let QUERY_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
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



export async function getTemperature(city) {
    getCoord(city)
        .then(({ lat, lon }) => {
            let QUERY_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
            return fetch(QUERY_URL);
        })
        .then((response) => response.json())
        .then((json) => {
            const labels = [];
            const temperature = [];

            json.list.forEach(entry => {
                const dateTime = new Date(entry.dt * 1000);
                labels.push(`${dateTime.getDate()}/${dateTime.getMonth() + 1} ${(dateTime.getHours()<10)? "0"+dateTime.getHours(): dateTime.getHours() }:00`);
                temperature.push(entry.main.temp);
            })
            const ctx = document.querySelector("#acquisition").getContext('2d');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Températures (°C)',
                    data: temperature,
                    backgroundColor: '#FF0000',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });

        })
        .catch((error) => {
            console.log("Une erreur s'est produite !", error);
        });
}