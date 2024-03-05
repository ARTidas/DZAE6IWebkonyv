$(document).ready(function() {
    console.log("Starting up engines...");

    $('#id_button').click(function () {
        console.log('Button pressed');
        $('#id_p1').hide();
        $('#id_p2').hide();
    });

    /*$('#id_link').click(function () {
        console.log('Link pressed');
        $('#id_p1').show();
        $('#id_p2').show();
    });*/
});