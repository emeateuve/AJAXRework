function llevarInicio() {
    $('#contenido').empty();
    $('#contenido').append('<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">\n' +
        '        <ol class="carousel-indicators">\n' +
        '            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>\n' +
        '            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>\n' +
        '            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>\n' +
        '        </ol>\n' +
        '        <div class="carousel-inner">\n' +
        '            <div class="carousel-item active">\n' +
        '                <img class="d-block w-100" src="./img/naranja.jpg" alt="The Clockwork Orange">\n' +
        '            </div>\n' +
        '            <div class="carousel-item">\n' +
        '                <img class="d-block w-100" src="./img/oldboy.jpg" alt="Oldboy">\n' +
        '            </div>\n' +
        '            <div class="carousel-item">\n' +
        '                <img class="d-block w-100" src="./img/funny.jpg" alt="Funny Games">\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">\n' +
        '            <span class="carousel-control-prev-icon" aria-hidden="true"></span>\n' +
        '            <span class="sr-only">Anterior</span>\n' +
        '        </a>\n' +
        '        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">\n' +
        '            <span class="carousel-control-next-icon" aria-hidden="true"></span>\n' +
        '            <span class="sr-only">Siguiente</span>\n' +
        '        </a>\n' +
        '    </div>')
}

function buscarPelicula() {
    console.log('antes de ajax');
    $('#botonBuscar').click(function () {
        $.ajax({
            url: "http://www.omdbapi.com/?s=" + $("#inputPelicula").val() + "&plot=short&type=movie&apikey=31b14819",
            success: function (result) {
                if (result.Response === 'True') {
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
    $('#contenido').empty();
    $('#contenido').append(nopelicula.Error, '<hr><a>No hemos podido encontrar resultados para: <h1 style="display: inline-block;">'+nombre.val()+' </h1></a><hr>');

}

function buscarDetalle(idPelicula) {
    console.log('ID de la película: ', idPelicula);
}

function addPelicula(pelicula) {
    console.log(pelicula);
    $('#contenido').empty();
    $('#contenido').append('<a style="text-align: center">Mostrando resultados para <h1 style="display:inline-block;">' + $('#inputPelicula').val() + '</h1></a><hr>');

    for (let i = 0; i < pelicula['Search'].length; i++) {
        $('#contenido').append('<div class="card" style="width: 18rem; display: inline-block;">\n' +
            '  <img class="card-img-top" src="' + pelicula['Search'][i].Poster + '" alt="Portada no cargada!">\n' +
            '  <div class="card-body">\n' +
            '    <h5 class="card-title">' + pelicula['Search'][i].Title + '</h5>\n' +
            '    <p class="card-text">' + pelicula['Search'][i].Year + '</p>\n' +
            '    <a class="btn btn-primary" onclick="buscarDetalle(\''+ pelicula['Search'][i].imdbID + '\')">Ver detalle</a>\n' +
            '  </div>\n' +
            '</div>')
    }
}

$(document).ready(function () {
    buscarPelicula();
});