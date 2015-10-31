var map;
jQuery(document).ready(function(){

    map = new GMaps({
        div: '#map',
        lat: 37.7833,
        lng: -122.4167,
    });
    map.addMarker({
        lat: 37.7833,
        lng: -122.4167,
        title: 'Address',
        infoWindow: {
            content: '<h5 class="title">FindMe</h5><p><span class="region">Address line goes here</span><br><span class="postal-code">Postcode</span><br><span class="country-name">Country</span></p>'
        }

    });

});
