//AppID = f7150342ebf16feafe131404f0de4510
//https://home.openweathermap.org/api_keys

var apiKey = "f7150342ebf16feafe131404f0de4510";
var date = dayjs().format('dddd, MMMM Do YYYY');
var dateTime = dayjs().format('YYYY-MM-DD HH:MM:SS')
var city = "";
var searchHistory = [];

var QueryUrl ='https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;

  //function for when the search button is clicked
$('.search').on("click", function (event) {
    event.preventDefault();
  
    city = $(this).parent('.btnPar').siblings('.textVal').val().trim();
    console.log(city);
    if (city === "") {
      return;
    };
  
    searchHistory.push(city);
    localStorage.setItem('city', JSON.stringify(searchHistory));
  
    loadSearchHistory();

  })
  
  //load search history from local storage
  function loadSearchHistory() {
    searchHistory = JSON.parse(localStorage.getItem("city"));
  
    $("#search-history").empty();
  
    if(searchHistory.length >0){
      for (i = 0; i < searchHistory.length; i++) {
  
        $("#search-history").append("<a href='#' class='list-group-item list-group-item-action' id='" + searchHistory[i] + "'>" + searchHistory[i] + "</a>");
      } 
  }
  }

  //calls function to load search history
  loadSearchHistory();


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
  $("#search-history").on("click", function(event){
    var selectedCity = $(event.target).closest("a").attr("id");
    getCityWeather(selectedCity);
});
