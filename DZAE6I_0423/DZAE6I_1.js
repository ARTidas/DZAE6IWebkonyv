$(document).ready(function() {
    console.log('Starting up engines...');

    $('#button_add_text').click(function() {
        $('#box').text('Programtervező Informatikus');
    });

    $('#button_button').click(function() {
        $(this).text(
            'PTI - ' + $(this).text()
        );
    });

    $('#button_add_new_button').click(function() {
        $('#button_add_form_header').after(
            '<button>THE PTI</button>'
        );
    });

    $('#button_add_header').click(function() {
        $('#title').after('<h2 id="new_header">New header</h2>');
    });

    $('#button_add_subtitle').click(function() {
        $('#new_header').after('<h3>New subtitle</h3>');
    });

    $('#button_add_form_header').click(function() {
        $('#form').before('<h2>Form header</h2>');
    });
    
});