$(document).ready(function () {
// Define variables that I'm going to need
var APIkey = '3931383ffe79bcfc153c07435437822b';
var searchBox = $(`#search-input`);
var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchBox}&appid=${APIkey}`;
var submitBtn = $("#search-button");
var oldSearch = $(`#history`);
var currentDate = dayjs().format(`DD/MM/YYYY`);
var search;


// Load previous search history from local storage (array format)
function previousSearches() {

}



// Iterate through the array with a loop and display each previous search in the left side under search bar

// Run the APIkey call to the end point
fetch(queryURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(queryURL);
    console.log(data);
  });



// Save search history to local storage
// function runSearch(event,) {
    
// }

// when searching for a city that has already been searched for previously, it wont be added to the search history

// 5 day weather forecast display on the right side when a city is searched

// click event that take the value of user input in searchBox and adds it to the variable called search
submitBtn.onclick(function (event) {
  event.preventdefault();
  search = searchBox.val();

})

// on click function for each button of previously searched city to go back and look














})