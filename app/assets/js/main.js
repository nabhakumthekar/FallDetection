$(document).ready(function() {

    /* ======= Twitter Bootstrap hover dropdown ======= */
    /* Ref: https://github.com/CWSpear/bootstrap-hover-dropdown */
    /* apply dropdownHover to all elements with the data-hover="dropdown" attribute */

    $('[data-hover="dropdown"]').dropdownHover();

    /* ======= Fixed header when scrolled ======= */
    $(window).on('scroll load', function() {

         if ($(window).scrollTop() > 0) {
             $('#header').addClass('scrolled');
         }
         else {
             $('#header').removeClass('scrolled');

         }
    });


    /* ======= jQuery Placeholder ======= */
    /* Ref: https://github.com/mathiasbynens/jquery-placeholder */

    $('input, textarea').placeholder();

    /* ======= jQuery FitVids - Responsive Video ======= */
    /* Ref: https://github.com/davatron5000/FitVids.js/blob/master/README.md */

    $(".video-container").fitVids();

    /* ======= FAQ accordion ======= */
    function toggleIcon(e) {
    $(e.target)
        .prev('.panel-heading')
        .find('.panel-title a')
        .toggleClass('active')
        .find("i.fa")
        .toggleClass('fa-plus-square fa-minus-square');
    }
    $('.panel').on('hidden.bs.collapse', toggleIcon);
    $('.panel').on('shown.bs.collapse', toggleIcon);


    /* ======= Header Background Slideshow - Flexslider ======= */
    /* Ref: https://github.com/woothemes/FlexSlider/wiki/FlexSlider-Properties */

    $('.bg-slider').flexslider({
        animation: "fade",
        directionNav: false, //remove the default direction-nav - https://github.com/woothemes/FlexSlider/wiki/FlexSlider-Properties
        controlNav: false, //remove the default control-nav
        slideshowSpeed: 8000
    });

	/* ======= Stop Video Playing When Close the Modal Window ====== */
    $("#modal-video .close").on("click", function() {
        $("#modal-video iframe").attr("src", $("#modal-video iframe").attr("src"));
    });


     /* ======= Testimonial Bootstrap Carousel ======= */
     /* Ref: http://getbootstrap.com/javascript/#carousel */
    $('#testimonials-carousel').carousel({
      interval: 8000
    });

    /* ======== Subscription Function ======== */
    $('button#subscribe').on('click', function(){
    $.ajax({
      url: "/api/v1/subscribers",
      type: "POST",
      data: JSON.stringify({'email': $('input#email').val()}),
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      success: function(result){
        $('p#subscribeModalLabel').text('Thank you for signing up. Please stay tuned for our launch.');
        $('#modal-subscribe').modal('show');
        $('#email').val('');
      },
      error: function(result){
        if(result.status == 409){
          $('p#subscribeModalLabel').text('You have already signed up. Please stay tuned for our launch.');
          $('#modal-subscribe').modal('show');
        }else{
          $('p#subscribeModalLabel').text('Some problem has occurred. Please try again later.');
          $('#modal-subscribe').modal('show');
        }
        $('#email').val('');
      }
    });
  });

    $('#modal-subscribe').on('show.bs.modal', function(event){
      var modal = $(this);
      modal.find('.modal-header h4').val('Thank you!');
  });

    //$('.signup-form').validate();
});
