var apiKey = "f7150342ebf16feafe131404f0de4510";
var city = "";
var searchHistory = [];

// Load the search history on page load
loadSearchHistory();

// Function to search for the city's weather
function searchCityWeather() {
  // Get the city value from the input field
  city = $("#city-input").val().trim();

  if (city === "") {
    return;
  }

  // Add the city to the search history and save to local storage
  searchHistory.push(city);
  localStorage.setItem("city", JSON.stringify(searchHistory));

  // Clear the input field after the city is added to the history
  $("#city-input").val("");

  // Load search history and get weather data for the city
  loadSearchHistory();
  getCityWeather(city);
}

// Load search history from local storage
function loadSearchHistory() {
  searchHistory = JSON.parse(localStorage.getItem("city")) || [];
  // Clears list of search history before loading it again from local storage
  $("#search-history").empty();
  // Loops through and adds searched cities from local storage
  if (searchHistory.length > 0) {
    for (var i = 0; i < searchHistory.length; i++) {
      $("#search-history").append(
        "<a href='#' class='list-group-item list-group-item-action' id='" +
          searchHistory[i] +
          "'>" +
          searchHistory[i] +
          "</a>"
      );
    }
  }
}

//fetch weather for the city that is searched
function getCityWeather(city) {
  var queryUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey +
    "&units=imperial";

  fetch(queryUrl)
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
    });
}

// Function to display weather data
function displayWeather(data) {
  // Display city's current weather forecast for the current day
  // Sets the text of each weather data item into the main weather display
  $('#city-name').text(`${data.name} (${dayjs(data.dt * 1000).format("MM/DD/YYYY")})`).append(`<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"></img>`);
  $("#city-temp").text(`Temperature: ${data.main.temp} °C`);
  $("#city-wind").text(`Wind: ${data.wind.speed.toFixed(1)} mph`);
  $("#city-humidity").text(`Humidity: ${data.main.humidity}%`);

  // Five day forecast
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&appid=${apiKey}&units=imperial`)
    .then(function (response) {
      response.json().then(function (data) {
        $("#five-day-forecast").empty();

        for (i = 7; i <= data.list.length; i += 8) {
          // String variable to "create" card for weather forecast
          // Grabs each data and concatenates to corresponding weather data <p> tag.
          // Use of template literal :   https://wesbos.com/template-strings-html
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
          var fiveDayForecast = `
            <div class="col-md-2 m-2 py-3 card text-white bg-info">
              <div class="card-body p-1">
                <h5 class="card-title">${dayjs(data.list[i].dt * 1000).format("MM/DD/YYYY")}</h5>
                <img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png" alt="rain">
                <p class="card-text">Temp: ${data.list[i].main.temp} °C</p>
                <p class="card-text">Wind Speed: ${data.list[i].wind.speed} MPH</p>
                <p class="card-text">Humidity: ${data.list[i].main.humidity}</p>
              </div>
            </div>
          `;
          // Append the div to the five-day forecast
          $("#five-day-forecast").append(fiveDayForecast);
        }
      })
    })
}


// Add an event listener to the search button
$("#searchBtn").on("click", function (event) {
  // Trigger the search when the search button is clicked
  searchCityWeather();
});

// Add an event listener to the input field for the enter key
$("#city-input").on("keydown", function (event) {
  // Check if the key pressed is the enter key (keyCode 13)
  if (event.keyCode === 13) {
    // Trigger the search when the enter key is pressed
    searchCityWeather();
  }
});

// Allows search for city in search history list
// Clicking on the city from the unordered list will pass the city name into the getweather function
$("#search-history").on("click", function (event) {
  var selectedCity = $(event.target).closest("a").attr("id");
  getCityWeather(selectedCity);
});

// Initially load the weather data for the first city in the search history (if available)
if (searchHistory.length > 0) {
  getCityWeather(searchHistory[searchHistory.length - 1]);
}


