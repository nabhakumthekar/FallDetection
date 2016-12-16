$(document).ready(function() {
    //var colorSelected = 'gunmetal';

    /* Preload the colors images to prevent delay when choosing colors */
    $.preloadImages = function() {
        for (var i = 0; i < arguments.length; i++) {
            $('<img />').attr('src', arguments[i]);
        }
    };

    $.preloadImages(
        'assets/images/figures/titanium.jpg',
        'assets/images/figures/black_chrome.jpg',
        'assets/images/figures/rose_gold.jpg',
        'assets/images/figures/silver.jpg'
    );

    /* Show Pre-order when the 'Pre-order' button is clicked */
    /*
    $('.plan').on('click', function(){
        $('.preorder-form').fadeIn('slow');
        $('html,body').animate({
            scrollTop: $('.preorder-form').offset().top - $('#header').height()
        });
    });
    */

    /* Change preview image to the desired color when mouse over that button */
    $('.gunmetal-color').hover(
        function() {
            $('.preview-img').attr('src', 'assets/images/figures/gunmetal.jpg');
        }
    );
    $('.titanium-color').hover(
        function() {
            $('.preview-img').attr('src', 'assets/images/figures/titanium.jpg');
        }
    );
    $('.black-chrome').hover(
        function() {
            $('.preview-img').attr('src', 'assets/images/figures/black_chrome.jpg');
        }
    );
    $('.rose-gold').hover(
        function() {
            $('.preview-img').attr('src', 'assets/images/figures/rose_gold.jpg');
        }
    );
    $('.silver-color').hover(
        function() {
            $('.preview-img').attr('src', 'assets/images/figures/silver.jpg');
        }
    );

    /* Change button state when clicked */
    $('.gunmetal-color').click(
        function() {
            $(this).addClass('active');
            $('.titanium-color').removeClass('active');
            $('.black-chrome').removeClass('active');
            $('.rose-gold').removeClass('active');
            $('.silver-color').removeClass('active');
            //colorSelected = 'gunmetal';
        }
    );
    $('.titanium-color').click(
        function() {
            $(this).addClass('active');
            $('.gunmetal-color').removeClass('active');
            $('.black-chrome').removeClass('active');
            $('.rose-gold').removeClass('active');
            $('.silver-color').removeClass('active');
            //colorSelected = 'titanium';
        }
    );
    $('.black-chrome').click(
        function() {
            $(this).addClass('active');
            $('.gunmetal-color').removeClass('active');
            $('.titanium-color').removeClass('active');
            $('.rose-gold').removeClass('active');
            $('.silver-color').removeClass('active');
            //colorSelected = 'black_chrome';
        }
    );
    $('.rose-gold').click(
        function() {
            $(this).addClass('active');
            $('.gunmetal-color').removeClass('active');
            $('.black-chrome').removeClass('active');
            $('.titanium-color').removeClass('active');
            $('.silver-color').removeClass('active');
            //colorSelected = 'rose_gold';
        }
    );
    $('.silver-color').click(
        function() {
            $(this).addClass('active');
            $('.gunmetal-color').removeClass('active');
            $('.black-chrome').removeClass('active');
            $('.rose-gold').removeClass('active');
            $('.titanium-color').removeClass('active');
            //colorSelected = 'silver';
        }
    );

    /* ======= FAQ accordion ======= */
    function toggleIcon(e) {
        $(e.target)
        .prev('.panel-heading')
        .find('.panel-title a')
        .toggleClass('active')
        .find('i.fa')
        .toggleClass('fa-plus-square fa-minus-square');
    }
    $('.panel').on('hidden.bs.collapse', toggleIcon);
    $('.panel').on('shown.bs.collapse', toggleIcon);

    /*
    $('#preorder-form').validate({
        submitHandler: function() {
            $.ajax({
                url: '/api/v1/pre-orders',
                type: 'POST',
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
                    'country': $('select#country').val(),
                    'color': colorSelected,
                    'promoCode': $('input#promoCode').val()
                }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function(result){
                    $('p#preorder-modal-label').text(
                        'We received your order. Thank you and we'll keep you updated.');

                    $('#modal-preorder').modal('show');
                },
                error: function(result){
                    if (result.status == 409) {
                        $('p#prerderModalLabel').text('Your email is already registered.');

                        $('#modal-preorder').modal('show');
                    } else if (result.status == 400) {
                        $('p#preorder-modal-label').text('The promotion code is invalid. ' +
                            'Please make sure you have the right code and try again.');

                        $('#modal-preorder').modal('show');
                    } else {
                        $('p#preorder-modal-label').text('A problem has occurred. Please try again later.');
                        $('#modal-preorder').modal('show');
                    }
                }
            });
        },
        messages: {
            email: {
                required: 'Please enter your email'
            },
            firstName: {
                required: 'Please enter your First Name'
            },
            lastName: {
                required: 'Please enter your Last Name'
            }
        }
    });

    $('#modal-preorder').on('show.bs.modal', function(event){
        var modal = $(this);
        modal.find('.modal-header h4').val('Thank you!');
        $('body').css('overflow', 'auto');
    });
    */

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
                        'Thank you for signing up. Please stay tuned for our launch.');

                    $('#modal-subscribe').modal('show');
                    $('.signup-form-top input#signup-email-top').val('');
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
