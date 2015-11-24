/* ======= Animations ======= */
$(document).ready(function() {
    /* ======= Auto play Youtube in Bootstrpa Modal ======= */
    $('#modal-video').on('hidden.bs.modal', function () {
      $('#modal-video iframe').attr('src', $('#modal-video iframe').attr('src').replace('autoplay=1','autoplay=0'));
    });

    $('#modal-video').on('shown.bs.modal', function () {
      $('#modal-video iframe').attr('src', $('#modal-video iframe').attr('src').replace('autoplay=0', 'autoplay=1'));
    });

});
