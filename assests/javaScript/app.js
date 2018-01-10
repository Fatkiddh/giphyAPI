// checking if javaScript page linked
// alert("hello");

// checking if jQuery CDN is working
// $("body").html("hello world");

// start of javaScript/jQuery code


var Animals = ['dog ', 'cat ', 'rabbit', 'skunk', 'goldfish', 'bird', 'ferret', 'turtle', 'sugar glider', 'chinchilla', 'hedgehog', 'hermit crab', 'gerbil', 'pygmy goat',
'chick', 'capybara', 'teacup pig', 'serval', 'salamander', 'frog',];

function renderButtons() {

      $('#animals-buttons').empty();

      for (var i = 0; i < Animals.length; i++) {

        var a = $('<button>');

        a.addClass("animal");

        a.attr('data-name', Animals[i]);

        a.text(Animals[i]);

        $("#animals-buttons").append(a);
      }
  }

  $("#add-animal").on('click', function(event) {

    event.preventDefault();

    var animals = $("#animalInput").val().trim();

    Animals.push(Animals);


  });


  renderButtons();

  $("button").on('click',  function(){

        var animal = $(this).attr('data-name');

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + Animals + "&api_key=xdEyfZIyHfHB6ilBXQHP4T6bcwSi5bua&limit=12";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response){
          var results = response.data;
          console.log(response);

          for (var i = 0; i < results.length; i++) {

            if (results[i].rating !== "pg" && results[i].rating !== 'pg-14') {

              var gifDiv = $("<div class = 'item'>");

              var rating = results[i].rating;

              var p = $("<p>").text("Rating: " + rating);

              var animalImage = $("<img>");

              animalImage.attr("src", results[i].images.fixed_height.url);
              animalImage.attr('data-state', 'animate');
              animalImage.attr('data-still', results[i].images.fixed_height_still.url);
              animalImage.attr("data-anamate", results[i].images.fixed_height.url);

              gifDiv.append(p);
              gifDiv.append(animalImage);

              $("#gifs-appear-here").prepend(gifDiv);

            }
          }
        });

  });


        $('gifDiv').on('click', function(){
            var state = $(this).attr("data-state");

            if (state === "still") {
              $(this).attr('src', $(this).attr('data-animate'));
              $(this).attr("data-state", "animate");
            }
            else {
              $(this).attr("src", $(this).attr('data-animate'));
              $(this).attr("data-stae", "still");
            }
        });
