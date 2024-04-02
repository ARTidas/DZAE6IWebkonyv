$(document).ready(function() {
    console.log("Starting up engines...");

    let VZObj = '{"name":"Kiss István", "age":"20", "cars":["Frod", "BMW", "Fiat"]}';
    VZObj = JSON.parse(VZObj);
    console.log(VZObj);
    console.log(VZObj.cars);
    console.log(VZObj.cars[1]);

    $('#container').html(VZObj.cars[1]);

});