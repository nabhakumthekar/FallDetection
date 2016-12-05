$(document).ready(function() {
    /* ======= Fixed header when scrolled ======= */
    $(window).on('scroll load', function() {
        if ($(window).scrollTop() > 0) {
            $('#header').addClass('scrolled');
        } else {
            $('#header').removeClass('scrolled');
        }
    });

    /* ======= Testimonial Bootstrap Carousel ======= */
    /* Ref: http://getbootstrap.com/javascript/#carousel */
    $('#testimonials-carousel').carousel({
        interval: 8000
    });

    /* ======== Subscription Function ======== */
    $('#modal-subscribe').on('show.bs.modal', function(event) {
        var modal = $(this);
        modal.find('.modal-header h4').val('Thank you!');
        $('body').css('overflow', 'auto');
    });

    $('.signup-form').validate({
        submitHandler: function() {
            $.ajax({
                url: '/api/v1/pre-orders',
                type: 'POST',
                data: JSON.stringify({'email': $('.signup-form input#cemail').val()}),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function(result) {
                    $('p#subscribeModalLabel').text('Thank you! Please check your email for your coupon code.');
                    $('#modal-subscribe').modal('show');
                    $('.signup-form input#cemail').val('');
                },
                error: function(result) {
                    if (result.status === 409) {
                        $('p#subscribeModalLabel').text(
                            'Your email is already registered. Your coupon code has been resent.');

                        $('#modal-subscribe').modal('show');
                    } else {
                        $('p#subscribeModalLabel').text('A problem has occurred. Please try again later.');
                        $('#modal-subscribe').modal('show');
                    }

                    $('.signup-form input#cemail').val('');
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
