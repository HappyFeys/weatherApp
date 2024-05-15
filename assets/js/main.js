import { Get, Set } from "./LocalStorage.js";
import { dayForecast } from "./dayForecast.js";
import { nextDayForecast } from "./nextDayForecast.js";
import { hourForecast, GetDate } from "./hourForecast.js";
import { switchMode } from "./nightMode.js";



let today = Get("city", null )
if(today!==null){
    dayForecast(today)
    hourForecast(today)
    nextDayForecast(today)
    switchMode(today)
}

GetDate()
