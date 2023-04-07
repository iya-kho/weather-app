import { getCitybyCoords, getCoordsbyCity, getTimeDate, getWeatherbyCoords, showWeatherStart } from "./js/helpers.js";

// Find DOM elements

let dropdown = document.querySelector('#dropdown');
let weatherBox = document.querySelector('#weather-container');
let timeBox = weatherBox.querySelector('.time-date');
let locationBox = weatherBox.querySelector('.location');
let tempBoxes = Array.from(document.querySelectorAll('.temp'));
let iconBoxes = Array.from(document.querySelectorAll('.icon'));
let weatherDescrBox = weatherBox.querySelector('.weather-description');
let weatherDescrCenterBox = document.querySelector('.weather-description.center')
let windBox = weatherBox.querySelector('.wind-text');
let presBox = weatherBox.querySelector('.pressure-text');
let humBox = weatherBox.querySelector('.humidity-text');
let visBox = weatherBox.querySelector('.visibility-text');

// Get the weather data and show it in DOM

let city;

async function showWeather(_e, coords) {
    if (!coords) {
        city = dropdown.options[dropdown.selectedIndex].text;
        coords = await getCoordsbyCity(city);
    }

    localStorage.coords = JSON.stringify(coords);

    let weatherData = await getWeatherbyCoords(coords);

    let country = weatherData.sys.country;
    let temp = Math.round(weatherData.main.temp);
    let feelsLike = Math.round(weatherData.main.feels_like);
    let descrMain = weatherData.weather[0].main;
    let descr = weatherData.weather[0].description;
    let icon = weatherData.weather[0].icon;
    let humidity = weatherData.main.humidity;
    let pressure = weatherData.main.pressure;
    let visibility = weatherData.visibility;
    let windSpeed = weatherData.wind.speed;

    locationBox.textContent = `${city}, ${country}`;
    tempBoxes.map((tempBox => tempBox.textContent = `${temp}\xb0 C`));
    weatherDescrBox.textContent = `Feels like ${feelsLike}\xb0 C. ${descrMain}, ${descr}.`;
    weatherDescrCenterBox.textContent = descr.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    iconBoxes.map((iconBox) => iconBox.src = `https://openweathermap.org/img/wn/${icon}@2x.png`);
    windBox.textContent = `${windSpeed.toFixed(1)} m/s`;
    humBox.textContent = `${humidity} %`;
    presBox.textContent = `${pressure} hPa`;
    visBox.textContent = `${visibility / 1000} km`;
    timeBox.textContent = getTimeDate();

}

// Show data for user's current location or the last chosen location

navigator.geolocation.getCurrentPosition(
    async (data) => {
        let coords = { lat: data.coords.latitude, lon: data.coords.longitude }
        city = await getCitybyCoords(coords);
        showWeatherStart(city, dropdown);
        showWeather(null, coords);
    },

   async (error) => {
        let coords = JSON.parse(localStorage.coords);
        city = await getCitybyCoords(coords);
        if (city.length >= 20) {
            locationBox.classList.add('reduce-font');
        }
        showWeatherStart(city, dropdown);
        showWeather(null, coords);
        console.log(error)
    }
)

// Show data for chosen locations

dropdown.addEventListener('change', showWeather);














