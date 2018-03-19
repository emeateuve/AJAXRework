function buscarPelicula() {
    $('#botonBuscar').click(function () {
        console.log('antes de ajax')
        $.ajax({
            url: "http://www.omdbapi.com/?s=" + $("#inputPelicula").val() + "&apikey=31b14819",
            type: "get",
            dataType: "json",
            success: function (result) {
                addPelicula(result);
                console.log(result)
            },
            error: function (nopelicula) {
                noEncontrado(nopelicula);
                console.log('no existe ompare', nopelicula)
            }

        });
        // $("#inputPelicula").val('');
    })

};

function noEncontrado(nopelicula) {
    console.log('no encontrado', nopelicula)
}

function addPelicula(pelicula) {
    $('#contenido').empty()
    $('#contenido').append('<p>Mostrando resultados </p>');

    for (let i = 0; i < pelicula['Search'].length; i++) {
        $('#contenido').append('<div class="card" style="width: 18rem; display: inline-block;">\n' +
            '  <img class="card-img-top" src="' + pelicula['Search'][i].Poster + '" alt="Portada no cargada!">\n' +
            '  <div class="card-body">\n' +
            '    <h5 class="card-title">' + pelicula['Search'][i].Title + '</h5>\n' +
            '    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card\'s content.</p>\n' +
            '    <a href="#" class="btn btn-primary">Go somewhere</a>\n' +
            '  </div>\n' +
            '</div>')

    }


}

$(document).ready(function () {
    buscarPelicula();
});