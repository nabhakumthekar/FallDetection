$(document).ready(function() {
    /* ======= Load partials ======= */
    $('#footerContainer').load('partials/footer.html');
    $('#subscribeDialogContainer').load('partials/subscribe-dialog.html');

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
});
