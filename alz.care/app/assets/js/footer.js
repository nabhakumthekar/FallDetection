$(function() {
    /* ======== Subscription Function ======== */
    $('#modal-subscribe').on('show.bs.modal', function(event) {
        var modal = $(this);
        modal.find('.modal-header h4').val('Thank you!');
        $('body').css('overflow', 'auto');
    });

    $('#subFormContainer').load('partials/signup-form.html', function() {
        $('.signup-form').validate({
            submitHandler: function() {
                $.ajax({
                    url: '/api/v1/subscribers',
                    type: 'POST',
                    data: JSON.stringify({'email': $('.signup-form input#signup-email').val()}),
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    success: function(result) {
                        $('p#subscribe-modal-label').text(
                            'Thank you for signing up. Please stay tuned for our launch.');

                        $('#modal-subscribe').modal('show');
                        $('.signup-form input#signup-email').val('');
                    },
                    error: function(result) {
                        if (result.status === 409) {
                            $('p#subscribe-modal-label').text(
                                'Thank you for signing up. Please stay tuned for our launch.');

                            $('#modal-subscribe').modal('show');
                        } else {
                            $('p#subscribe-modal-label').text('A problem has occurred. Please try again later.');
                            $('#modal-subscribe').modal('show');
                        }

                        $('.signup-form input#signup-email').val('');
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

    /*
    $('#subFormContainer').load('partials/coupon-form.html', function() {
        $('.coupon-form').validate({
            submitHandler: function() {
                $.ajax({
                    url: '/api/v1/pre-orders',
                    type: 'POST',
                    data: JSON.stringify({'email': $('.coupon-form input#coupon-email').val()}),
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    success: function(result) {
                        $('p#subscribe-modal-label').text('Thank you! Please check your email for your coupon code.');
                        $('#modal-subscribe').modal('show');
                        $('.coupon-form input#coupon-email').val('');
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

                        $('.coupon-form input#coupon-email').val('');
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
    */
});
