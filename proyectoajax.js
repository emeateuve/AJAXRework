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
            $('#inputPelicula').val(null);
            $('#contenido').empty();

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
                '  <div class="card">\n' +
                '    <div class="card-header" id="headingTwo">\n' +
                '      <h5 class="mb-0">\n' +
                '        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">\n' +
                '          Collapsible Group Item #2\n' +
                '        </button>\n' +
                '      </h5>\n' +
                '    </div>\n' +
                '    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">\n' +
                '      <div class="card-body">\n' +
                '        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS.\n' +
                '      </div>\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="card">\n' +
                '    <div class="card-header" id="headingThree">\n' +
                '      <h5 class="mb-0">\n' +
                '        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">\n' +
                '          Collapsible Group Item #3\n' +
                '        </button>\n' +
                '      </h5>\n' +
                '    </div>\n' +
                '    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">\n' +
                '      <div class="card-body">\n' +
                '        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS.\n' +
                '      </div>\n' +
                '    </div>\n' +
                '  </div>\n' +
                '</div>');
            $('#contenido').append('<hr><a class="btn btn-warning col-6 offset-3" onclick="llevarInicio()">Volver al inicio</a>')
            console.log('Este es el detalle', detalle)
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