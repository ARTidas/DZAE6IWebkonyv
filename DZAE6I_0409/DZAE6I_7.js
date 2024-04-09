$(document).ready(function() {
    console.log('Starting up engines...');

    $('#load').click(function() {
        console.log('Loading timetable JSON data...');
        
        /*fetch('VZ_timetable.json')
            .then(response => response.json())
            .then(record => {
                console.log('Loaded timetable data, displaying information...');
                //console.log(record);
                //$('#timetable').html(JSON.stringify(record.VZ_orarend.event[0]));

                $('#timetable').html(`
                    <span><strong>ID:</strong></span> #${record.VZ_orarend.event[0].id}<br/>
                    <span><strong>Type:</strong></span> ${record.VZ_orarend.event[0].type}<br/>
                    <span><strong>Start:</strong></span> ${record.VZ_orarend.event[0].start}<br/>
                    <span><strong>End:</strong></span> ${record.VZ_orarend.event[0].end}<br/>
                    <span><strong>Location:</strong></span> ${record.VZ_orarend.event[0].location}<br/>
                    <span><strong>Description:</strong></span> ${record.VZ_orarend.event[0].description}<br/>
                `);
            })
            .catch(error => console.error("Error fetching JSON data:", error))
        ;*/

        $.ajax({
            url: 'VZ_timetable.json',
            dataType: 'json',
            success: function(record) {
                console.log('Loaded timetable data, displaying information...');
                
                $('#timetable').html(`
                    <span><strong>ID:</strong></span> #${record.VZ_orarend.event[0].id}<br/>
                    <span><strong>Type:</strong></span> ${record.VZ_orarend.event[0].type}<br/>
                    <span><strong>Start:</strong></span> ${record.VZ_orarend.event[0].start}<br/>
                    <span><strong>End:</strong></span> ${record.VZ_orarend.event[0].end}<br/>
                    <span><strong>Location:</strong></span> ${record.VZ_orarend.event[0].location}<br/>
                    <span><strong>Description:</strong></span> ${record.VZ_orarend.event[0].description}<br/>
                `);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Error fetching JSON data:", errorThrown);
            }
        });
    });
    
});