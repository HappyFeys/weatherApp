import { Get, Set } from "./LocalStorage.js";
import { dayForecast } from "./dayForecast.js";
import { nextDayForecast } from "./nextDayForecast.js";
import { hourForecast, GetDate } from "./hourForecast.js";
import { getCoordinates } from "./geolocalisation.js";



let today= Get("city", null)
if(today==null){
    getCoordinates()
    document.addEventListener("coordinatesReady", async()=>{
        today =await Get("city", getCoordinates())
        executeWeatherForecast(today)
    }) 
}else{
executeWeatherForecast(today)
}


GetDate()

function executeWeatherForecast(city) {
    dayForecast(city)
    hourForecast(city)
    nextDayForecast(city)
}