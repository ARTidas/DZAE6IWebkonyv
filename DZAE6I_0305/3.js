$(document).ready(function() {
    console.log("Starting up engines...");

    $('.container h1').hover(function () {
        console.log('Mosue over...');
    });

    $('.container p:first strong').click(function () {
        $('.container p:first').hide();
    });

    $('.container p').eq(1).children('strong').dblclick(function() {
        $('.container p').eq(1).hide();
    });
    
});