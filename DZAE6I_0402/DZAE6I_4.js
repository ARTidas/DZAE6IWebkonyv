$(document).ready(function() {
    console.log("Starting up engines...");

    $('.container input').css('background-color', '#fff');
    $('.container input').css('border', '1px solid #fff');

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

    $('.container button').hover(function () {
        console.log('Mouse over button...');
        alert('Mouse over header...');
    });

    $('.container input').hover(function () {
        $(this).css('border', '1px solid #f00');
    });

    $('.container input').click(function () {
        $(this).css('background-color', '#0f0');
    });

    
});