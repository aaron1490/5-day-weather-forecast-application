$(document).ready(function () {

// Define variables that I'm going to need
var searchBox = $(`#search-input`);
var submitBtn = $("#search-button");
var historyList = $(`#history`);
var todaySection = $(`#today`);
var forecastSection = $(`#forecast`);
var currentDate = dayjs().format("DD/MM/YYYY");

// API's convenience variables
var APIkey = '3931383ffe79bcfc153c07435437822b';
// var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchBox}&appid=${APIkey}`;


// load the previous search history from the local storage (in an array format)
function loadSearchHistory() {
var searchHistory = JSON.parse(localStorage.getItem(`searchHistory`)) || [];
// display the search history in the left sidebar
displaySearchHistory(searchHistory);
}

// Iterate through the array and display each previous search in the left side under search bar to a maximum of 6. When we hit 6 we insert the latest search but forget the oldest search
function displaySearchHistory(searchHistory) {
  historyList.empty();
  for (var i = 0; i < Math.min(searchHistory.length, 6); i++) {
    var listItem = $("<button>").text(searchHistory[i]);
    historyList.prepend(listItem)
  }
}

// save previous search history to local storage
function saveToLS(search) {
  var searchHistory = JSON.parse(localStorage.getItem(`searchHistory`)) || [];
  if (!searchHistory.includes(search)) { // additional check to ensure that the search ISNT a duplicate
    searchHistory.push(search); // add the newly added search to the history array
    localStorage.setItem(`searchHistory`, JSON.stringify(searchHistory)); // save the updated history array to local storage
    displaySearchHistory(searchHistory); // display the updated history
  }
}

// fetch queryURL from the API
function fetchWeatherData(search) {
  var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${APIkey}`;

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(queryURL);
      console.log(data);
      displayCurrentWeather(data);
    })
    .catch(function (error) {
      console.log('Error fetching weather data:', error);
    });
}

// display current weather data
function displayCurrentWeather(data) {
  todaySection.html(`
  <h2>${data.name} ${currentDate}</h2>
  <p>Temperature: ${(data.main.temp - 273.15).toFixed(1)} °C</p>
  <p>Weather: ${data.weather[0].main}</p>
  `);
}

//  search function event listeners
$("#search-form").on('submit', function (event) {
  event.preventDefault();
  var search = searchBox.val();
  if (search !== '') {
    fetchWeatherData(search);
    saveToLS(search);
    searchBox.val('');
  }
});

// event listener for the historic search buttons
historyList.on('click', 'button', function (event) {
  var search = event.target.textContent;
  fetchWeatherData(search);
});

// call the loadsearch function
loadSearchHistory();
})