$(document).ready(function() {
    console.log("Starting up engines...");

    $('#button_hide').click(function() {
        console.log('Hiding...');
        $('body').children('p').each(function() {
            $(this).hide();
        });
    });

    $('#button_show').click(function() {
        console.log('Showing...');
        $('body').children('p').each(function() {
            $(this).show();
        });
    });

    $('#button_toggle').click(function() {
        console.log('Toggling...');
        $('body').children('p').each(function() {
            $(this).toggle();
        });
    });


    $('#button_hide_form').click(function() {
        console.log('Hiding form...');
        $('#container').hide();
    });

    $('#button_show_form').click(function() {
        console.log('Showing form...');
        $('#container').show();
    });

    $('#button_toggle_form').click(function() {
        console.log('Toggling form...');
        $('#container').toggle();
    });


    $('#button_opacity_10').click(function() {
        console.log('Fading...');
        $('#container').fadeTo(5000, 0.1);
    });

    $('#button_opacity_50').click(function() {
        console.log('Fading...');
        $('#container').fadeTo(5000, 0.5);
    });

    $('#button_opacity_80').click(function() {
        console.log('Fading...');
        $('#container').fadeTo(5000, 0.8);
    });
    
});