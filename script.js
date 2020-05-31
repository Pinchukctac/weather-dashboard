// created the Variables 
var input = "";
var cityName = "";
var temperature = "";
var humidity = "";
var windSpeed = "";
var uvIndex = "";
var lat = "";
var long = "";
var uvIndex = "";
var storedCities = [];


// On click event for current weather
$("#search-button").on("click", function(event){
    event.preventDefault();
    var input = $("#search-input").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + input + "&appid=e9a9052aaa132988695d1b11382ed400"

    
    // Ajax call
    $.ajax({
        url: queryURL,
        method: "GET"
    })

    //  Function to pull current weather and append it to the HTML file
    .then(function(response){

            $('#city-name').empty();

            lat = response.coord.lat
            long = response.coord.lon

            var temp = (response.main.temp - 273.15) * 1.80 + 32;    
            var tempF = (Math.floor(temp))
            var city = $("#city-name").addClass("card-title").text(response.name);
            var temperature = $(".row1").addClass("card-text current-temp").text("Temperature: " + tempF + " °F");
            var humidity = $(".row2").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
            var wind = $(".row3").addClass("card-text current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
            var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
            

            $(city).append(image)
            saveLocation(input)

    })

    // function that pulls the UV index
    .then(function(event2){

        var uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=e9a9052aaa132988695d1b11382ed400&lat="+lat+"&lon="+long

        $.ajax({
            url: uvQueryURL,
            method: "GET"
        })
    
        .then(function(response2){  

            

           uvIndex = $(".row4").addClass("card-text current-UV").text("UV Index: " + response2.value); 

           if(response2.value >= 10){
            uvIndex.addClass("red")
            }
            else if( response2.value < 10 || response2.value >= 4){
                uvIndex.addClass("orange")
            }
            else {
                uvIndex.addClass("green")
            }
        
        })
    })
});



// On click event for 5 day forcast 
$("#search-button").on("click", function(event){
    event.preventDefault();
    var input = $("#search-input").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + input + "&appid=e9a9052aaa132988695d1b11382ed400"


    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .then(function(response){

    $('#forecast').empty();
    var results = response.list
    
    for (var i = 0; i < results.length; i++){

    if(results[i].dt_txt.indexOf("12:00:00") !== -1){

    var temp = (results[i].main.temp- 273.15)* 1.80 + 32;
    var tempF = (Math.floor(temp)) 
    var forecastDate = results[i].dt_txt;
    var card = $("<div>").addClass("card");
    var cardBody = $("<div>").addClass("card-body");
    
    var humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + results[i].main.humidity + "%");
    var temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempF + " °F");

    // created cards for the each day

    $(cardBody).append(forecastDate, temperature, humidity);
    $(card).append(cardBody);
    $("#forecast").append(card)
    
    }
    }
    })


});


// function to store to local storage 
function saveLocation(input){
    //add this to the saved locations array
    if (storedCities === null) {
        storedCities = [input];
    }
    else if (storedCities.indexOf(input) === -1) {
        storedCities.push(input);
    }
    //save the new array to localstorage
    localStorage.setItem("city", JSON.stringify(storedCities));
}

// retrieve searches from local storage
function savedStorage() {
    //grab previous locations from local storage
    savedcities = JSON.parse(localStorage.getItem("city"));
     //display buttons for previous searches
    if (savedcities) {
        //get the last city searched so we can display it
        currentLoc = savedCities[savedCities.length - 1];
        showPrevious();

    }
}
    
// Display the cities from local storage
function showPrevious() {
            
    if (savedCities) {
        $("#history").empty();
            var btns = $("<div>").attr("class", "list-group");
             for (var i = 0; i < savedCities.length; i++) {
                var locBtn = $("<a>").attr("href", "#").attr("id", "loc-btn").text(savedCities[i]);
                 if (savedCities[i] == currentLoc){
                    locBtn.attr("class", "list-group-item list-group-item-action active");
                }
                else {
                    locBtn.attr("class", "list-group-item list-group-item-action");
                }
                btns.prepend(locBtn);
        }
            $("#history").append(btns);
    }
}
        
