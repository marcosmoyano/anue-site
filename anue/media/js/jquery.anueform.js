;(function($) {
    var options = {
        notifyOptions: {
	    css: {
		width: '350px',
		top: '10px',
		left: '',
		right: '10px',
		border: 'none',
		padding: '5px',
		opacity: 0.6,
		cursor: 'default',
		color: '#fff',
		backgroundColor: '#000',
		'-webkit-border-radius': '10px',
		'-moz-border-radius': '10px',
		'border-radius': '10px'
	    },
	    fadeIn: 700,
            fadeOut: 1000,
            centerY: false,
	    timeout: 5000,
            showOverlay: false
        },
        blockUIOptions: {
            baseZ: 99999,
            theme: true,
            title: 'Sending Data',
            message: 'Please wait <img src="/media/images/ajax-black.gif" alt="loading..." />',
	    themedCSS: {
		width:	'10%',
		top:	'40%',
		left:	'45%'
	    }
        },
        beforeSubmit: function(formData, jqForm, opts) {
            $.blockUI(options.blockUIOptions);
        },
        success: function (data, textStatus, XMLHttpRequest, form) {
            $.unblockUI();
            $('.floating-message').click();
            if (data.success) {
                var message = ['<h3 style="text-align: left; margin: 10px">',
                               'Form Sent</h3>',
                               '<p>Thanks for your feedback, we\'ll contact ',
                               'you back shortly.</p>'];
                $.blockUI(
                    $.extend(
                        options.notifyOptions,
                        {message: message.join("")}
                    )
                );
                form.resetForm();
            } else {
                var errors, message = [];
                for (field in data['errors']) {
                    errors = data['errors'][field];
                    message.push('<h3 style="text-align: left; margin: 10px">');
                    message.push(field);
                    message.push(':</h3>');
                    for (var i=0; i < errors.length; i++) {
                        message.push('<p>');
                        message.push(errors[i]);
                        message.push('</p>');
                    }
                }
                $.blockUI(
                    $.extend(
                        options.notifyOptions,
                        {message: message.join("")}
                    )
                );
            }
        }
    };
    $.fn.anueForm = function(opts) {
        var opts = $.extend(options, opts || {});
        this.each(function() {
            $(this).ajaxForm({
                dataType: 'json',
                beforeSubmit: opts.beforeSubmit,
                success: opts.success
            });
        });
    };
})(jQuery);
