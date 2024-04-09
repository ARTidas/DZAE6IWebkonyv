$(document).ready(function() {
    console.log("Starting up engines...");

    $('#button_animation').click(function() {
        $('#box').animate(
            {
                left: '+=300px',
                width: '+=100px',
                fontSize: '+=10px'
            },
            2000,
            'swing',
            function() {
                $('#box').animate(
                    {
                        top: '+=200px',
                        height: '+=10%',
                        fontSize: '+=10%'
                    },
                    2000,
                    'swing',
                    function() {
                        $('#box').animate(
                            {
                                left: '0px',
                                opacity: '0.4'
                            },
                            2000,
                            'swing',
                            function() {
                                $('#box').animate(
                                    {
                                        opacity: '1',
                                        fontSize: '12px',
                                        top: '-=200px'
                                    },
                                    2000,
                                    'swing',
                                    function() {
                                        alert('END');
                                    }
                                )
                            }
                        )
                    }
                );
            }
        );
    });

    $('#button_hide').click(function() {
        $('body').children('p').each(function() {
            $(this).hide();
        });
        $('#box').animate(
            {
                top: '-=180px'
            },
            0
        );
        alert('Paragraph hidden');
    });

    $('#button_toggle').click(function() {
        $('#box').toggle();
        $('#box').animate(
            {
                left: '+300px',
            },
            2000,
            'swing'
        )
    });
    
});