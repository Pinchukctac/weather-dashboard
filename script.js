// created the Variables 
var input = $("#search-input").val();
var cityName = "";
var temperature = "";
var humidity = "";
var windSpeed = "";
var uvIndex = "";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + input + "&appid=e9a9052aaa132988695d1b11382ed400"



// On click event
$("#search-button").on("click", function(event){

    // Ajax call
    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function(response){
        console.log(queryURL);
        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++){

        }
        })

    





});

// make variables for input, cities search history
// click event button
// funtion that is used when we click button to call API 
// fuction argument cities names 
// display info thats pulled from api (append to HTML)
// if statement to push a css class to UV index based on range numbers
// create array that checks if search is already in it, if not then it adds to the array. saves it to local storage. limit number to 5 previous searches. check the array.length. (array.push "value"). if already 5 long, delete the first one "look up syntax". pull array local storage on refresh and pull last search from array and get info from API and dispay. 
// (.epmty). when clicking search button, deletes info from the HTML so that oit only show info from the new search. 

//  think how/why when you think of every step. 