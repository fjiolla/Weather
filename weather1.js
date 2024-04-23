document.addEventListener('DOMContentLoaded', function () {
    const dots = document.querySelectorAll('.dot');
    const locationInput = document.getElementById('locationinput');
    const cities = document.querySelector('.cities');

    dots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            dots.forEach(dot => dot.classList.remove('active'));
            dot.classList.add('active');
            if (index === 1) {
                document.getElementById('second-page-link').click();
            }
        });
    });

    locationInput.addEventListener('click', function (event) {
        cities.classList.toggle('active');
    });
});

const bg = document.querySelector('.weather-container');
const textElements = document.querySelectorAll('.temperature, .condition, .panel i, .panel button, .name, .time, .day, .date, .month, .change-list, .temp, .tempperday, .tempday, .search, .info-temp, .city, .progress-line');
const textLower = document.querySelectorAll('.temperature, .condition, .name, .time, .day, .date, .month, .tempperday, .tempday, .info-temp');
const btn1 = document.querySelector('.search');
const btn2 = document.querySelector('.panel button');
const cities = document.querySelectorAll('.city');
const search = document.querySelector('.search');
const form = document.getElementById('locationinput');
const temp = document.querySelector('.temperature');
const icon = document.querySelector('.icon');
const condition = document.querySelector('.condition');
const placename = document.querySelector('.name');
const date = document.querySelector('.date');
const day = document.querySelector('.day');
const month = document.querySelector('.month');
const tempperhouricon = document.querySelectorAll('.tempicon');
const tempperhourtime = document.querySelectorAll('.change-list');
const tempperhour = document.querySelectorAll('.temp');
const tempperday = document.querySelectorAll('.tempperday');
const tempperdayicon = document.querySelectorAll('.progress-bar-icon');
const tempday = document.querySelectorAll('.tempday');


let cityInput = "Ahmedabad";

cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;
        fetchWeatherData();
        fetchData();
        handleSubmit();
    });
})

form.addEventListener('submit', (e) => {
    if (search.value.length == 0) {
        alert('Please enter a city name');
    } else {
        cityInput = search.value;
        fetchWeatherData();
        fetchData();
        handleSubmit();
        search.value = "";
    }
    e.preventDefault();
});

function handleSubmit() {
    localStorage.setItem('search', JSON.stringify(cityInput));
    console.log("Stored in localStorage:", cityInput);
}

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

const currentDay = dayOfTheWeek();
day.textContent = currentDay;

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
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=8a8f10d7c5f645e2a0e94049241404&q=${cityInput}&days=5&aqi=no&alerts=no`)
        .then(response => response.json())
        .then(data => {
            const today = data.forecast.forecastday[0];
            const currentHour = new Date().getHours();

            const todayDate = new Date(today.date);
            date.textContent = todayDate.getDate();
            month.textContent = todayDate.toLocaleString('en-us', { month: 'long' });
            day.textContent = dayOfTheWeek();

            for (let i = currentHour; i < currentHour + 7; i++) {
                const hourIndex = i % 24;
                const hour = today.hour[hourIndex];
                tempperhour[i - currentHour].innerHTML = hour.temp_c + "&deg;";
                tempperhourtime[i - currentHour].textContent = hour.time.split(' ')[1];
                tempperhouricon[i - currentHour].src = hour.condition.icon;
            }

            const forecasts = data.forecast.forecastday.slice(0, 5);
            forecasts.forEach((forecast, index) => {
                tempperday[index].textContent = new Date(forecast.date).toLocaleString('en-us', { weekday: 'short' });
                tempperdayicon[index].src = forecast.day.condition.icon;
                tempday[index].innerHTML = forecast.day.avgtemp_c + "&deg;";

                const temp = forecast.day.avgtemp_c;
                const progressBar = document.querySelector(`.temp-${index + 1}`);
                const width = (temp / 57) * 16;
                progressBar.style.setProperty('--progress-width', `${width}em`);
                progressBar.classList.add('animate-progress');

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
            temp.innerHTML = data.current.temp_c + "&#176;";
            condition.innerHTML = data.current.condition.text;
            placename.innerHTML = data.location.name;
            const iconUrl = data.current.condition.icon;
            icon.src = iconUrl;

            const conditionText = data.current.condition.text.toLowerCase();
            const isDay = data.current.is_day === 1;

            if (
                conditionText.includes('clear') ||
                conditionText.includes('overcast')
            ) {
                if (isDay) {
                    bg.style.backgroundImage = "url('weathericons/clear_day.jpg')";
                    textElements.forEach(element => {
                        element.style.color = 'black';
                    })
                    textLower.forEach(element => {
                        element.style.color = 'white';
                    })
                } else {
                    bg.style.backgroundImage = "url('weathericons/clear_night.jpg')";
                    textElements.forEach(element => {
                        element.style.color = 'white';
                    })
                }
            }
            else if (
                conditionText.includes('sunny')
            ) {
                bg.style.backgroundImage = "url('weathericons/clear_day.jpg')";
                textElements.forEach(element => {
                    element.style.color = 'black';
                })
                textLower.forEach(element => {
                    element.style.color = 'white';
                })
                btn1.style.backgroundColor = 'rgba(0, 0, 0, .1)';
                btn2.style.backgroundColor = 'rgba(0, 0, 0, .1)';
            }
            else if (
                conditionText.includes('cloudy')
            ) {
                bg.style.backgroundImage = "url('weathericons/cloudy.jpg')";
                textElements.forEach(element => {
                    element.style.color = 'black';
                })
                textLower.forEach(element => {
                    element.style.color = 'white';
                })
            } else if (
                conditionText.includes('rain') ||
                conditionText.includes('shower') ||
                conditionText.includes('mist')
            ) {
                bg.style.backgroundImage = "url('weathericons/rain.jpg')";
            } else if (
                conditionText.includes('snow')
            ) {
                bg.style.backgroundImage = "url('weathericons/snow.jpg')";
                textElements.forEach(element => {
                    element.style.color = 'black';
                })
            }
            else {
                bg.style.backgroundImage = "url('weathericons/clear_day.jpg')";
                textElements.forEach(element => {
                    element.style.color = 'black';
                })
                textLower.forEach(element => {
                    element.style.color = 'white';
                })
            }
        });
}

fetchData();
fetchWeatherData();
