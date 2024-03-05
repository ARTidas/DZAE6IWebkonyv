$(document).ready(function() {
    console.log("Starting up engines...");

    $('.container h1').hover(function () {
        console.log('Mosue over header...');
        alert('Mouse over header...');
    });

    $('.container p:first strong').click(function () {
        $('.container p:first').hide();
    });

    $('.container p').eq(1).children('strong').dblclick(function() {
        $('.container p').eq(1).hide();
    });

    $('.container button').click(function () {
        console.log('Mouse over button...');
        alert('Mouse over header...');
    });

    
    
});