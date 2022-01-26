// formating and iterating through a loop.
function checkTime(i) {
    return i < 10 ? "0" + i : i;
}

function formatDate() {
    let now = new Date();
    let hours = checkTime(now.getHours());
    let minutes = checkTime(now.getMinutes());
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    let day = days[now.getDay()];

    return ` ${day} ${hours}:${minutes}`;
}
//calling a function and where to display
let todayDate = document.querySelector("#time-top");
todayDate.innerHTML = formatDate(new Date());

// get input call next function - still broken
function citySearch(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    let city = searchInput.value;
    let apiKey = "cddc96904d3de11c1e3219f906f672dd";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    let displayCity = document.querySelector("#head-three");
    displayCity.innerHTML = searchInput.value;

    //if statement to catch empty input field
    if (searchInput.value) {
        displayCity.innerHTML = searchInput.value;
    } else {
        displayCity.innerHTML = null;
        alert("Please enter a city");
    }
    // using axios for api call then calling the next function
    axios.get(url).then(dataDisplay);
}

//get data display data
function dataDisplay(response) {
    let temp = Math.round(response.data.main.temp);
    let displayTemp = document.querySelector("#currentTemp");
    let weatherDescrip = document.querySelector("#weatherDescription");
    let description = response.data.weather[0].description;
    displayTemp.innerHTML = `${temp}°`;
    weatherDescrip.innerHTML = description;
}

// let celsiusTemperature = Math.round(temperature);
// let fahrenheitTemperature = Math.round((temperature * 9) / 5 + 32);

// current location function which pull city name and weather
function positionTrigger(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let apiKey = "cddc96904d3de11c1e3219f906f672dd";
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${apiKey}`;

    // using axios for api call. passing in anon function
    axios.get(url).then(function (response) {
        let displayTemp = document.querySelector("#currentTemp");
        let displayCity = document.querySelector("#head-three");
        let weatherDescrip = document.querySelector("#weatherDescription");
        let description = response.data.weather[0].description;
        let temp = Math.round(response.data.main.temp);
        let city = response.data.name;
        console.log(temp);
        console.log(city);
        weatherDescrip.innerHTML = description;
        displayTemp.innerHTML = `${temp}°`;
        displayCity.innerHTML = city;
    });
}

// this gets called from event listener then calls position trigger for geolcation to display with temp.
function triggerGeo(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(positionTrigger);
}

// this triggers search bar for client to enter in name of city
let form = document.querySelector("#search-form");
form.addEventListener("submit", citySearch);

// this triggers current button for geolcation
let button = document.querySelector("#current");
button.addEventListener("click", triggerGeo);
