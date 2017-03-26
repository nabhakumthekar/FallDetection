$(document).ready(function() {
    /* ======= Blog Featured Post Slideshow - Flexslider ======= */
    $('.blog-slider').flexslider({
        animation: 'fade',
        slideshowSpeed: 8000
    });

    /* ======= Blog page masonry ======= */
    /* Ref: http://desandro.github.io/masonry/index.html */

    var $container = $('#blog-mansonry');
    $container.imagesLoaded(function() {
        $container.masonry({
            itemSelector: '.post'
        });
    });
});
