$(document).ready(function () {
  // Define variables that I'm going to need
  var searchBox = $(`#search-input`);
  var submitBtn = $("#search-button");
  var historyList = $(`#history`);
  var todaySection = $(`#today`);
  var forecastSection = $(`#forecast`);
  var currentDate = dayjs().format("DD/MM/YYYY");

  // API key
  var APIkey = "3931383ffe79bcfc153c07435437822b";

  // load the previous search history from the local storage (in an array format)
  function loadSearchHistory() {
    var searchHistory = JSON.parse(localStorage.getItem(`searchHistory`)) || [];
    // display the search history in the left sidebar
    displaySearchHistory(searchHistory);
  }

  // Iterate through the array and display each previous search in the left side under search bar to a maximum of 6. When we hit 6 we insert the latest search but forget the oldest search
  function displaySearchHistory(searchHistory) {
    historyList.empty();

    // removes duplicates from search history
    var uniqueSearchHistory = [...new Set(searchHistory)];

    // display up to the most recent 6 searches
    for (var i = 0; i < Math.min(uniqueSearchHistory.length, 6); i++) {
      var listItem = $("<button>").text(uniqueSearchHistory[i]);
      historyList.prepend(listItem);
    }
  }

  // save previous search history to local storage
  function saveToLS(search) {
    var searchHistory = JSON.parse(localStorage.getItem(`searchHistory`)) || [];

    if (!searchHistory.includes(search)) {
      // additional check to ensure that the search ISNT a duplicate
      searchHistory.push(search); // add the newly added search to the history array
      searchHistory = searchHistory.slice(-6); // only keep the last 6 searches
      localStorage.setItem(`searchHistory`, JSON.stringify(searchHistory)); // save the updated history array to local storage
      displaySearchHistory(searchHistory); // display the updated history
    }
  }

  // fetch queryURL from the API
  function fetchWeatherData(search) {
    // Current weather data URL
    var currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${APIkey}`;

    // 5-day forecast data URL
    var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=${APIkey}`;

    // Fetch current weather data
    fetch(currentWeatherURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (currentData) {
        // Fetch 5-day forecast data after fetching current weather data
        fetch(forecastURL)
          .then(function (response) {
            return response.json();
          })
          .then(function (forecastData) {
            console.log(currentData);
            console.log(forecastData);
            displayCurrentWeather(currentData);
            displayForecast(forecastData); // Call the displayForecast function
          })
          .catch(function (error) {
            console.log("Error fetching forecast data:", error);
          });
      })
      .catch(function (error) {
        console.log("Error fetching current weather data:", error);
      });
  }

  // display current weather data
  function displayCurrentWeather(data) {
    todaySection.html(`
  <h2>${
    data.name
  } ${currentDate} <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon"></h2>
  <p>Temperature: ${(data.main.temp - 273.15).toFixed(1)} °C</p>
  <p>Wind: ${data.wind.speed} m/s</p>
  <p>Humidity: ${data.main.humidity} %</p>
  `);

    // only display the CSS styled border once a search has been run
    todaySection.css("border", "solid black 1px", "border-radius", "5px");
  }

  // display the forecasted weather data
  function displayForecast(forecastData) {
    forecastSection.empty();

    // hide the header before a search is run
    $("#forecast-header").css("display", "block");

    for (let i = 1; i <= 5; i++) {
      var forecastItem = forecastData.list[i * 8 - 1];
      if (forecastItem) {
        var forecastDate = dayjs(forecastItem.dt_txt).format("DD/MM/YYYY");
        var forecastTemp = (forecastItem.main.temp - 273.15).toFixed(1);

        var forecastCard = $("<div>").addClass("col-md-2 card forecast-card");
        var forecastCardBody = $("<div>").addClass("card-body");
        var forecastCardTitle = $("<h5>")
          .addClass("card-title")
          .text(forecastDate);
        var forecastCardText = $("<p>")
          .addClass("card-text")
          .text(`Temp: ${forecastTemp} °C`);
        var forecastWeatherIcon = $("<img>").attr(
          "src",
          `http://openweathermap.org/img/w/${forecastItem.weather[0].icon}.png`
        );
        var forecastWindText = $("<p>")
          .addClass("card-text")
          .text(`Wind: ${forecastItem.wind.speed} m/s`);
        var forecastHumidityText = $("<p>")
          .addClass("card-text")
          .text(`Humidity: ${forecastItem.main.humidity} %`);

        forecastCardBody.append(
          forecastCardTitle,
          forecastWeatherIcon,
          forecastCardText,
          forecastWindText,
          forecastHumidityText
        );
        forecastCard.append(forecastCardBody);

        forecastSection.append(forecastCard);
      }
    }
  }

  //  search function event listeners
  $("#search-form").on("submit", function (event) {
    event.preventDefault();
    var search = searchBox.val();
    if (search.trim() !== "") {
      fetchWeatherData(search);
      saveToLS(search);
      searchBox.val("");
    }
  });

  // event listener for the historic search buttons
  historyList.on("click", "button", function (event) {
    var search = event.target.textContent;
    fetchWeatherData(search);
  });

  // call the loadsearch function
  loadSearchHistory();
});
