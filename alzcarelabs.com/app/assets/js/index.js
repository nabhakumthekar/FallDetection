jQuery(document).ready(function() {
    /* ======= jQuery FitVids - Responsive Video ======= */
    /* Ref: https://github.com/davatron5000/FitVids.js/blob/master/README.md */
    $('.video-container').fitVids();

    new WOW().init();

    $('.signup-form-top').validate({
        submitHandler: function() {
            $.ajax({
                url: '/api/v1/subscribers',
                type: 'POST',
                data: JSON.stringify({'email': $('.signup-form-top input#signup-email-top').val()}),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function(result) {
                    $('p#subscribe-modal-label').text(
                        'Thank you for signing up. Please stay tuned for updates.');

                    $('#modal-subscribe').modal('show');
                    $('.signup-form-top input#signup-email-top').val('');
                },
                error: function(result) {
                    if (result.status === 409) {
                        $('p#subscribe-modal-label').text(
                            'Thank you for signing up. Please stay tuned for updates.');

                        $('#modal-subscribe').modal('show');
                    } else {
                        $('p#subscribe-modal-label').text('A problem has occurred. Please try again later.');
                        $('#modal-subscribe').modal('show');
                    }

                    $('.signup-form-top input#signup-email-top').val('');
                }
            });
        },
        messages: {
            email: {
                required: 'Please enter your email'
            }
        }
    });

    /*
    $('.coupon-form-top').validate({
        submitHandler: function() {
            $.ajax({
                url: '/api/v1/pre-orders',
                type: 'POST',
                data: JSON.stringify({'email': $('.coupon-form-top input#coupon-email-top').val()}),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function(result) {
                    $('p#subscribe-modal-label').text('Thank you! Please check your email for your coupon code.');
                    $('#modal-subscribe').modal('show');
                    $('.coupon-form-top input#coupon-email-top').val('');
                },
                error: function(result) {
                    if (result.status === 409) {
                        $('p#subscribe-modal-label').text(
                            'Your email is already registered. Your coupon code has been resent.');

                        $('#modal-subscribe').modal('show');
                    } else {
                        $('p#subscribe-modal-label').text('A problem has occurred. Please try again later.');
                        $('#modal-subscribe').modal('show');
                    }

                    $('.coupon-form-top input#coupon-email-top').val('');
                }
            });
        },
        messages: {
            email: {
                required: 'Please enter your email'
            }
        }
    });
    */
});
