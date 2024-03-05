$(document).ready(function() {
    console.log("Starting up engines...");

    $('#id_button_k1').click(function () {
        console.log('Button K1 pressed');
        $('.container a').hide();
        $('.container ol:first li:lt(2)').hide();
        $('.container ol').eq(1).children('li').slice(-2).hide();
    });

    $('#id_button_k2').click(function () {
        console.log('Button K2 pressed');
        $('.container a').hide();
        $('.container ol:first li:lt(2)').hide();
        $('.container ol').eq(1).children('li').slice(-2).hide();
        $('#id_button_k2').hide();
    });

    $('#id_button_k3').click(function () {
        console.log('Button K3 pressed');
        $('.container h1').hide();
        $('.container a').hide();
        $('.container ol:first li:lt(2)').hide();
        $('.container ol').eq(1).children('li').slice(-2).hide();
    });

    $('#id_button_k4').click(function () {
        console.log('Button K4 pressed');
        $('.container a').hide();
        $('.container span').hide();
        $('.container ol:first li:lt(2)').hide();
        $('.container ol').eq(1).children('li').slice(-2).hide();
    });

    $('#id_button_k5').click(function () {
        console.log('Button K5 pressed');
        $('.container a').hide();
        $('.container ol:first li:lt(2)').hide();
        $('.container ol').eq(1).children('li').slice(-2).hide();
        $('.container table tr:nth-child(even)').hide();
    });
    
});