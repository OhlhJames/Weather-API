const apiKey = 'ef8d8963d3dd913264b31cf3e23ab326'
const sampleCities = ['Seattle', 'Austin', 'Orlando']
const cityInputEl = document.querySelector('.search-input')
const submitBtn = document.querySelector('.submit-button')

const storedCities = JSON.parse(localStorage.getItem("storedCities"));

const citySubmitHandler = function (event) {
  event.preventDefault();

  const city = cityInputEl.value.trim();

  if (city) {
    fetchWeather(city, apiKey)
    fetchForecast(city,apiKey);

    repoContainerEl.textContent = '';
    nameInputEl.value = '';
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
    return (
      response.json()
        .then(function (data) {
          console.log(data)
          let simpleTemp = Math.round(data.main.temp);
          let simpleWind = Math.round(data.wind.speed);
        })
    );
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
    }
  })
}

submitBtn.addEventListener('click', citySubmitHandler);