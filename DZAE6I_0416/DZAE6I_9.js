$(document).ready(function() {
    console.log('Starting up engines...');

    $('#load').click(function() {
        console.log('Loading timetable JSON data...');
        $('#timetable').html('');

        $.getJSON('DZAE6I_orarend.json', function(data) {
            //console.log(data);

            $.each(data.VZ_orarend.class, function(key, record) {
                console.log(record);
                
                $('#timetable').append(`
                    <span><strong>Subject:</strong></span> ${record.subject_name}<br/><br/>
                    <span><strong>Presenter:</strong></span> ${record.presenter}<br/><br/>
                    <span><strong>Major:</strong></span> ${record.major}<br/><br/>
                    <span><strong>Time:</strong></span> ${record.events.event[0].start_datetime.date} ${record.events.event[0].start_datetime.time}<br/><br/>
                    <span><strong>Place:</strong></span> ${record.events.event[0].address.room}}<br/><br/>
                    <hr/>
                `);
            });
        });

    });
    
});