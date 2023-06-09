// Latitutde and Longitude variables
var lat = 47.39
var lon = 122.21

// API URL
var apiUrl = 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={afaa521d2dafd7fb1f1d6229090e3a2d}';

// Make AJAX request
$.ajax({
    url: apiUrl,
    method: "GET",
    dataType: "json",
    success: function (resonse) {
        var temp = response.main.temp;
        var humidity = response.main.humidity;
        var windSpeed = response.wind.speed;
        console.log(temp);
        console.log(humidity);
        console.log(windSpeed);

        // Display data on page
        $("#temp").text("Temperature: " + temp);
        $("#humidity").text("Humidity: " + humidity);
        $("#windSpeed").text("Wind Speed: " + windSpeed);
    },
    error: function (xhr, status, error) {
        // Handle errors
        console.log("error");
    }
});

