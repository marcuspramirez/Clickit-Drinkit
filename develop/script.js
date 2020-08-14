$(document).ready(function () {

    var cocktailUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

    $("#searchBtn").click(function () {
        var cocktail = $("#cocktail").val();
        apiResponse(cocktail);
    });
        

    $('body').on('click', '.buttonClass', function () {

        var cocktail = $(this).attr('id');
        apiResponse(cocktail);
    }); 

    function apiResponse(cocktail){
        $.ajax({
            url: cocktailUrl + cocktail,
            method: "GET",
        }).then(function (response) {
            var cocktails = response.drinks;
            console.log(cocktails);

            for (let i = 0; i < cocktails.length; i++) {
                var cocktailImgDiv = $("<div class='cocktail'>").addClass("carousel-item");
                var cocktailReceipieDiv = $("<h4>").text(cocktails[i].strInstructions);
                var cocktailTarget = $("<li>").attr("data-target","#carouselExampleIndicators").attr("data-slide-to",'"' + i + '"' );
                if(i==0)
                    cocktailImgDiv.addClass("active");
                    // cocktailTarget.addClass("active");
                var imgURL = cocktails[i].strDrinkThumb;
                var image = $("<img>").attr("src", imgURL);
                var cocktailName = $("<div>").text(cocktails[i].strDrink).addClass("names");
                var ingredientsTable = $('<table>');

                var tableHeader = $("<tr>");

                var ingredientsHeader = $("<th>").text("Ingredients");

                var measurementHeader = $("<th>").text("Measurement");

                tableHeader.append(ingredientsHeader, measurementHeader);
                ingredientsTable.append(tableHeader);

                for (let j = 1; j < 16; j++) {
                    var tablerow = $("<tr>")
                    

                    var ingredients = $("<td>").text(cocktails[i][`strIngredient${j}`]);

                    var measurement = $("<td>").text(cocktails[i][`strMeasure${j}`]);

                    tablerow.append(ingredients, measurement);
                    ingredientsTable.append(tablerow);
                }

                
                $(".carousel-indicators").append(cocktailTarget);

                cocktailImgDiv.append(image, cocktailName,ingredientsTable, cocktailReceipieDiv);

                $('.carousel-inner').append(cocktailImgDiv);

            }
            $("#home").empty();
            $('.cocktailSlideShow').show();
            
            
        });   
    }


});