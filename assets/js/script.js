$(document).ready(function () {

// Define variables that I'm going to need
var APIkey = '3931383ffe79bcfc153c07435437822b';
var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchBox}&appid=${APIkey}`;
var searchBox = $(`#search-input`);
var submitBtn = $("#search-button");
var historyList = $(`#history`);
var todaySection = $(`#today`);
var forecastSection = $(`#forecast`);
var currentDate = dayjs().format("DD/MM/YYYY");



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


// fetch the queryURL from the API
fetch(queryURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(queryURL);
    console.log(data);
  });


// 5 day weather forecast display on the right side when a city is searched

// click event that take the value of user input in searchBox and declares it as the variable called search
submitBtn.onclick(function (event) {
  event.preventdefault();
  var search = searchBox.val();

})
















})