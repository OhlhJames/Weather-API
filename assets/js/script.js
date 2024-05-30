const apiKey = 'ef8d8963d3dd913264b31cf3e23ab326';
const sampleCities = ['Seattle', 'Austin', 'Orlando'];
const cityInputEl = document.querySelector('.search-input');
const submitBtn = document.querySelector('.submit-button');
const forecastEl = document.querySelector('.forecast-cards');
const currentWeatherTitle = document.querySelector('.m-card-title');
const currentWeatherTemp = document.querySelector('.current-temp')
const currentWeatherWind = document.querySelector('.current-wind')
const currentWeatherHumid = document.querySelector('.current-humid')

const storedCities = JSON.parse(localStorage.getItem("storedCities"));

const citySubmitHandler = function (event) {
  event.preventDefault();

  const city = cityInputEl.value.trim();

  if (city) {
    fetchWeather(city, apiKey)
    fetchForecast(city,apiKey);
    cityInputEl.value = '';
  } else {
    alert('Please enter a city!');
  }
};

const fetchWeather = function (city,apiKey) {
  const  fetchURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey +"&units=imperial"
  fetch(fetchURL)
  .then(function (response) {
    if (response.status != 200) {
      alert("This city was not found. Please try again.");
      sampleCities.shift();
      localStorage.setItem("storedCities", JSON.stringify(sampleCities));
      window.location.reload();
    }
    return response.json()
      .then(function (data) {
        console.log(data)
        let simpleTemp = Math.round(data.main.temp);
        let simpleWind = Math.round(data.wind.speed);
        let humidity = data.main.humidity
        currentWeatherTitle.textContent = `${data.name} Today`
        currentWeatherTemp.textContent = `Temp: ${simpleTemp}F`
        currentWeatherWind.textContent = `Wind: ${simpleWind}MPH`
        currentWeatherHumid.textContent = `Humidity: ${humidity}%`

      })
  });
}

const fetchForecast = function (city,apiKey) {
  const  fetchURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey +"&units=imperial"
  fetch(fetchURL)
  .then(function (response) {
    if (response.status != 200) {
      alert("This city was not found. Please try again.");
      sampleCities.shift();
      localStorage.setItem("storedCities", JSON.stringify(sampleCities));
      window.location.reload();
    } else {
      return response.json();
    }
  })
  .then(function (data) {
    console.log(data)
    for (let i = 1; i < 6; i++) {
      let day = data.list[(i - 1) * 8]
      let date = dayjs(day.dt_txt).format('MMMM D YYYY');
      let futureTemp = Math.round(day.main.temp)
      let futureWind = Math.round(day.wind.speed)
      let futureHumidity = day.main.humidity
      let dayCardEl = document.createElement('div');
      dayCardEl.classList = 'card'
      let titleEl = document.createElement('h5');
      titleEl.textContent = date
      dayCardEl.appendChild(titleEl);
      let tempInfoEl = document.createElement('p')
      tempInfoEl.textContent= `Temp: ${futureTemp} F`
      dayCardEl.appendChild(tempInfoEl);
      let windInfoEl = document.createElement('p')
      windInfoEl.textContent=`Wind: ${futureWind} MPH`
      dayCardEl.appendChild(windInfoEl);
      let humidInfoEl = document.createElement('p')
      humidInfoEl.textContent=`Humidity:${futureHumidity}%`
      dayCardEl.appendChild(humidInfoEl);
      if (day.weather[0].main === "Clouds") {
        dayCardEl.append(" ☁️");
      }
      if (day.weather[0].main === "Clear") {
        dayCardEl.append(" ☀️");
      }
      if (day.weather[0].main === "Rain") {
        dayCardEl.append(" 🌧️");
      }
      if (day.weather[0].main === "Snow") {
        dayCardEl.append(" ❄️");
      }
      forecastEl.appendChild(dayCardEl);
    }
  })
}

submitBtn.addEventListener('click', citySubmitHandler);