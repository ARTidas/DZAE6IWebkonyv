$(document).ready(function() {
    console.log('Starting up engines...');

    $('#compute').click(function() {
        console.log('Computing result...');
        console.log($('#input_a').val());
        console.log($('#input_b').val());

        switch($('input[name="operation"]:checked').val()) {
            case 'multiplication':
                $('#result').html( $('#input_a').val() * $('#input_b').val() );
                break;
            case 'division':
                $('#result').html( $('#input_a').val() / $('#input_b').val() );
                break;
            case 'addition':
                $('#result').html( $('#input_a').val() + $('#input_b').val() );
                break;
            case 'subtraction':
                $('#result').html( $('#input_a').val() - $('#input_b').val() );
                break;
            default:
                console.log('Cannot understand the operation...');
        }
    });
    
});