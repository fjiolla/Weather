# Weather Application

A beautiful and interactive weather application that provides real-time weather information with dynamic backgrounds and comprehensive forecasts.

## Features

### Page 1 - Main Weather Dashboard
- **Current Weather Display**: Shows current temperature, weather condition, and location
- **Real-time Clock**: Live updating time display
- **Hourly Forecast**: 7-hour weather forecast with icons and temperatures
- **5-Day Forecast**: Extended forecast with visual progress bars
- **Location Search**: Search for any city worldwide with autocomplete suggestions
- **Dynamic Backgrounds**: Background changes based on current weather conditions (clear, cloudy, rainy, snowy)
- **Smart Text Contrast**: Text color automatically adjusts for optimal readability

### Page 2 - Detailed Weather Information
- **Today/Week Toggle**: Switch between today's forecast and weekly averages
- **Comprehensive Highlights**:
  - UV Index with severity levels
  - Wind Status (speed and direction)
  - Sunrise and Sunset times
  - Visibility conditions
  - Air Quality Index with status
  - Humidity levels
  - Precipitation data
- **Weather Cards**: Hourly/weekly weather cards with icons and temperatures

## Technologies Used

- **HTML5**: Structure and markup
- **CSS3**: Styling with glassmorphism effects, animations, and responsive design
- **JavaScript (ES6+)**: Dynamic functionality and API integration
- **Font Awesome**: Icons for UI elements
- **WeatherAPI**: Real-time weather data

## Installation

1. Clone the repository:
```bash
git clone https://github.com/fjiolla/Weather.git
cd weather-app
```

2. Set up your API keys:
   - Sign up at [WeatherAPI.com](https://www.weatherapi.com/)
   - Replace the API keys in the JavaScript files:
     - `weather1.js`: Update keys in `fetchWeatherData()` and `fetchData()` functions
     - `weather2.js`: Update keys in `retrieveData()`, `retrieveWeeklyData()`, `astronomy()`, and `fetchData()` functions

3. Ensure you have the required folder structure:
```
project-root/
├── weather1.html
├── weather1.css
├── weather1.js
├── weather2.html
├── weather2.css
├── weather2.js
└── weathericons/
    ├── background3.jpg
    ├── clear_day.jpg
    ├── clear_night.jpg
    ├── cloudy.jpg
    ├── rain.jpg
    ├── snow.jpg
    └── raining.png
```

4. Open `weather1.html` in your web browser to start using the application.

## Usage

### Searching for a Location
1. Click on the search bar at the top of the page
2. Type in a city name
3. Select from suggested cities or press the search button
4. The weather information will update automatically

### Navigation
- Use the **dots** at the bottom to navigate between pages
- Page 1: Main dashboard with current weather and forecasts
- Page 2: Detailed weather highlights and statistics

### Viewing Different Time Frames (Page 2)
- Click **"today"** button to see today's detailed weather
- Click **"week"** button to see weekly average statistics

## Weather Conditions

The application dynamically changes backgrounds based on weather:
- **Clear/Sunny**: Bright sunny background
- **Cloudy/Overcast**: Cloudy sky background
- **Rain/Showers/Mist**: Rainy atmosphere
- **Snow**: Snowy winter scene
- **Night**: Special night-time backgrounds for clear conditions

## API Endpoints Used

1. **Current Weather**: `/v1/current.json` - Real-time weather data
2. **Forecast**: `/v1/forecast.json` - Multi-day weather forecast
3. **Astronomy**: `/v1/astronomy.json` - Sunrise/sunset information

## Features in Detail

### Progress Bars (5-Day Forecast)
- Visual representation of temperature ranges
- Color-coded based on temperature:
  - Blue: Cold (< 20°C)
  - Gray: Moderate (20-30°C)
  - Pink: Hot (> 30°C)

### Status Indicators
- **Air Quality**: Good, Moderate, Unhealthy, Very Unhealthy, Hazardous
- **UV Index**: Low, Moderate, High, Very High, Extreme
- **Visibility**: Normal or Low
- **Humidity**: Humid or Dry

### Local Storage
The application stores your last searched location in localStorage for persistence across sessions.

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Customization

### Changing the Default Location
Edit the `cityInput` variable in both JavaScript files:
```javascript
let cityInput = "YourCity";
```


## Known Limitations

- Requires active internet connection
- API rate limits apply based on your WeatherAPI plan
- Background images need to be present in the `weathericons` folder


## Credits

- Weather data provided by [WeatherAPI.com](https://www.weatherapi.com/)
- Icons by [Font Awesome](https://fontawesome.com/)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---
