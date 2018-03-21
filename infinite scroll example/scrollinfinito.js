$(document).ready(function() {
    var win = $(window);

    // Each time the user scrolls
    win.scroll(function() {
        // End of the document reached?
        if ($(document).height() - win.height() === win.scrollTop()) {
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