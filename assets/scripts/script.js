//AppID = f7150342ebf16feafe131404f0de4510
//https://home.openweathermap.org/api_keys

var apiKey = "f7150342ebf16feafe131404f0de4510";
var date = dayjs().format('dddd, MMMM Do YYYY');
var dateTime = dayjs().format('YYYY-MM-DD HH:MM:SS')
var city = "";

var QueryUrl ='https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;

fetch(QueryUrl)
.then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });