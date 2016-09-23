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

    $('.footer .signup-form').validate({
        submitHandler: function() {
            $.ajax({
                url: "/api/v1/subscribers",
                type: "POST",
                data: JSON.stringify({'email': $('.footer .signup-form input#cemail').val()}),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function(result){
                    $('p#subscribeModalLabel').text('Thank you for signing up. Please stay tuned for our launch.');
                    $('#modal-subscribe').modal('show');
                    $('.footer .signup-form input#cemail').val('');
                },
                error: function(result){
                    if (result.status == 409) {
                        $('p#subscribeModalLabel').text('Thank you for signing up. Please stay tuned for our launch.');
                        $('#modal-subscribe').modal('show');
                    } else {
                        $('p#subscribeModalLabel').text('Some problem has occurred. Please try again later.');
                        $('#modal-subscribe').modal('show');
                    }

                    $('.footer .signup-form input#cemail').val('');
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
