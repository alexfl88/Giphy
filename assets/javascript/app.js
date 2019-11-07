// Create an array to hold the buttons
$(document).ready(function() {

    let animals = ["Dog", "Cat", "Bird", "Bear", "Horse", "Panda", "Zebra", "Mouse", "Raccoon", "Gorilla", "Lion", "Tiger", ]

// Function to create buttons and add them onto the page

    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
        $(areaToAddTo).empty();

        for (let i=0; i < arrayToUse.length; i++) {

            let a = $("<button>");
            a.addClass(classToAdd);
            a.attr("data-type", arrayToUse[i]);
            a.text(arrayToUse[i]);

            $(areaToAddTo).append(a);
        }
    }

// Create a function that will add the images from the GIPHY API

    $(document).on("click", ".animal-button", function(){
        $("#images").empty();

        $(".animal-button").removeClass("active");
        $(this).addClass("active");

        let type = $(this).attr("data-type");
        let queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=1FBaxVKcV7ZNDrD7PKZQhAfaZ1LEfN4x&limit=10";

// Ajax callback function

    $.ajax({
        url:queryURL,
        method: "GET"
    })

    .then(function(response){
        let results = response.data;

        for (var i = 0; i < results.length; i++){
            let animalDiv = $("<div class=\"animal-type\">");

            let rating = results[i].rating;

            let a = $("<p>").text("Rating: " + rating);

            let animated = results[i].images.fixed_height.url;
            let still = results[i].images.fixed_height_still.url;

            let animalImage = $("<img>");
            animalImage.attr("src", still);
            animalImage.attr("data-still", still);
            animalImage.attr("data-animate", animated);
            animalImage.attr("data-state", "still");
            animalImage.addClass("animal-image");

            animalDiv.append(a);
            animalDiv.append(animalImage);

            $("#images").append(animalDiv);
        }
    });
});

// Set the state of giphs from still to animated when clicking each image

    $(document).on("click", ".animal-image", function(){
        let state = $(this).attr("data-state");

        if (state === "still"){
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    $("#add-animal").on("click", function(event){
        event.preventDefault();
        let newAnimal = $("input").eq(0).val();

        if(newAnimal.length > 2) {
            animals.push(newAnimal);
        }

        populateButtons(animals, "animal-button", "#animal-buttons");
    });
    populateButtons(animals, "animal-button", "#animal-buttons");

});