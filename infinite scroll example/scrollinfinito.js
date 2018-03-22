$(document).ready(function() {
    var win = $(window);

    win.scroll(function() {
        if ($(document).height() - win.height() <= (win.scrollTop() +80)) {
            $('#loading').show();

            $.ajax({
                url: 'textato.html',
                dataType: 'html',
                success: function(html) {
                    $('#posts').append(html);
                    $('#loading').hide();
                }
            });
        }
    });
});