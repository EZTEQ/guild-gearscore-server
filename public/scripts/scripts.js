$('.haspopup').popup({on: 'hover'});

/* form validation */
$('.ui.form')
    .form({
        transition: 'fade',
        fields: {
            region: ['length[2]', 'empty'],
            realm: ['minLength[3]', 'empty'],
            guild: ['minLength[3]', 'empty']
        }
    }
);