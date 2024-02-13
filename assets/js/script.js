$(document).ready(function () {
// Define variables that I'm going to need
var citySearch = $(`#search-input`);
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&appid=3931383ffe79bcfc153c07435437822b&units=metric";

api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
var submit = $("#search-button");
var oldSearch = $(`#history`);
var currentDate = dayjs().format(`DD/MM/YYYY`);


// Load previous search history from local storage (array format)
function previousSearches() {
    
}

// Iterate through the array with a loop and display each previous search in the left side under search bar

// Add search bar input function that has API end point for openweathermap
fetch(queryURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(queryURL);
    console.log(data);
    console.log(data.main.temp - 273.15);


    $(".city").text(`City: ` + data.name);
    $(".wind").text(`Wind Speed: ` + data.wind.speed + ` (metres/second)`);
    $(".humidity").text(`Humidity: ` + data.main.humidity + `%`);

    $(".temp").text(`Temperature: ` + data.main.temp + `°C`);
  });

// Save search history to local storage
function runSearch(event,) {
    
}

// when searching for a city that has already been searched for previously, it wont be added to the search history

// 5 day weather forecast display on the right side when a city is searched

// on click function for submit button for search

// on click function for each button of previously searched city to go back and look














})