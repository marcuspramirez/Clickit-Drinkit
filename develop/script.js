$(document).ready(function(){

    var cocktailUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

    // var userInput = "margarita";

    $("#searchBtn").click(function(){
        var cocktail = $("#cocktail").val();
        $.ajax({
            url: cocktailUrl + "margarita",
            method: "GET",
        }).then(function(response) {
            var cocktails = response.drinks;
            var imgURL = response.strDrinkThumb;
            var image = $("<img>").attr("src", imgURL);

            for (let i = 0; i < cocktails.length; i++) {
                console.log(cocktails[i].strDrink);
                var imgURL = cocktails[i].strDrinkThumb;
                var image = $("<img>").attr("src", imgURL);
                var cocktailTypes = cocktails[i].strDrink;
                var cocktailTypes = $("<button>").addClass("buttonClass").attr("id", cocktails[i].strDrink).text(cocktails[i].strDrink);
                $('.searchedCocktail').append(cocktailTypes,image);
            }
    });
});

    $('body').on('click', '.buttonClass', function() {
        $('.ingredientSection').empty();
        $('.instructionSection').empty();
        var alcohol = $(this).attr('id');
        console.log(alcohol);
        
        $.ajax({
            url: cocktailUrl + alcohol,
            method: "GET",
        }).then(function(response){
            console.log(response.drinks[0]);
            var instruction = $("<p>").text(response.drinks[0].strInstructions);
            
            //This loop gets ingredients and measure
            for (let i = 1; i < 16; i++) {
                console.log(i);
                var ingredients = $("<p>").text(response.drinks[0][`strIngredient${i}`]);
                var measurement = $("<p>").text(response.drinks[0][`strMeasure${i}`]);
                $('.ingredientSection').append(ingredients);
                $('.ingredientMesr').append(measurement);
            }

            $('.instructionSection').append(instruction);
        });
    })

    // function setVisibility(id, visibility) {

});