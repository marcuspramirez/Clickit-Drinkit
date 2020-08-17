$(document).ready(function () {

  $('.cocktailSlideShow').hide();
  $("#home").hide();
  $("#ageModal").show();

  var age = {};

  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  if (getCookie('popupCookie') != 'submited') {

    $('#ageModal').modal('show');
    initAge();
  }

  // starts the age verification process
  function initAge() {
    
    for (var i = 1940; i < 2021; i++){
      var year = $("<option>").attr("value", i).append(i);
      $("#verify-year").append(year);
    }
    for (var i = 1; i < 32; i++){
      var day = $("<option>").attr("value", i).append(i);
      $("#verify-day").append(day);
    }
    var month = 0;
    var day = 0;
    var year = 0;

    $("#age-submit").on("click", function () {
      age['month'] = $("#verify-month").val();
      age['day'] = $("#verify-day").val();
      age['year'] = $("#verify-year").val();
      checkDate();
    });
  }

  // Check to see if user entered a valid date...
  function checkDate() {
    if (age.month == 'none' || age.day == 'none' || age.year == 'none') {
      // Fade in the error...
      $('#modal-error').css('visibility', 'visible').hide().fadeIn('slow');

      // changes the background color of the select if invalid
      if (age.month == 'none') {
        $("#verify-month").css('background', 'rgba(223,32,44,0.5)');
        // Look for change of value and change background color when valid
        $("#verify-month").on('change', function () {
          if ($("#verify-month").val() == 'none') {
            $("#verify-month").css('background', 'rgba(223,32,44,0.5)');
          } else {
            $("#verify-month").css('background', 'white');
          }
        });
      }

      // changes the background color of the select if invalid
      if (age.day == 'none') {
        $("#verify-day").css('background', 'rgba(223,32,44,0.5)');
        // Look for change of value and change background color when valid
        $("#verify-day").on('change', function () {
          if ($("#verify-day").val() == 'none') {
            $("#verify-day").css('background', 'rgba(223,32,44,0.5)');
          } else {
            $("#verify-day").css('background', 'white');
          }
        });
      }

      // changes the background color of the select if invalid
      if (age.year == 'none') {
        $("#verify-year").css('background', 'rgba(223,32,44,0.5)');
        // Look for change of value and change background color when valid
        $("#verify-year").on('change', function () {
          if ($("#verify-year").val() == 'none') {
            $("#verify-year").css('background', 'rgba(223,32,44,0.5)');
          } else {
            $("#verify-year").css('background', 'white');
          }
        });
      }
    } else {
      oldEnough();
    }
  }

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  // Compares age entered with todays date 21 years ago...
  function oldEnough() {
    var ageLimit = moment().subtract(21, 'years').calendar();
    var birthDate = age.month + " " + age.day + " " + age.year;
    var oldEnough = moment(birthDate, "MM DD YYYY").isBefore(ageLimit, 'day');

    if (oldEnough) {
      // cookie.set('validAge', 'true');

      setCookie('popupCookie', 'submited', 1);
      $('#ageModal').modal('hide');
      // window.location.assign("./index.html")
      $('.cocktailSlideShow').hide();
      $("#home").show();
      $("#ageModal").hide();

    } else {
      //  cookie.set('validAge', 'false');
      $('#notTwentyOne').html('Sorry, not 21!')
      console.log("it is false");
    }
  }

  var cocktailUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

  $("#searchBtn").click(function () {
      var cocktail = $("#cocktail").val();
      $("#cocktail").empty();
      apiResponse(cocktail);
  });
      
  $('body').on('click', '.buttonClass', function () {

      var cocktail = $(this).attr('id');
      apiResponse(cocktail);
  }); 

  function apiResponse(cocktail){
      console.log(cocktail);
      $.ajax({
          url: cocktailUrl + cocktail,
          method: "GET",
      }).then(function (response) {
          var cocktails = response.drinks;
          console.log(cocktails);

          for (let i = 0; i < cocktails.length; i++) {
              var cocktailImgDiv = $("<div class='cocktail'>").addClass("carousel-item");
              var cocktailReceipieDiv = $("<h6>").text(cocktails[i].strInstructions);
              
              if(i==0)
                  cocktailImgDiv.addClass("active");

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

              cocktailImgDiv.append(image, cocktailName,ingredientsTable, cocktailReceipieDiv);

              if(i == 0){
                $('.carousel-inner').html(cocktailImgDiv);
              }else{
                $('.carousel-inner').append(cocktailImgDiv);
              }

          }
          $("#home").hide();
          $('.cocktailSlideShow').show();
          
          
      });   
  }
  $(".homeBtn").click(function () {
    $('.cocktailSlideShow').hide();
    $("#home").show();
  });
  

});