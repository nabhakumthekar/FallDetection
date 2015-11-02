var map;
jQuery(document).ready(function(){

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
            content: '<h5 class="title">FindMe</h5><p><span class="region">Address line goes here</span><br><span class="postal-code">Postcode</span><br><span class="country-name">Country</span></p>'
        }

    });

});
