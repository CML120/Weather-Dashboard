//AppID = f7150342ebf16feafe131404f0de4510
//https://home.openweathermap.org/api_keys

var apiKey = "f7150342ebf16feafe131404f0de4510";
var date = dayjs().format('dddd, MMMM Do YYYY');
var dateTime = dayjs().format('YYYY-MM-DD HH:MM:SS')
var city = "";
var searchHistory = [];

var QueryUrl ='https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;

// fetch(QueryUrl)
// .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   });


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
  
  
  function loadSearchHistory() {
    searchHistory = JSON.parse(localStorage.getItem("city"));
  
    $("#search-history").empty();
  
    if(searchHistory.length >0){
      for (i = 0; i < searchHistory.length; i++) {
  
        $("#search-history").append("<a href='#' class='list-group-item list-group-item-action' id='" + searchHistory[i] + "'>" + searchHistory[i] + "</a>");
      } 
  }
  }

  loadSearchHistory();