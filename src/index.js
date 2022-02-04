function displayTemperature(response) {
    let temperatureDisplay = document.querySelector(".display-temperature")
    let cityDisplay = document.querySelector(".display-city")
    let weatherDescription = document.querySelector(".weather-description")
    let humidityInfo = document.querySelector(".humidity")
    let windInfo = document.querySelector(".wind")
    temperatureDisplay.innerHTML = Math.round(response.data.main.temp);
    cityDisplay.innerHTML = response.data.name
    weatherDescription.innerHTML = response.data.weather[0].description;
    humidityInfo.innerHTML = response.data.main.humidity;
    windInfo.innerHTML = Math.round(response.data.main.wind.speed);
}






let apiKey = "51c2d0279e8058f0ab3458acaad89de5";
let apiUrl = `https://api.openweathermap.org /data/2.5/ weather?lat={lat}&lon={lon}&appid=${apiKey}&units=imperial`;



