jQuery(document).ready(function(){

    /* ======= jQuery FitVids - Responsive Video ======= */
    /* Ref: https://github.com/davatron5000/FitVids.js/blob/master/README.md */
    $(".video-container").fitVids();

    new WOW().init();

    $('.promo .signup-form').validate({
        submitHandler: function() {
            $.ajax({
                url: "/api/v1/subscribers",
                type: "POST",
                data: JSON.stringify({'email': $('.promo .signup-form input#cemail').val()}),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function(result){
                    $('p#subscribeModalLabel').text('Thank you for signing up. Please stay tuned for our launch.');
                    $('#modal-subscribe').modal('show');
                    $('.promo .signup-form input#cemail').val('');
                },
                error: function(result) {
                    if (result.status == 409) {
                        $('p#subscribeModalLabel').text('Thank you for signing up. Please stay tuned for our launch.');
                        $('#modal-subscribe').modal('show');
                    } else {
                        $('p#subscribeModalLabel').text('Some problem has occurred. Please try again later.');
                        $('#modal-subscribe').modal('show');
                    }

                    $('.promo .signup-form input#cemail').val('');
                }
            });
        },
        messages: {
            email: {
                required: 'Please enter your email'
            }
        }
    });

});
