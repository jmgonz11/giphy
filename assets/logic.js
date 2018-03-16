$(document).ready(function(){

    var buttonsMade = ["Doug the Pug", "Golden Retriver", "French Bulldog"];


    function renderButtons(){ 

        $("#buttonDisplay").empty();

        for (var i = 0; i < buttonsMade.length; i++){

            var inputButton = $("<button>") 
            inputButton.attr("class", "btn btn-default");
            inputButton.attr("id", "input")  
            inputButton.attr("data-name", buttonsMade[i]); 
            inputButton.text(buttonsMade[i]); 
            $("#buttonDisplay").append(inputButton); 
        }
    }

    function displayImg(){

        $("#display-images").empty();

        var input = $(this).attr("data-name");

        var limit = 10;

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + "&api_key=dc6zaTOxFJmzC";   

        $.ajax({
            url: queryURL, 
            method: "GET"
            }).done(function(response) {

            for (var i = 0; i < limit; i++) {    

                var displayDiv = $("<div>");
                displayDiv.addClass("holder");
            
                var image = $("<img>");
                image.attr("src", response.data[j].images.original_still.url);
                image.attr("data-still", response.data[j].images.original_still.url);
                image.attr("data-animate", response.data[j].images.original.url);
                image.attr("data-state", "still");
                image.attr("class", "gif");
                displayDiv.append(image);

                var rating = response.data[j].rating;
                console.log(response);
                var pRating = $("<p>").text("Rating: " + rating);
                displayDiv.append(pRating)

                $("#display-images").append(displayDiv);
            }
        });
    }




    function moveGif() {          

        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        if(state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }

        else if(state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }   
    }




    $("#submitPress").on("click", function(){

        var input = $("#user-input").val().trim();
        form.reset();
        buttonsMade.push(input);
                
        renderButtons();

        return false;
    })

    renderButtons();

    $(document).on("click", "#input", displayImg);
    $(document).on("click", ".gif", moveGif);
});