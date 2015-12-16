var map;
$(document).ready(function() {

    /* ======== Google Map =========== */
    map = new GMaps({
        div: '#map',
        lat: 37.423816,
        lng: -122.197141
    });
    map.addMarker({
        lat: 37.423816,
        lng: -122.197141,
        title: 'Address',
        infoWindow: {
            content: '<h5 class="title">FindMe</h5><p><span class="address">325 Sharon Park Dr, Ste. 456</span><br><span class="region">Menlo Park, CA</span><br><span class="postal-code">94025</span></p>'
        }

    });

    /* ======= jQuery form validator ======= */
    /* Ref: http://jqueryvalidation.org/documentation/ */
    $("#contact-form").validate({
        submitHandler: function() {
            $.ajax({
                url: "/api/v1/contacts",
                type: "POST",
                data: JSON.stringify({'email': $('input#cemail').val(),
                    'name': $('input#cname').val(),
                    'message': $('textarea#cmessage').val()
                }),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function(result){
                    console.log("Success.");
                    $('#cemail').val('');
                    $('#cname').val('');
                    $('#cmessage').val('');
                    $('.input-form').append("<p>Thank you for your feedback :)</p>");
                },
                error: function(result){
                    if(result.status == 409){
                        console.log("Conflict.");
                    }
                }
            });
        },
        messages: {
            name: {
                required: 'Please enter your name' //You can customise this message
            },
            email: {
                required: 'Please enter your email' //You can customise this message
            },
            message: {
                required: 'Please enter your message' //You can customise this message
            }
        }
    });
});
