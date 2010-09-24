var BASE_URI = location.href.replace(/#.*/,''); // local url without hash
var anue = {};
anue.scroll_to = function(hash) {
    if (hash) {
        try {
            $.scrollTo(hash, 750, {
                onAfter: function() {
                    location = hash;
                }
            });
        } catch(e) {};
    }
};
anue.adjust_footer = function() {
    var section_height = 510;
    var footer_height = 70;
    var default_margin = 1024;
    var inner_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var offset = -(default_margin - (inner_height - section_height) + footer_height);
    $('#footer-container').css('margin-top', offset);
};
anue.adjust_scroll = function() {
    anue.scroll_to(location.href.slice(BASE_URI.length));
};
$(document).ready(function() {
    anue.adjust_footer();
    $(window).resize(function() {
        anue.adjust_footer();
        anue.adjust_scroll();
    });
    $("a").click(function() {
        var uri = this.href.slice(0, BASE_URI.length);
        var hash = this.href.slice(BASE_URI.length);
        if (uri == BASE_URI && hash) {
            anue.scroll_to(hash);
        }
        return false;
    });
});
