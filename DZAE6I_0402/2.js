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
    
    $('#container').append(`<hr/><h2>Foreach solution</h2>`);
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

    $('#container').append(`<hr/><h2>For solution</h2>`);
    for (let i = 0; i < VZObj.cars.length; i++) {
        $('#container').append(`
            <h3>${VZObj.cars[i].name}</h3>
                <ul>
        `);

        for (let j = 0; j < VZObj.cars[i].models.length; j++) {
            $('#container').append(`
                <li>${VZObj.cars[i].models[j]}</li>
            `);
        }

        $('#container').append(`
                </ul>
        `);
    }

});