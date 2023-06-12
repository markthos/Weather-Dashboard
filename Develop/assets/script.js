var apiKey = "afaa521d2dafd7fb1f1d6229090e3a2d";
    var units = 'imperial';
    // Function to fetch weather data
    function getWeatherData(city) {
      var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;

      $.ajax( {
        url: apiUrl,
        method: "GET",
        dataType: "json",
        success: function(response) {
          // Update current weather section
          var currentWeather = response.list[0];
          var city = response.city.name;
          var date = new Date(currentWeather.dt_txt);
          var iconUrl = `http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`;
          var temperature = currentWeather.main.temp;
          var humidity = currentWeather.main.humidity;
          var windSpeed = currentWeather.wind.speed;

          $("#current-city").text(city);
          $("#current-date").text(date.toDateString());
          $("#weather-icon").attr("src", iconUrl);
          $("#current-temp").text("Temperature: " + temperature + "°F");
          $("#current-humidity").text("Humidity: " + humidity + "%");
          $("#current-wind-speed").text("Wind Speed: " + windSpeed + "m/s");
                 // Update search history
            $("#history-list").prepend(`<li>${city}</li>`);

          // Update forecast section
          $("#forecast-list").empty();

          for (var i = 1; i < response.list.length; i += 8) {
            var forecast = response.list[i];
            var forecastDate = new Date(forecast.dt_txt);
            var forecastIconUrl = `http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
            var forecastTemp = forecast.main.temp;
            var forecastHumidity = forecast.main.humidity;
            var forecastWindSpeed = forecast.wind.speed;

            var forecastItem = `
              <div class="forecast-item">
                <div>${forecastDate.toDateString()}</div>
                <img src="${forecastIconUrl}" alt="Weather Icon">
                <div>Temperature: ${forecastTemp}°F</div>
                <div>Humidity: ${forecastHumidity}%</div>
                <div>Wind Speed: ${forecastWindSpeed}m/s</div>
              </div>
            `;

            $("#forecast-list").append(forecastItem);
           
          }
        }
      });
    }

// Event listener for search button
$("#search-button").click(function() {
  var city = $("#city-input").val().trim();
  if (city !== "") {
    getWeatherData(city);
    $("#city-input").val("");
  }
});

// Event listener for search history
$("#history-list").on("click", "li", function() {
  var city = $(this).text();
  getWeatherData(city);
});