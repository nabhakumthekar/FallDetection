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
            content: '<h5 class="title">FindMe</h5><p><span class="address">325 Sharon Park Dr, Ste. 456</span><br><span class="region">Menlo Park, CA</span><br><span class="postal-code">94025</span></p>'
        }

    });

});
