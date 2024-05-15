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
            if (now>sunrise && now<sunset) {
                document.documentElement.style.setProperty("--backgroundMain", dayMode)
            } else document.documentElement.style.setProperty("--backgroundMain", nightMode)
        })
}