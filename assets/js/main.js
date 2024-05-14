import { Get, Set } from "./LocalStorage.js";
import { dayForecast } from "./api.js";



let today = Get("city", null )
if(today!==null){
    dayForecast(today)
}

