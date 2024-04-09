$(document).ready(function() {
    console.log("Starting up engines...");

    $('#button_text').click(function() {
        $('#box').html('HTML code...');
    });

    $('#button_html').click(function() {
        $('#box').html('<strong>THE - PTI</strong>');
    });

    $('#button_value').click(function() {
        console.log($('#name').val());
        $('#box').html(
            //$('#name').text()
            $('#name').val()
        );
    });
    
});