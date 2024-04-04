
document.addEventListener('DOMContentLoaded', function() {
    const dots = document.querySelectorAll('.dot');
    
    // Function to handle dot click
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            // Remove active class from all dots
            dots.forEach(dot => dot.classList.remove('active'));
            // Add active class to clicked dot
            dot.classList.add('active');
            // Navigate to the second page
            if (index === 0) {
                document.getElementById('second-page-link').click();
            }
        });
    });
});

const app = document.querySelector('.wrapper');
const hourly = document.querySelector('.hourly');
const week = document.querySelector('.week-active');
const c = document.querySelector('.celcius active');
const f = document.querySelector('.fahrenheitr');
const uvindex = document.querySelector('.uv-index');
const uvtext = document.querySelector('.uv-text');
const windspeed = document.querySelector('.wind-speed');
const windspeedtext = document.querySelector('.wind-speed-text');
const sunrise = document.querySelector('.sun-rise');
const sunrisetext = document.querySelector('.sun-rise-text');
const sunset = document.querySelector('.sun-set');
const winddirection = document.querySelector('.arrow rotate-45t');
const visibility = document.querySelector('.visibilty');
const visibilitystatus = document.querySelector('.visibilty-status');
const aq = document.querySelector('.air-quality');
const aqstatus = document.querySelector('.air-quality-status');
const humidity = document.querySelector('.humidity');
const humiditystatus = document.querySelector('.humidity-status');
const prec = document.querySelector('.prec');
const precstatus = document.querySelector('.prec-status');

document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the location from local storage
    const cityInput = localStorage.getItem('search');

    // Check if location is available
    if (cityInput) {
        // Fetch weather data using the retrieved cityInput
        fetchWeatherData(cityInput);
    } else {
        console.error('Location data not found in local storage.');
    }
});


function fetchWeatherData(cityInput) {
    fetch(`https://api.weatherapi.com/v1/current.json?key=6e588b6ddd9e4dd980974334243103&q=${cityInput}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Update the webpage content with fetched weather data
            updateWeatherInfo(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function updateWeatherInfo(data) {
    // Extract relevant weather information from the API response
    const { uv, wind_kph, wind_dir, sunrise, sunset, vis_km, air_quality, humidity, precip_mm } = data.current;

    // Update the webpage content with the extracted weather information
    uvindex.textContent = uv;
    windspeed.textContent = wind_kph;
    windspeedtext.textContent = 'km/h';
    sunrise.textContent = sunrise;
    sunrisetext.textContent = 'am';
    sunset.textContent = sunset;
    winddirection.textContent = wind_dir;
    visibility.textContent = vis_km;
    visibilitystatus.textContent = 'Normal';
    aq.textContent = air_quality.pm10;
    aqstatus.textContent = 'Normal';
    humidity.textContent = humidity;
    humiditystatus.textContent = 'Normal';
    prec.textContent = precip_mm;
    precstatus.textContent = 'Normal';
}

updateWeatherInfo();