jQuery(document).ready(function(){

    /* ======= jQuery FitVids - Responsive Video ======= */
    /* Ref: https://github.com/davatron5000/FitVids.js/blob/master/README.md */
    $(".video-container").fitVids();

    new WOW().init();

    $('.preorder-form').validate({
        submitHandler: function() {
            $.ajax({
                url: "/api/v1/pre-orders",
                type: "POST",
                data: JSON.stringify({'email': $('.preorder-form input#cemail').val()}),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function(result){
                    $('p#subscribeModalLabel').text('Thank you! Please check your email for your coupon code.');
                    $('#modal-subscribe').modal('show');
                    $('.preorder-form input#cemail').val('');
                },
                error: function(result){
                    if (result.status == 409) {
                        $('p#subscribeModalLabel').text("Your email is already registered. Your coupon code has been resent.");
                        $('#modal-subscribe').modal('show');
                    } else {
                        $('p#subscribeModalLabel').text("A problem has occurred. Please try again later.");
                        $('#modal-subscribe').modal('show');
                    }

                    $('.preorder-form input#cemail').val('');
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
