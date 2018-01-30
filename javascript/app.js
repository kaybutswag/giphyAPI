var topics=["Oscars","Drag Queens","Delivery Pizza", "Sitcom", "Crime Show", "Modern Art","K-Pop", "West Wing", "Wine","Twins","Dungeons and Dragons","Jamie Lynn Spears"]



var buttonGenerator=function(list){
	for(i=0;i<list.length;i++){
		var a=$("<button>");
		a.attr("data-topic",list[i]);
		a.addClass("btn btn-outline-info myButton");
		a.text(list[i]);
		$(".buttonSection").append(a);
	}

}

$(document).ready(function() {

  $(".buttonSection").append(buttonGenerator(topics));

    $(".addSec").on("click",".add", function(e) {
        e.preventDefault();
        var searchTerm = $("#search").val().trim();
            var b=$("<button>");
            b.attr("data-topic",searchTerm);
            b.addClass("btn btn-outline-info myButton");
            b.text(searchTerm);
            $(".buttonSection").append(b);
    });

    $(".buttonSection").on("click",".myButton", function(event) {
        console.log("here");


        event.preventDefault();

        var gifTopic = $(this).attr("data-topic");;

        $(".gifSection").empty();
        var queryURL = "https://api.giphy.com/v1/gifs/search?q="+gifTopic+"&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            console.log(response);
        	
        	for(i=0;i<10;i++){
                var gifDiv = $("<div class='item'>");
                var gifSpace = $("<img>");
                var ratingLine =$("<p>");

        		var sImageUrl = response.data[i].images.fixed_height_still.url;
                var aImageUrl = response.data[i].images.fixed_height.url;
                var rating = response.data[i].rating;

                ratingLine.text("Rating:"+ " " + rating);
        		
                ratingLine.addClass("gifRating")

        		gifSpace.addClass("newGifs");
        		gifSpace.attr({"src": sImageUrl, "data-state": "still","data-animate": aImageUrl,"data-still": sImageUrl});
        		gifSpace.attr("alt", "gif from giphy");
                gifSpace.attr("data-state", "still");

                gifDiv.prepend(ratingLine);
                gifDiv.prepend(gifSpace);
        		$(".gifSection").append(gifDiv);
        	}

        });

    });


        $(".gifSection").on("click",".newGifs", function(ev) {
            console.log("help");
            ev.preventDefault();
            

            var state=$(this).attr("data-state");
            var stillSrc=$(this).attr("data-still");
            var actSrc=$(this).attr("data-animate");
            console.log($(this).attr("data-state"));

            if(state==="still"){
              $(this).attr("data-state","aniamte");
              $(this).attr("src",actSrc);
            }

            else{
              $(this).attr("data-state","still");
              $(this).attr("src",stillSrc);

            }

      });

});
