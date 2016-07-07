/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/***************************
 * GET SOURCES
 **************************/
function getSources(id) {
    var url = "GenerateMovieSources?id=" + id;

    httpGET(url, loadModal);
}

/***************************
 * LOAD MODAL
 **************************/
function loadModal(sources) {
    localStorage['sources'] = sources;

    var movieInfo = localStorage['sources'];
    var movieInfoObject = JSON.parse(movieInfo);

    var heading = movieInfoObject['title'] + " " + movieInfoObject['rating'] + " " + movieInfoObject['year'] + " " + movieInfoObject['runTime'];
    document.getElementById('modalMovieTitle').innerHTML = heading;
    //document.getElementById('modalMovieInfo').innerHTML = ;
    document.getElementById('modalMoviePlot').innerHTML = movieInfoObject['longPlot'];

    $('#infoModal').modal();
}

/***************************
 * FILTER
 **************************/
function filter() {
    var nrRating = document.getElementById('nr');
    var rRating = document.getElementById('r');
    var pg13Rating = document.getElementById('pg13');
    var pgRating = document.getElementById('pg');
    var gRating = document.getElementById('g');

    var allMovies = localStorage['movies'];
    var allMovieObjects = JSON.parse(allMovies);
    
    var filteredList = [];

    for (var i = 1; i < allMovieObjects.length; i++) {

        switch (allMovieObjects[i]['rating']) {
            case "NR":
            case "UNRATED":
                if (nrRating.checked) {
                    filteredList.push(allMovieObjects[i]);
                }
                break;
            case "R":
                if (rRating.checked) {
                    filteredList.push(allMovieObjects[i]);
                }
                break;
            case "PG-13":
                if (pg13Rating.checked) {
                    filteredList.push(allMovieObjects[i]);
                }
                break;
            case "PG":
                if (pgRating.checked) {
                    filteredList.push(allMovieObjects[i]);
                }
                break;
            case "G":
                if (gRating.checked) {
                    filteredList.push(allMovieObjects[i]);
                }
                break;
            default:
                filteredList.push(allMovieObjects[i]);
                break;
        }
    }

    var jsonString = JSON.stringify(filteredList);
    localStorage['filteredList'] = jsonString;
    document.getElementById('movieList').remove();
    displayMovies("filteredList");

}

/***************************
 * DISPLAY MOVIES
 **************************/
function displayMovies(movieList) {
    //Grab the movie list from STORAGE and put into OBJECT
    var allMovies = localStorage['movies'];
    var allMovieObjects = JSON.parse(allMovies);
    
    if (typeof allMovieObjects !== 'undefined' && allMovieObjects.length > 0) {
        var movies = localStorage[movieList];
        var movieObject = JSON.parse(movies);
        console.log(movieObject);


        var movieListDiv = document.createElement('div');
        movieListDiv.id = "movieList";

        //Create div to hold the movie the user searched
        var searchedMovieDiv = document.createElement('div');

        //var firstMovieLink = document.createElement('a');
        var firstImageID = allMovieObjects[0]['imdbID'];
        var firstMovieImage = document.createElement('img');
        firstMovieImage.src = allMovieObjects[0]['poster'];
        firstMovieImage.width = 300;
        firstMovieImage.addEventListener('click', function () {
            getSources(firstImageID);
        });

        searchedMovieDiv.appendChild(firstMovieImage);
        movieListDiv.appendChild(searchedMovieDiv);

        //Loop through movie list and output movies    
        for (var i = 0; i < movieObject.length; i++) {
            if (movieObject[0]['title'] === allMovieObjects[0]['title']) {
                ++i;
            }
            //var a = document.createElement('a');
            var imageID = movieObject[i]['imdbID'];
            //var onClickFunction = "getSources(" + imageID + ")";
            var image = document.createElement('img');
            image.src = movieObject[i]['poster'];
            image.width = 200;

            image.setAttribute('onclick', 'getSources(\'' + imageID + '\')');

            //a.appendChild(image);
            //a.title = "my title text";
            //a.href = "GenerateMovieSources?id=" + movieObject[i]['imdbID'];
            movieListDiv.appendChild(image);
        }

        document.body.appendChild(movieListDiv);
    }

}

/***************************
 * DISPLAY INITIAL MOVIES
 **************************/
function displayInitialMovies() {
    //Grab the movie list from STORAGE and put into OBJECT
    var allMovies = localStorage['movies'];
    var allMovieObjects = JSON.parse(allMovies);

    if (typeof allMovieObjects !== 'undefined' && allMovieObjects.length > 0) {
        var movieListDiv = document.createElement('div');
        movieListDiv.id = "movieList";

        //Create div to hold the movie the user searched
        var searchedMovieDiv = document.createElement('div');

        //var firstMovieLink = document.createElement('a');
        var firstImageID = allMovieObjects[0]['imdbID'];
        var firstMovieImage = document.createElement('img');
        firstMovieImage.src = allMovieObjects[0]['poster'];
        firstMovieImage.width = 300;
        firstMovieImage.addEventListener('click', function () {
            getSources(firstImageID);
        });

        searchedMovieDiv.appendChild(firstMovieImage);
        movieListDiv.appendChild(searchedMovieDiv);

        //Loop through movie list and output movies    
        for (var i = 1; i < allMovieObjects.length; i++) {
            if (allMovieObjects[i] != null) {
                var imageID = allMovieObjects[i]['imdbID'];
                var image = document.createElement('img');
                image.src = allMovieObjects[i]['poster'];
                image.width = 200;

                image.setAttribute('onclick', 'getSources(\'' + imageID + '\')');

                movieListDiv.appendChild(image);
            }
        }

        document.body.appendChild(movieListDiv);
    } else {
        document.write("Bad Input");
    }

}

/***************************
 * WRITE MOVIE LIST
 **************************/
function writeMovieList(movieList) {
    localStorage['movies'] = movieList;

    $('#messageModal').modal('hide');
    document.getElementById('home-container').innerHTML = '';

    generateFilterBox();

    displayInitialMovies();
}

/***************************
 * COLLECT
 **************************/
function collect() {
    var search = document.getElementById('suggestion-search').value;
    search = encodeURIComponent(search);
    var url = "GenerateSuggestions?suggestion-search=" + search;

    $('#messageModal').modal();

    httpGET(url, writeMovieList);
}

/***************************
 * AJAX
 **************************/
function httpGET(url, callback) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            callback(xmlhttp.responseText);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

/***************************
 * GENERATE FILTER BOX
 **************************/
function generateFilterBox() {
    var filterDiv = document.createElement('div');

    //NR rating checkbox
    var nrCheckbox = document.createElement('input');
    nrCheckbox.type = "checkbox";
    nrCheckbox.name = "nr";
    nrCheckbox.id = "nr";
    nrCheckbox.checked = "checked";
    nrCheckbox.setAttribute('onchange', 'filter()');

    var nrLabel = document.createElement('label');
    nrLabel.htmlFor = "nr";
    nrLabel.appendChild(document.createTextNode('NR/Unrated'));

    //R rating checkbox
    var rCheckbox = document.createElement('input');
    rCheckbox.type = "checkbox";
    rCheckbox.name = "r";
    rCheckbox.id = "r";
    rCheckbox.checked = "checked";
    rCheckbox.setAttribute('onchange', 'filter()');

    var rLabel = document.createElement('label');
    rLabel.htmlFor = "r";
    rLabel.appendChild(document.createTextNode('R'));

    //PG13 rating checkbox
    var pg13Checkbox = document.createElement('input');
    pg13Checkbox.type = "checkbox";
    pg13Checkbox.name = "pg13";
    pg13Checkbox.id = "pg13";
    pg13Checkbox.checked = "checked";
    pg13Checkbox.setAttribute('onchange', 'filter()');

    var pg13Label = document.createElement('label');
    pg13Label.htmlFor = "pg13";
    pg13Label.appendChild(document.createTextNode('PG-13'));

    //PG rating checkbox
    var pgCheckbox = document.createElement('input');
    pgCheckbox.type = "checkbox";
    pgCheckbox.name = "pg";
    pgCheckbox.id = "pg";
    pgCheckbox.checked = "checked";
    pgCheckbox.setAttribute('onchange', 'filter()');

    var pgLabel = document.createElement('label');
    pgLabel.htmlFor = "pg";
    pgLabel.appendChild(document.createTextNode('PG'));

    //G rating checkbox
    var gCheckbox = document.createElement('input');
    gCheckbox.type = "checkbox";
    gCheckbox.name = "g";
    gCheckbox.id = "g";
    gCheckbox.checked = "checked";
    gCheckbox.setAttribute('onchange', 'filter()');

    var gLabel = document.createElement('label');
    gLabel.htmlFor = "g";
    gLabel.appendChild(document.createTextNode('G'));

    //Add checks and labels to div
    filterDiv.appendChild(nrLabel);
    filterDiv.appendChild(nrCheckbox);

    filterDiv.appendChild(rLabel);
    filterDiv.appendChild(rCheckbox);

    filterDiv.appendChild(pg13Label);
    filterDiv.appendChild(pg13Checkbox);

    filterDiv.appendChild(pgLabel);
    filterDiv.appendChild(pgCheckbox);

    filterDiv.appendChild(gLabel);
    filterDiv.appendChild(gCheckbox);

    //Add the div
    document.body.appendChild(filterDiv);
}