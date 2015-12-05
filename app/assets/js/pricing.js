$(document).ready(function() {
  var color_selected = "gunmetal";

  /* Get countries list when loading the page */
  $.ajax({
    url: "/api/v1/data/countries",
    type: "GET",
    dataType: "json",
    success: function(data){
      var countries = [];
      $.each( data, function() {
        countries.push( "<option value='" + this.countryCode + "'>" + this.countryName + "</option>" );
      });
      $('#country').append(countries + "</select>");
    }
  });

  /* Preload the colors images to prevent delay when choosing colors */
  $.preloadImages = function() {
    for (var i = 0; i < arguments.length; i++) {
      $("<img />").attr("src", arguments[i]);
    }
  }

  $.preloadImages("assets/images/figures/titanium.jpg","assets/images/figures/black_chrome.jpg", "assets/images/figures/rose_gold.jpg", "assets/images/figures/silver.jpg");

  /* Show Pre-order when the 'Pre-order' button is clicked */
  $('.plan').on('click', function(){
    $('.preOrder-form').fadeIn('slow');
    $('html,body').animate({
      scrollTop: $(".preOrder-form").offset().top - $('#header').height()
    });
  });

  /* Change preview image to the desired color when mouse over that button */
  $('.gunmetal-color').hover(
    function(){
      $('.preview-img').attr('src', 'assets/images/figures/gunmetal.jpg');
    }
  );
  $('.titanium-color').hover(
    function(){
      $('.preview-img').attr('src', 'assets/images/figures/titanium.jpg');
    }
  );
  $('.black-chrome').hover(
    function(){
      $('.preview-img').attr('src', 'assets/images/figures/black_chrome.jpg');
    }
  );
  $('.rose-gold').hover(
    function(){
      $('.preview-img').attr('src', 'assets/images/figures/rose_gold.jpg');
    }
  );
  $('.silver-color').hover(
    function(){
      $('.preview-img').attr('src', 'assets/images/figures/silver.jpg');
    }
  );

  /* Change button state when clicked */
  $('.gunmetal-color').click(
    function(){
      $(this).addClass('active');
      $('.titanium-color').removeClass('active');
      $('.black-chrome').removeClass('active');
      $('.rose-gold').removeClass('active');
      $('.silver-color').removeClass('active');
      color_selected = "gunmetal";
    }
  );
  $('.titanium-color').click(
    function(){
      $(this).addClass('active');
      $('.gunmetal-color').removeClass('active');
      $('.black-chrome').removeClass('active');
      $('.rose-gold').removeClass('active');
      $('.silver-color').removeClass('active');
      color_selected = "titanium";
    }
  );
  $('.black-chrome').click(
    function(){
      $(this).addClass('active');
      $('.gunmetal-color').removeClass('active');
      $('.titanium-color').removeClass('active');
      $('.rose-gold').removeClass('active');
      $('.silver-color').removeClass('active');
      color_selected = "black_chrome";
    }
  );
  $('.rose-gold').click(
    function(){
      $(this).addClass('active');
      $('.gunmetal-color').removeClass('active');
      $('.black-chrome').removeClass('active');
      $('.titanium-color').removeClass('active');
      $('.silver-color').removeClass('active');
      color_selected = "rose_gold";
    }
  );
  $('.silver-color').click(
    function(){
      $(this).addClass('active');
      $('.gunmetal-color').removeClass('active');
      $('.black-chrome').removeClass('active');
      $('.rose-gold').removeClass('active');
      $('.titanium-color').removeClass('active');
      color_selected = "silver";
    }
  );

  /* Form validation */
  $('#preorder-form').validate({
    submitHandler: function() {
      $.ajax({
        url: "/api/v1/pre-orders",
        type: "POST",
        data: JSON.stringify({'email': $('input#email').val(),
                              'firstName': $('input#firstName').val(),
                              'lastName': $('input#lastName').val(),
                              'dateOfBirth': $('input#DoB').val(),
                              'phone': $('input#phone').val(),
                              'addressLine1': $('input#addr1').val(),
                              'addressLine2': $('input#addr2').val(),
                              'city': $('input#city').val(),
                              'stateProvince': $('input#state').val(),
                              'postalCode': $('input#zip').val(),
                              'country': $('select#country').val(),
                              'color': color_selected,
                              'promoCode': $('input#promoCode').val()
                            }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(result){
          $('p#preOrderModalLabel').text("We received your order. Thank you and we'll keep you updated.");
          $('#modal-preorder').modal({backdrop: false});
        },
        error: function(result){
          if(result.status == 409){
            $('p#preOrderModalLabel').text("We found an order with the same email address in our system. This order has been cancelled.");
            $('#modal-preorder').modal({backdrop: false});
          }else if (result.status == 400) {
            $('p#preOrderModalLabel').text("The promotion code is invalid. Please make sure you have the right code.");
            $('#modal-preorder').modal({backdrop: false});
          }
          else{
            $('p#preOrderModalLabel').text("Some problem has occurred. Please try again later.");
            $('#modal-preorder').modal({backdrop: false});
          }
        }
      });
    },
    messages: {
      email: {
        required: 'Please enter your email'
      },
      firstName: {
        required: 'Please enter your First Name'
      },
      lastName: {
        required: 'Please enter your Last Name'
      },
    }
  });

  $('#modal-preorder').on('show.bs.modal', function(event){
    var modal = $(this);
    modal.find('.modal-header h4').val('Thank you!');
  });

});
