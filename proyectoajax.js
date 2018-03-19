function buscarPelicula() {
    $('#botonBuscar').click(function () {
        console.log('antes de ajax')
        $.ajax({
            url: "http://www.omdbapi.com/?s=" + $("#inputPelicula").val() + "&apikey=31b14819",
            success: function (result) {
                // addPelicula(result);
                console.log(result)
            },
            error: function () {
                console.log('HA habido un error compadre')
            }

        });
        $("#inputPelicula").val('');
    })

};

$(document).ready(function () {
    buscarPelicula();
});
//
// function addPelicula(pelicula) {
//     for (let i = 0; i < pelicula)
// }