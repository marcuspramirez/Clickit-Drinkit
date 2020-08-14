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
                if(i==0)
                    cocktailImgDiv.addClass("active carousel-caption");
                var imgURL = cocktails[i].strDrinkThumb;
                var image = $("<img>").attr("src", imgURL).addClass("d-block w-50");
                var cocktailName = cocktails[i].strDrink;
                var ingredientDiv = $("<div>");

                for (let j = 1; j < 16; j++) {
                    console.log(cocktails[i][`strIngredient${j}`]);
                    
                    var ingredients = $("<h5>").text(cocktails[i][`strIngredient${j}`]);

                    var measurement = $("<h5>").text(cocktails[i][`strMeasure${j}`]);

                    ingredientDiv.append(ingredients, measurement);

                }

                cocktailImgDiv.append(image, cocktailName,ingredientDiv, cocktailReceipieDiv);

                $('.carousel-inner').append(cocktailImgDiv);

            }
            $("#home").empty();
            $('.cocktailSlideShow').show();
            
            
        });   
    }


});