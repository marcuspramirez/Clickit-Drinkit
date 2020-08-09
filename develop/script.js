$(document).ready(function(){

    var cocktailUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

    var userInput = "margarita";

    $.ajax({
        url: cocktailUrl + userInput,
        method: "GET",
    }).then(function(response){
        var cocktails = response.drinks;

        for (let i = 0; i < cocktails.length; i++) {
            console.log(cocktails[i].strDrink);
            var cocktail = cocktails[i].strDrink;

            var cocktail = $("<button>").addClass("buttonClass").attr("id", cocktails[i].strDrink).text(cocktails[i].strDrink);
            $('#cocktailBtn').append(cocktail);
        }
    });

    $('body').on('click', '.buttonClass', function() {
        $('#ingredientSection').empty();
        $('#instructionSection').empty();
        var alcohol = $(this).attr('id');
        $.ajax({
            url: cocktailUrl + alcohol,
            method: "GET",
        }).then(function(response){

            var instruction = $("<li>").text(response.drinks[0].strInstructions);

            //This loop gets ingredients and measure
            for (let i = 1; i < 16; i++) {
                console.log(i);
                var ingredients = $("<li>").text(response.drinks[0][`strIngredient${i}`]);
                var measurement = $("<li>").text(response.drinks[0][`strMeasure${i}`]);
                $('#ingredientSection').append(ingredients, measurement);
            }

            $('#instructionSection').append(instruction);
        });
    })

});