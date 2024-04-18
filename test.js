document.addEventListener('DOMContentLoaded', function() {
    const dots = document.querySelectorAll('.dot');
    const buttons = document.querySelectorAll('.options button');

    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            dots.forEach(dot => dot.classList.remove('active'));
            dot.classList.add('active');
            if (index === 0) {
                document.getElementById('second-page-link').click();
            }
        });
    });

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
});


const bg = document.querySelector('body');
const textElements = document.querySelectorAll('.card-heading, .uv-text, .wind-speed-text, .uv-index, .wind-speed,.sun-rise, .sun-rise-text, .sun-set, .sun-set-text, .heading, .winddirection, .visibilty, .visibilty-status, .air-quality, .air-quality-status, .humidity, .humidity-status, .prec, .prec-status')
const hourly = document.querySelector('.hourly.active');
const week = document.querySelector('.week-active');
const uvindex = document.querySelector('.uv-index');
const uvtext = document.querySelector('.uv-text');
const windspeed = document.querySelector('.wind-speed');
const windspeedtext = document.querySelector('.wind-speed-text');
const sunrise = document.querySelector('.sun-rise');
const sunrisetext = document.querySelector('.sun-rise-text');
const sunset = document.querySelector('.sun-set');
const sunsettext = document.querySelector('.sun-set-text');
const winddirection = document.querySelector('.winddirection')
const visibility = document.querySelector('.visibilty');
const visibilitystatus = document.querySelector('.visibilty-status');
const aq = document.querySelector('.air-quality');
const aqstatus = document.querySelector('.air-quality-status');
const humidity = document.querySelector('.humidity');
const humiditystatus = document.querySelector('.humidity-status');
const prec = document.querySelector('.prec');
const precstatus = document.querySelector('.prec-status');

let cityInput = "Ahmedabad";

window.addEventListener('load', () => {
    cityInput = localStorage.getItem('search');
    console.log("retrieved", cityInput);
    retrieveData();
    astronomy();
    fetchData();
});

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.options button');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            if (this.classList.contains('hourly')) {
                retrieveData();
            } else if (this.classList.contains('week')) {
                retrieveWeeklyData();
            }
        });
    });
});



function retrieveData() {
    fetch( `http://api.weatherapi.com/v1/forecast.json?key=8a8f10d7c5f645e2a0e94049241404&q=${cityInput}&days=7&aqi=yes&alerts=no`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            windspeed.innerHTML = data.current.wind_kph;
            updateStatus(windspeed, data.current.wind_kph, 'wind_speed');

            winddirection.innerHTML = data.current.wind_dir;
            updateStatus(winddirection, data.current.wind_dir, 'winddirection');

            prec.innerHTML = data.forecast.forecastday[0].day.totalprecip_in;
            updateStatus(prec, data.forecast.forecastday[0].day.totalprecip_in, 'precipitation');

            visibility.innerHTML = data.forecast.forecastday[0].day.avgvis_km;
            updateStatus(visibility, data.forecast.forecastday[0].day.avgvis_km, 'visibility');

            aq.innerHTML = data.forecast.forecastday[0].day.air_quality['us-epa-index'];
            updateStatus(aq, data.forecast.forecastday[0].day.air_quality['us-epa-index'], 'air_quality');

            humidity.innerHTML = data.forecast.forecastday[0].day.avghumidity;
            updateStatus(humidity, data.forecast.forecastday[0].day.avghumidity, 'humidity');

            uvindex.innerHTML = data.forecast.forecastday[0].day.uv;
            updateStatus(uvindex, data.forecast.forecastday[0].day.uv, 'uv_index');

            astronomy();
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again later.');
        });
}

function updateStatus(element, value, dataType) {
    const statusElement = element.nextElementSibling;

    if (statusElement) {
        let status = '';

        switch (dataType) {
            case 'air_quality':
                if (value <= 50) status = 'Good';
                else if (value <= 100) status = 'Moderate';
                else if (value <= 150) status = 'Unhealthy for Sensitive Groups';
                else if (value <= 200) status = 'Unhealthy';
                else if (value <= 300) status = 'Very Unhealthy';
                else status = 'Hazardous';
                break;
            case 'precipitation':
                status = value > 0 ? 'Rainy' : 'Dry';
                break;
            case 'visibility':
                status = value >= 10 ? 'Normal' : 'Low';
                break;
            case 'humidity':
                status = value >= 60 ? 'Humid' : 'Dry';
                break;
            case 'uv_index':
                if (value <= 2) status = 'Low';
                else if (value <= 5) status = 'Moderate';
                else if (value <= 7) status = 'High';
                else if (value <= 10) status = 'Very High';
                else status = 'Extreme';
                break;
            case 'wind_direction':
                status = value;
                break;
            default:
                status = 'Unknown';
        }

        statusElement.textContent = status;
    }
}

function retrieveWeeklyData() {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=8a8f10d7c5f645e2a0e94049241404&q=London&days=7&aqi=yes&alerts=no`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            if (data.forecast && data.forecast.forecastday) { // Check if forecast data exists
                const forecasts = data.forecast.forecastday.slice(0, 6); // Get the first 7 days of forecast
                const totalDays = forecasts.length;

                let totalWindSpeed = 0;
                let totalPrecipitation = 0;
                let totalVisibility = 0;
                let totalAirQuality = 0;
                let totalHumidity = 0;
                let totalUVIndex = 0;
                
                forecasts.forEach(forecast => {
                    totalWindSpeed += forecast.day.maxwind_kph;
                    totalPrecipitation += forecast.day.totalprecip_mm;
                    totalVisibility += forecast.day.avgvis_km;
                    if (forecast.day && forecast.day.air_quality && forecast.day.air_quality['us-epa-index']) {
                        totalAirQuality += forecast.day.air_quality['us-epa-index'];
                    } else {
                        console.warn('Missing or invalid air quality data for forecast:', forecast);
                    }
                    totalHumidity += forecast.day.avghumidity;
                    totalUVIndex += forecast.day.uv;
                });

                const averageWindSpeed = totalWindSpeed / totalDays;
                const averagePrecipitation = totalPrecipitation / totalDays;
                const averageVisibility = totalVisibility / totalDays;
                const averageAirQuality = totalAirQuality / totalDays;
                const averageHumidity = totalHumidity / totalDays;
                const averageUVIndex = totalUVIndex / totalDays;

                // Update UI to display average values
                windspeed.innerHTML = averageWindSpeed.toFixed(2); // Round to 2 decimal places
                updateStatus(windspeed, averageWindSpeed, 'wind_speed');

                prec.innerHTML = averagePrecipitation.toFixed(2); // Round to 2 decimal places
                updateStatus(prec, averagePrecipitation, 'precipitation');

                visibility.innerHTML = averageVisibility.toFixed(2); // Round to 2 decimal places
                updateStatus(visibility, averageVisibility, 'visibility');

                aq.innerHTML = Math.round(averageAirQuality); // Round to nearest integer
                updateStatus(aq, averageAirQuality, 'air_quality');

                humidity.innerHTML = Math.round(averageHumidity); // Round to nearest integer
                updateStatus(humidity, averageHumidity, 'humidity');

                uvindex.innerHTML = averageUVIndex.toFixed(2); // Round to 2 decimal places
                updateStatus(uvindex, averageUVIndex, 'uv_index');
                fetchData();
            } else {
                console.error('No forecast data available.');
                alert('No forecast data available. Please try again later.');
            }
        })
        .catch(error => {
            console.error('Error fetching weekly weather data:', error);
            alert('Error fetching weekly weather data. Please try again later.');
        });
}


function astronomy() {
    fetch(`http://api.weatherapi.com/v1/astronomy.json?key=6e588b6ddd9e4dd980974334243103&q=${cityInput}&dt=today`)
        .then(response => response.json())
        .then(data => {
            console.log(data);   
            const sunriseTime = data.astronomy.astro.sunrise;
            const [time, period] = sunriseTime.split(' ');
            sunrise.innerHTML = time;
            sunrisetext.innerHTML = period;
            
            const sunsetTime = data.astronomy.astro.sunset;
            const [time2, period2] = sunsetTime.split(' ');
            sunset.innerHTML = time2;
            sunsettext.innerHTML = period2;
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
            const conditionText = data.current.condition.text.toLowerCase();
            const isDay = data.current.is_day === 1;

            if (conditionText.includes('clear') || conditionText.includes('overcast')) {
                if (isDay) {
                    bg.style.backgroundImage = "url('weathericons/clear_day.jpg')";
                    textElements.forEach(element => {
                        element.style.color = 'black';
                    });
                } else {
                    bg.style.backgroundImage = "url('weathericons/clear_night.jpg')";
                    textElements.forEach(element => {
                        element.style.color = 'white';
                    });
                }
            } else if (conditionText.includes('sunny')) {
                bg.style.backgroundImage = "url('weathericons/clear_day.jpg')";
                textElements.forEach(element => {
                    element.style.color = 'black';
                });
            } else if (conditionText.includes('cloudy') || conditionText.includes('overcast')) {
                bg.style.backgroundImage = "url('weathericons/cloudy.jpg')";
                textElements.forEach(element => {
                    element.style.color = 'black';
                });
            } else if (conditionText.includes('rain') || conditionText.includes('shower') || conditionText.includes('mist')) {
                bg.style.backgroundImage = "url('weathericons/rain.jpg')";
            } else if (conditionText.includes('snow')) {
                bg.style.backgroundImage = "url('weathericons/snow.jpg')";
                textElements.forEach(element => {
                    element.style.color = 'black';
                });
            } else {
                bg.style.backgroundImage = "url('weathericons/clear_day.jpg')";
                textElements.forEach(element => {
                    element.style.color = 'black';
                });
            }
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again later.');
        });
}

fetchData();
retrieveData();