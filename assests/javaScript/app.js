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

    Animals.push(animals);

    renderButtons();
  });


  renderButtons();

  $("button").on('click',  function(){

        var animal = $(this).attr('data-name');

        //I hate this line of code, the fact that I was putting animals and getting the same image for every button.. one damn letter hahahaha
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=xdEyfZIyHfHB6ilBXQHP4T6bcwSi5bua&limit=10";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response){
          var results = response.data;
          console.log(results);

          for (var i = 0; i < results.length; i++) {

            if (results[i].rating !== "pg-13" && results[i].rating !== 'r') {

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


        $('#item').on('click', function state(animation){
            var state = $(this).attr("data-state");

            if (state === "still") {
              $(this).attr('src', $(this).attr('data-animate'));
              $(this).attr("data-state", "animate");
            }
            else {
              $(this).attr("src", $(this).attr('data-still'));
              $(this).attr("data-state", "still");
            }


        });
