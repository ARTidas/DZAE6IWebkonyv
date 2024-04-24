$(document).ready(function() {
    console.log('Starting up engines...');

    $('#button_remove_box').click(function() {
        $('#box').remove();
    });

    $('#button_remove_content').click(function() {
        $('#box').html('');
    });
    
});