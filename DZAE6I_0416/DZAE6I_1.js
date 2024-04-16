$(document).ready(function() {
    console.log("Starting up engines...");

    $("#date").datepicker();

    var url = "https://jsonplaceholder.typicode.com/posts/1";

    $.getJSON(url, function(data) {
        var title = data.title;
        alert(title);
    });

});