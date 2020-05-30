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



// On click event for current weather
$("#search-button").on("click", function(event){
    event.preventDefault();
    var input = $("#search-input").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + input + "&appid=e9a9052aaa132988695d1b11382ed400"
    // console.log(queryURL);
    // console.log(input);

    
    // Ajax call
    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .then(function(response){
            // console.log(queryURL);
            // console.log(response);

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

        

    })

    .then(function(event2){

        var uvQueryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=e9a9052aaa132988695d1b11382ed400&lat="+lat+"&lon="+long

        $.ajax({
            url: uvQueryURL,
            method: "GET"
        })
    
        .then(function(response2){  


           uvIndex = $(".row4").addClass("card-text current-UV").text("UV Index: " + response2.value); 
        
        })
    })
});


// On click event for 5 day forcast 
$("#search-button").on("click", function(event){
    event.preventDefault();
    var input = $("#search-input").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + input + "&appid=e9a9052aaa132988695d1b11382ed400"
    // console.log(queryURL);
    // console.log(input);


    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .then(function(response){
        // console.log(response)

    $('#forecast').empty();
    var results = response.list
    // console.log(results)
    
    for (var i = 0; i < results.length; i++){

    // var day = Number(results[i].dt_txt.split('-')[2].split(' ')[0]);
    // var hour = results[i].dt_txt.split('-')[2].split(' ')[1];
    //   console.log(day);
    //   console.log(hour);

    if(results[i].dt_txt.indexOf("12:00:00") !== -1){

    var temp = (results[i].main.temp- 273.15)* 1.80 + 32;
    var tempF = (Math.floor(temp)) 
    var forecastDate = results[i].dt_txt
    var card = $("<div>").addClass("card");
    var cardBody = $("<div>").addClass("card-body");
    
    var humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + results[i].main.humidity + "%");
    var temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempF + " °F");

    

    // $(city).append(image)
    $(cardBody).append(forecastDate, temperature, humidity);
    $(card).append(cardBody);
    $("#forecast").append(card)
    
    }
    }
    })


});




// function to store to local storage 





// make variables for input, cities search history


// fuction argument cities names 

// if statement to push a css class to UV index based on range numbers

// create array that checks if search is already in it, if not then it adds to the array. saves it to local storage. limit number to 5 previous searches. check the array.length. (array.push "value"). if already 5 long, delete the first one "look up syntax". pull array local storage on refresh and pull last search from array and get info from API and dispay. 
