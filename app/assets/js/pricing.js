$(document).ready(function() {
  $('.popup-form').magnificPopup({
		type: 'inline',
		preloader: false,
		focus: '#name'
	});

  $('.plan1').on('click', function(){
    $plan = '1';
  });
  $('.plan2').on('click', function(){
    $plan = '2';
  });
  $('.plan3').on('click', function(){
    $plan = '3';
  });

  $(document).on('click', '.preorder-popup-dismiss', function (e) {
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
                            'country': $('input#country').val(),
                            'plan': $plan
                          }),
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      success: function(result){
        console.log("Success.");
      }
    });
		e.preventDefault();
		$.magnificPopup.close();
	});
});
