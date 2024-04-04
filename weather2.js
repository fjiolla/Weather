document.addEventListener('DOMContentLoaded', function () {
    const dots = document.querySelectorAll('.dot');

    // Function to handle dot click
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            // Remove active class from all dots
            dots.forEach(dot => dot.classList.remove('active'));
            // Add active class to clicked dot
            dot.classList.add('active');
            // Navigate to the second page
            if (index === 1) {
                document.getElementById('second-page-link').click();
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const locationInput = document.getElementById('locationinput');
    const cities = document.querySelector('.cities');

    locationInput.addEventListener('click', function (event) {
        cities.classList.toggle('active');
    });
});

const bg = document.querySelector('.weather-container');
const app = document.querySelector('.weather-content');
const search = document.querySelector('.search');
const form = document.getElementById('locationinput');
const cities = document.querySelectorAll('.city');
const temp = document.querySelector('.temperature');
const icon = document.querySelector('.icon');
const condition = document.querySelector('.condition');
const placename = document.querySelector('.name');
const placetime = document.querySelector('.time');
const date = document.querySelector('.date');
const day = document.querySelector('.day')
const month = document.querySelector('.month')
const tempperhouricon = document.querySelectorAll('.tempicon')
const tempperhourtime = document.querySelectorAll('.change-list')
const tempperhour = document.querySelectorAll('.temp')
const tempperday = document.querySelectorAll('.tempperday')
const tempperdayicon = document.querySelectorAll('.progress-bar-icon')
const tempday = document.querySelectorAll('.tempday')

let cityInput = "Ahmedabad";

cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;
        fetchWeatherData();
        fetchData();
    });
})

form.addEventListener('submit', (e) => {
    if (search.value.length == 0) {
        alert('Please enter a city name');
    } else {
        cityInput = search.value;
        fetchWeatherData();
        fetchData();
        search.value = "";
    }
    e.preventDefault();
});

form.addEventListener('submit', (e) => {
    // Retrieve the value from the search input
    const cityInput = search.value.trim(); // Trim to remove any leading or trailing whitespace
    
    // Set the cityInput value to the 'search' key in local storage
    localStorage.setItem('search', cityInput);
    
    // Check if the location data is successfully stored in local storage
    if (localStorage.getItem('search') !== null) {
        console.log('Location data is successfully stored in local storage.');
    } else {
        console.error('Failed to store location data in local storage.');
    }
});


function getCurrentDateAndMonth() {
    const currentDate = new Date();
    const options = { day: 'numeric', month: 'long' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    return formattedDate.split(' ');
}
const [currentDate, currentMonth] = getCurrentDateAndMonth();
date.textContent = currentDate;
month.textContent = currentMonth;

function dayOfTheWeek() {
    const currentDate = new Date();
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    return weekday[currentDate.getDay()];
}
document.addEventListener('DOMContentLoaded', function () {
    const currentDay = dayOfTheWeek();
    day.textContent = currentDay;
});

function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    document.querySelector('.time').textContent = timeString;
}

updateTime();
setInterval(updateTime, 1000);


function fetchWeatherData() {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=6e588b6ddd9e4dd980974334243103&q=${cityInput}&days=7&aqi=no&alerts=no`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            // Accessing today's weather data
            const today = data.forecast.forecastday[0];
            const currentHour = new Date().getHours();

            // Displaying today's date
            const todayDate = new Date(today.date);
            date.textContent = todayDate.getDate();
            month.textContent = todayDate.toLocaleString('en-us', { month: 'long' });

            // Displaying today's day
            const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            day.textContent = weekday[todayDate.getDay()];

            // Displaying hourly forecast from the current hour
            for (let i = currentHour; i < currentHour + 7; i++) {
                const hourIndex = i % 24;
                const hour = today.hour[hourIndex];
                tempperhour[i - currentHour].innerHTML = hour.temp_c + "&deg;";
                tempperhourtime[i - currentHour].textContent = hour.time.split(' ')[1];
                tempperhouricon[i - currentHour].src = hour.condition.icon; 
            }

            // Displaying 5-day forecast
            const forecasts = data.forecast.forecastday.slice(0, 5); // Extracting first 5 days
            forecasts.forEach((forecast, index) => {
                tempperday[index].textContent = new Date(forecast.date).toLocaleString('en-us', { weekday: 'short' });
                tempperdayicon[index].src = forecast.day.condition.icon;
                tempday[index].innerHTML = forecast.day.avgtemp_c + "&deg;";

                const temp = forecast.day.avgtemp_c; // Average temperature for the day
                const progressBar = document.querySelector(`.temp-${index + 1}`);
                const width = (temp / 100) * 16; // Assuming 100 degrees is the maximum temperature
                progressBar.style.setProperty('--progress-width', `${width}em`); // Set custom property
                progressBar.classList.add('animate-progress');

                // Change color based on temperature range
                if (temp < 20) {
                    progressBar.style.backgroundColor = 'rgba(135,206,235,0.3)';
                } else if (temp >= 20 && temp <= 30) {
                    progressBar.style.backgroundColor = 'rgba(211,211,211,0.3)';
                } else {
                    progressBar.style.backgroundColor = 'rgba(255,192,203,0.3)';
                }
            });
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again later.');
        });
}

function fetchData() {
    fetch(`http://api.weatherapi.com/v1/current.json?key=6e588b6ddd9e4dd980974334243103&q=${cityInput}&aqi=no`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            temp.innerHTML = data.current.temp_c + "&#176";
            condition.innerHTML = data.current.condition.text;
            placename.innerHTML = data.location.name;

            const iconUrl = data.current.condition.icon;
            icon.src = iconUrl;
        });
}       

fetchData();
fetchWeatherData();