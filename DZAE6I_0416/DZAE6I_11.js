$(document).ready(function() {
    console.log('Starting up engines...');

    $('#compute').click(function() {
        console.log('Computing result...');

        switch($('input[name="operation"]:checked').val()) {
            case 'multiplication':
                $('#result').html('... TODO');
                break;
            default:
                console.log('Cannot understand the operation...');
        }
    });
    
});