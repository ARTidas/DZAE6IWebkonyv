$(document).ready(function() {
    console.log('Starting up engines...');

    $('#load').click(function() {
        console.log('Loading timetable JSON data...');
        $('#timetable').html('');

        $.getJSON('DZAE6I_orarendobject.json', function(data) {
            $('#timetable').append(`
                <h3>${data.VZ_university.name}</h3>
                <p><strong>Address:</strong> ${data.VZ_university.address.zip_code} ${data.VZ_university.address.city} ${data.VZ_university.address.street}</p>
                <p><strong>Phone numbers: </strong>
            `);

            $('#timetable').append('<ul>');
            $.each(data.VZ_university.phone_numbers, function(key, record) {
                //console.log(record);
                $.each(record, function(key_2, value_2) {
                    $('#timetable').append(`<li><strong>${key_2}:</strong> ${value_2}</li>`);
                });
                
                
            });
            $('#timetable').append('</ul>');

            $('#timetable').append(`
                <hr/>
                <p><strong>PTI órarend - 2024 Tavasz:</strong></p>
            `);

            $.each(data.VZ_orarend.events, function(key, record) {
                //console.log(record);
                $('#timetable').append(`
                    <span><strong>Subject:</strong></span> ${record.course_name}<br/><br/>
                    <span><strong>Presenter:</strong></span> ${record.presenter}<br/><br/>
                    <span><strong>Major:</strong></span> ${record.major}<br/><br/>
                    <span><strong>Time:</strong></span> ${record.datetime.date}: ${record.datetime.time_start} - ${record.datetime.time_end}<br/><br/>
                    <span><strong>Place:</strong></span> ${record.address}<br/><br/>
                    <hr/>
                `);
            });
        });

    });
    
});