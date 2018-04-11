var win = $(window);
var hayPeticion = true;
var hayTitulo = false;
var contadorPagina = 1;
var peliculaBuscada = ''

// var noDisponible = $('<img src="./img/notavailable.jpg"/>');

function llevarInicio() {
    peliculaBuscada = ''
    $('#inputPelicula').val(null);
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

/*################ BUSCAR PELICULAS POR NOMBRE ######################*/

function buscarPelicula() {
    $('#botonBuscar').click(function () {
        $('#contenido').empty();
        peliculaBuscada = $('#inputPelicula').val();
        console.log('La palabra es: ', peliculaBuscada)
        contadorPagina = 1;
        $.ajax({
            url: "http://www.omdbapi.com/?s=" + peliculaBuscada + "&type=movie&apikey=31b14819",
            success: function (result) {
                if (result.Response === 'True') {
                    hayTitulo = true;
                    addPelicula(result);

                } else {
                    noEncontrado(result, peliculaBuscada)
                }
            },
            error: function (result) {
                noEncontrado(result, peliculaBuscada);
            }

        });
        // $("#inputPelicula").val('');
    });


};

function noEncontrado(nopelicula, nombre) {
    $('#contenido').empty();
    $('#contenido').append(nopelicula.Error, '<hr><a>No hemos podido encontrar resultados para: <h1 style="display: inline-block;">' + nombre + ' </h1></a><hr>');
    $('#contenido').append('<hr><a class="btn btn-warning col-6 offset-3" onclick="llevarInicio()" style="color: #000;">Volver al inicio</a>')
}

/*############## BUSCAR DETALLE DE PELICULA POR ID #######################*/

function buscarDetalle(idPelicula) {
    $.ajax({
        url: "http://www.omdbapi.com/?i=" + idPelicula + "&plot=full&apikey=31b14819",
        success: function (detalle) {
            for (let i = 0; i < detalle.Ratings.length; i++) {
                console.log(detalle.Ratings[i]);
            }
            peliculaBuscada = '';
            $('#inputPelicula').val(null);
            $('#contenido').empty();

            /*----- Descripción -----*/
            $('#contenido').append('<div class="row">');

            $('#contenido').append('<div class="col-lg-6 col-sm-6 col-md-6"><img class="img-fluid" src="'+ detalle.Poster +'"></div>');

            $('#contenido').append('<div class="col-lg-6 col-md-6 col-sm-6" id="accordion">\n' +
                '  <div class="card">\n' +
                '    <div class="card-header" id="headingOne">\n' +
                '      <h5 class="mb-0">\n' +
                '        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">\n' +
                '          Descripción: \n' +
                '        </button>\n' +
                '      </h5>\n' +
                '    </div>\n' +
                '\n' +
                '    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">\n' +
                '      <div class="card-body">\n' +
                '        ' + detalle.Plot + '\n' +
                '      </div>\n' +
                '    </div>\n' +
                '  </div>\n' +

                /*----- Información -----*/

                '  <div class="card">\n' +
                '    <div class="card-header" id="headingInfo">\n' +
                '      <h5 class="mb-0">\n' +
                '        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseInfo" aria-controls="collapseInfo">\n' +
                '          Información de la película: \n' +
                '        </button>\n' +
                '      </h5>\n' +
                '    </div>\n' +
                '\n' +
                '    <div id="collapseInfo" class="collapse" data-toggle="collapse" aria-labelledby="headingInfo" data-parent="#accordion">\n' +
                '      <div class="card-body">\n' +
                '        <p>Año: ' + detalle.Year + '</p>\n' +
                '<p>Duración: ' + detalle.Runtime + '</p>\n' +
                '<p>Director: ' + detalle.Director + '</p>\n' +
                '<p>Idioma: ' + detalle.Language + '</p>\n' +
                '<p>Género: ' + detalle.Genre + '</p>\n' +
                '<p>Actores : ' + detalle.Actors + '</p>\n' +
                '<p>Fecha: ' + detalle.Released + '</p>\n' +
                '<p>Premios: ' + detalle.Awards + '</p>\n' +
                '<p>Éxito en taquilla: ' + detalle.BoxOffice + '</p>\n' +
                '      </div>\n' +
                '    </div>\n' +
                '  </div>\n' +

                /*----- Valoraciones -----*/

                '  <div class="card">\n' +
                '    <div class="card-header" id="headingTwo">\n' +
                '      <h5 class="mb-0">\n' +
                '        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">\n' +
                '          Valoraciones\n' +
                '        </button>\n' +
                '      </h5>\n' +
                '    </div>\n' +
                '    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">\n' +
                '      <div class="card-body">');
            for (let i = 0; i < detalle.Ratings.length; i++) {
                $('#collapseTwo').append('<p>Fuente: ' + detalle.Ratings[i].Source + '</p><p>Valoración: ' + detalle.Ratings[i].Value + '</p><hr>\n')
            }
            $('#contenido').append('</div>\n' +
                '    </div>\n' +
                '  </div>\n' +
                '</div>');
            $('#contenido').append('</div>');

            $('#contenido').append('<hr><div class="row"><a class="btn btn-warning col-6 offset-3" onclick="llevarInicio()">Volver al inicio</a></div>')
        },
        error: function (nodetalle) {
            console.log('Error desde el detalle', detalle);
            noEncontrado(nodetalle)
        }
    })
    console.log('ID de la película: ', idPelicula);
}

function noCargada(pelicula) {
    pelicula.src = "./img/notavailable.jpg"
}

function addPelicula(pelicula) {
    console.log('añade pelicula')
    console.log(pelicula);
    // $('#contenido').empty();
    if (hayTitulo === true) {
        $('#contenido').append('<a style="text-align: center">Mostrando resultados para <h1 style="display:inline-block;">' + peliculaBuscada + '</h1></a><hr>');
    }
    hayTitulo = false;
    for (let i = 0; i < pelicula['Search'].length; i++) {
        $('#contenido').append('<div class="card col-lg-3 col-md-4 col-sm-6 col-xs-12 col-12" style="height: 500px; display: inline-flex;">\n' +
            '  <img class="card-img-top" style="height: 300px; width: 100%;" src="' + pelicula['Search'][i].Poster + '" onerror="noCargada(this)">\n' +
            '  <div class="card-body">\n' +
            '    <a class="card-title" href="#" onclick="buscarDetalle(\'' + pelicula['Search'][i].imdbID + '\')">' + pelicula['Search'][i].Title + '</a>\n' +
            '    <p class="card-text">Año: ' + pelicula['Search'][i].Year + '</p>\n' +
            '    <p class="btn btn-primary col-6 offset-3" style="color: white" onclick="buscarDetalle(\'' + pelicula['Search'][i].imdbID + '\')">Ver detalle</p>\n' +
            '  </div>\n' +
            '</div>')
    }
    /*################# SCROLL INFINITO ########################*/
    win.scroll(function () {
        if ($(document).height() - win.height() <= (win.scrollTop() + 80) && hayPeticion === true && peliculaBuscada != '') {
            contadorPagina++;
            hayPeticion = false;
            $.ajax({
                url: "http://www.omdbapi.com/?s=" + peliculaBuscada + "&type=movie&page=" + contadorPagina + "&apikey=31b14819",
                success: function (denuevo) {
                    addPelicula(denuevo);
                    hayPeticion = true;
                }
            });
        }
    });
}

$(document).ready(function () {
    buscarPelicula();
});