$(document).ready(function() {
    console.log("Starting up engines...");

    const VZObj = {
        "name": "VZ",
        "age": 22,
        "cars": [
            {"name": "Toyota", "models": ["CHR", "Corolla", "Proace"]},
            {"name": "Ford", "models": ["Kuga", "Mondeo", "Mustang"]},
            {"name": "BMW", "models": ["320", "X3", "X5"]},
            {"name": "Fiat", "models": ["500", "Panda", "Tipo"]},
        ]
    };

    console.log(VZObj);
    console.log(VZObj.cars);
    console.log(VZObj.cars[1]);

    $('#container').html('');
    

    VZObj.cars.forEach((car) => {
        $('#container').append(`
            <h3>${car.name}</h3>
                <ul>
        `);

        car.models.forEach((model) => {
            $('#container').append(`
                <li>${model}</li>
            `);
        });

        $('#container').append(`
                </ul>
        `);
    });

});