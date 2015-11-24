$(document).ready(function() {
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

  $('.plan1').on('click', function(){
    $('#plan').val('1');
    $('.preOrder-form').fadeIn('slow');
    $('html,body').animate({
      scrollTop: $(".preOrder-form").offset().top - $('#header').height()
    });
  });
  $('.plan2').on('click', function(){
    $('#plan').val('2');
    $('.preOrder-form').fadeIn('slow');
    $('html,body').animate({
      scrollTop: $(".preOrder-form").offset().top - $('#header').height()
    });
  });
  $('.plan3').on('click', function(){
    $('#plan').val('3');
    $('.preOrder-form').fadeIn('slow');
    $('html,body').animate({
      scrollTop: $(".preOrder-form").offset().top - $('#header').height()
    });
  });

  $('.zinc-color').hover(
    function(){
      $('.device-preview').css('background-color', '#bac4c8');
    }
  );
  $('.titanium-color').hover(
    function(){
      $('.device-preview').css('background-color', '#6a696f');
    }
  );
  $('.black-color').hover(
    function(){
      $('.device-preview').css('background-color', '#000000');
    }
  );
  $('.rose-gold').hover(
    function(){
      $('.device-preview').css('background-color', '#b76e79');
    }
  );
  $('.silver-color').hover(
    function(){
      $('.device-preview').css('background-color', '#cccccc');
    }
  );

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
                              'plan': $('select#plan').val()
                            }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(result){
          $('p#preOrderModalLabel').text("We received your order. Thank you and we'll keep you updated.");
          $('#modal-preorder').modal('show');
          console.log("Success.");
        },
        error: function(result){
          if(result.status == 409){
            $('p#preOrderModalLabel').text("We found an order with the same email address in our system. This order has been cancelled.");
            $('#modal-preorder').modal('show');
            console.log("Conflict.");
          }else{
            $('p#preOrderModalLabel').text("Some problem has occurred. Please try again later.");
            $('#modal-preorder').modal('show');
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
