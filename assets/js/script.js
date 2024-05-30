const apiKey = 'ef8d8963d3dd913264b31cf3e23ab326'
let sampleCities = ['Seattle', 'Austin', 'Orlando']

var storedCities = JSON.parse(localStorage.getItem("storedCities"));

function fetchForecast() {
  fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey +"&units=imperial"
    ).then(function (response) {
   
    if (response.status != 200) {
      alert("This city was not found. Please try again.");
      sampleCities.shift();
      localStorage.setItem("storedCities", JSON.stringify(sampleCities));
      window.location.reload();
    }
    return (
      response.json()
        .then(function (data) {
          var simpleTemp = Math.round(data.main.temp);
          var simpleWind = Math.round(data.wind.speed);
        })
    );
  });
}