//AppID = f7150342ebf16feafe131404f0de4510
//https://home.openweathermap.org/api_keys

var apiKey = "f7150342ebf16feafe131404f0de4510";
var city = "";
var searchHistory = [];

var QueryUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;

//function for when the search button is clicked
$('.search').on("click", function (event) {
  event.preventDefault();

  city = $(this).parent('.btnPar').siblings('.textVal').val().trim();

  if (city === "") {
    return;
  };

  searchHistory.push(city);
  localStorage.setItem('city', JSON.stringify(searchHistory));

  loadSearchHistory();
  getCityWeather(city);
})

//load search history from local storage
function loadSearchHistory() {
  searchHistory = JSON.parse(localStorage.getItem("city"));
  //clears list of search history before loading it again from local storage
  $("#search-history").empty();
  if (searchHistory.length > 0) {
    for (i = 0; i < searchHistory.length; i++) {

      $("#search-history").append("<a href='#' class='list-group-item list-group-item-action' id='" + searchHistory[i] + "'>" + searchHistory[i] + "</a>");
    }
  }
}


//fetch weather for the city that is searched
function getCityWeather(city) {
  var QueryUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;

  fetch(QueryUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayWeather(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to OpenWeather");
    })
}

//allows search for city in search history list
//clicking on the city will pass the city name into the getweather function
$("#search-history").on("click", function (event) {
  var selectedCity = $(event.target).closest("a").attr("id");
  getCityWeather(selectedCity);
});

function displayWeather(data) {
  //display city's current weather forecast for the current day
  $('#city-name').text(data.name + " (" + dayjs(data.dt * 1000).format("MM/DD/YYYY") + ") ").append(`<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"></img>`);
  $("#city-temp").text("Temperature: " + data.main.temp.toFixed(1) + "°F");
  $("#city-wind").text("Wind: " + data.wind.speed.toFixed(1) + " mph");
  $("#city-humidity").text("Humidity: " + data.main.humidity + "%");

  //five day forecast
  fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + data.name + "&appid=ce39e7239416ad754359ca762d28521a&units=imperial")
    .then(function (response) {
      response.json().then(function (data) {
        $("#five-day-forecast").empty();

        for (i = 7; i <= data.list.length; i += 8) {
          // string variable to "create" card for weather forecast
          var fiveDayForecast = `
      <div class="col-md-2 m-2 py-3 card text-white bg-info">
          <div class="card-body p-1">
              <h5 class="card-title">` + dayjs(data.list[i].dt * 1000).format("MM/DD/YYYY") + `</h5>
              <img src="https://openweathermap.org/img/wn/` + data.list[i].weather[0].icon + `.png" alt="rain">
              <p class="card-text">Temp: ` + data.list[i].main.temp + `</p>
              <p class="card-text">Wind Speed: ` + data.list[i].wind.speed + ` MPH </p>
              <p class="card-text">Humidity: ` + data.list[i].main.humidity + `</p>
          </div>
      </div>
      `;
          // append the div to the five-day forecast
          $("#five-day-forecast").append(fiveDayForecast);

        }
      })
    })
}
