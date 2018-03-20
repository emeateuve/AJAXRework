function buscarPelicula() {
    $('#botonBuscar').click(function () {
        $.ajax({
            url: "http://www.omdbapi.com/?s=" + $("#inputPelicula").val() + "&apikey=31b14819",
            type: "get",
            dataType: "json",
            success: function (result) {
                if (result.Response === 'True'){
                    addPelicula(result);
                } else {
                    noEncontrado(result, $('#inputPelicula'))
                }
            },
            error: function (result) {
                noEncontrado(result, $('#inputPelicula'));
            }

        });
        // $("#inputPelicula").val('');
    })

};

function noEncontrado(nopelicula, nombre) {
    $('#contenido').empty()
    $('#contenido').append(nopelicula.Error, '<p>No hemos podido encontrar resultados para</p>',nombre.val());

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