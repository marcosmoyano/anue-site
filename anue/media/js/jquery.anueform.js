;(function($) {
    var options = {
        notifyOptions: {
	    sticky: false,
	    class_name: 'form-messages',
   	    time: 3000
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
                $.fn.colorbox.close();
                $.gritter.add($.extend(
                    options.notifyOptions,
                    {title: 'Form sent', text: ' '}
                ));
                form.resetForm();
            } else {
                if ($('#cboxOverlay:visible').length == 0) {
                    $.colorbox({href:"about:blank"});
                }
                var errors, title, message;
                for (field in data['errors']) {
                    errors = data['errors'][field];
                    title = ['<h3>', field, '</h3>'];
                    message = [];
                    for (var i=0; i < errors.length; i++) {
                        message.push('<p>');
                        message.push(errors[i]);
                        message.push('</p>');
                    }
                    $.gritter.add($.extend(
                        options.notifyOptions,
                        {title: title.join(""), text: message.join("")}
                    ));
                }
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
