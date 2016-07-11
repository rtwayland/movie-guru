/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/***************************
 * GET SOURCES
 **************************/
function getSources(id) {
    //var url = "GenerateMovieSources?id=" + id;

    var allMovies = localStorage['movies'];
    var allMovieObjects = JSON.parse(allMovies);

    var movie;

    for (var i = 0; i < allMovieObjects.length; i++) {
        if (allMovieObjects[i]['imdbID'] == id) {
            movie = allMovieObjects[i];
            break;
        }
    }

    loadModal(movie);
    //httpGET(url, loadModal);
}

function fillModalHeader(movie) {
    var heading = movie['title'] + " — Rated: " + movie['rating'] + " — " + movie['year'] + " — " + movie['runTime'];
    document.getElementById('modalMovieTitle').innerHTML = heading;
    var photoDiv = document.getElementById('moviePoster');

    if (photoDiv !== null) {
        photoDiv.innerHTML = '';

        var image = document.createElement('img');
        image.src = movie['largePoster'];
        image.width = 200;

        photoDiv.appendChild(image);
    }

    document.getElementById('modalDirector').innerHTML = '';
    document.getElementById('modalWriter').innerHTML = '';
    document.getElementById('modalActors').innerHTML = '';

    var directorP = document.createTextNode("Director(s): " + movie['director']);
    document.getElementById('modalDirector').appendChild(directorP);

    var writerP = document.createTextNode("Writer(s): " + movie['writer']);
    document.getElementById('modalWriter').appendChild(writerP);

    var actorP = document.createTextNode("Stars: " + movie['actors']);
    document.getElementById('modalActors').appendChild(actorP);
}

function fillModalBody(movie) {
    var trailerDiv = document.getElementById('movieTrailer');

    if (trailerDiv !== null) {
        trailerDiv.innerHTML = '';
        if (movie['trailerEmbed'] !== "") {
            var ifrm = document.createElement("iframe");
            ifrm.src = movie['trailerEmbed'];
            ifrm.style.width = "645px";
            ifrm.style.height = "365px";

            trailerDiv.appendChild(ifrm);
        }
    }

    document.getElementById('modalMoviePlot').innerHTML = movie['longPlot'];
}

function fillModalSources(movie) {
    var freeList = movie['freeWebList'];
    var buyList = movie['purchaseWebList'];
    var subscriptionList = movie['subscriptionWebList'];

    var movieSourcesDiv = document.getElementById('movieSources');
    movieSourcesDiv.innerHTML = '';

    var freeSourcesDiv = document.createElement('div');
    freeSourcesDiv.id = "freeSources";
    var freeSourcesHeading = document.createElement('h5');
    freeSourcesHeading.appendChild(document.createTextNode('Free Sources'));
    freeSourcesDiv.appendChild(freeSourcesHeading);

    var paidSourcesDiv = document.createElement('div');
    paidSourcesDiv.id = "paidSources";
    var paidSourcesHeading = document.createElement('h5');
    paidSourcesHeading.appendChild(document.createTextNode('Paid Sources'));
    paidSourcesDiv.appendChild(paidSourcesHeading);


    var subscriptionSourcesDiv = document.createElement('div');
    subscriptionSourcesDiv.id = "subscriptionSources";
    var subscriptionSourcesHeading = document.createElement('h5');
    subscriptionSourcesHeading.appendChild(document.createTextNode('Subscription Sources'));
    subscriptionSourcesDiv.appendChild(subscriptionSourcesHeading);

    for (var i = 0; i < freeList.length; i++) {
        var linkDiv = document.createElement('div');

        var sourceLink = document.createElement('a');
        sourceLink.href = freeList[i]['link'];
        sourceLink.target = "_blank";

        var linkName = document.createTextNode(freeList[i]['name']);
        sourceLink.appendChild(linkName);

        //console.log(sourceLink);
        linkDiv.appendChild(sourceLink);
        freeSourcesDiv.appendChild(linkDiv);
    }

    for (var i = 0; i < buyList.length; i++) {
        //console.log(buyList[i]);
        var linkDiv = document.createElement('div');

        var sourceLink = document.createElement('a');
        sourceLink.href = buyList[i]['link'];
        sourceLink.target = "_blank";

        var linkName = document.createTextNode(buyList[i]['name']);
        sourceLink.appendChild(linkName);

        //console.log(sourceLink);
        linkDiv.appendChild(sourceLink);
        paidSourcesDiv.appendChild(linkDiv);
    }

    for (var i = 0; i < subscriptionList.length; i++) {
        var linkDiv = document.createElement('div');

        var sourceLink = document.createElement('a');
        sourceLink.href = subscriptionList[i]['link'];
        sourceLink.target = "_blank";

        var linkName = document.createTextNode(subscriptionList[i]['name']);
        sourceLink.appendChild(linkName);

        //console.log(sourceLink);
        linkDiv.appendChild(sourceLink);
        subscriptionSourcesDiv.appendChild(linkDiv);
    }


    //} 
    movieSourcesDiv.appendChild(freeSourcesDiv);
    movieSourcesDiv.appendChild(subscriptionSourcesDiv);
    movieSourcesDiv.appendChild(paidSourcesDiv);
}

/***************************
 * LOAD MODAL
 **************************/
function loadModal(movie) {
    fillModalHeader(movie);

    fillModalBody(movie);

    fillModalSources(movie);

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
    var ncRating = document.getElementById('nc');
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
            case "NC-17":
                if (ncRating.checked) {
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
    var movieContainer = document.getElementById('movieList');

    if (movieContainer != null) {
        document.getElementById('movieList').remove();
    }

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
        //console.log(movieObject);


        var movieListDiv = document.createElement('div');
        movieListDiv.id = "movieList";

        //Create div to hold the movie the user searched
        var searchedMovieDiv = document.createElement('div');
        var searchInfo = document.createElement('div');
        var searchedText = document.createElement('p');
        searchedText.appendChild(document.createTextNode("suggestions for movies like"));
        var searchedTitle = document.createElement('h2');
        searchedTitle.appendChild(document.createTextNode(allMovieObjects[0]['title']));

        searchInfo.appendChild(searchedText);
        searchInfo.appendChild(searchedTitle);

        searchedMovieDiv.appendChild(searchInfo);


        //var firstMovieLink = document.createElement('a');
        var firstImageID = allMovieObjects[0]['imdbID'];
        var firstMovieImage = document.createElement('img');
        firstMovieImage.src = allMovieObjects[0]['largePoster'];
        firstMovieImage.width = 300;
        firstMovieImage.addEventListener('click', function () {
            getSources(firstImageID);
        });

        searchedMovieDiv.appendChild(firstMovieImage);
        movieListDiv.appendChild(searchedMovieDiv);

        //Loop through movie list and output movies    
        for (var i = 0; i < movieObject.length; i++) {
            if (movieObject[i] !== null && typeof movieObject[i] !== 'undefined') {
                if (movieObject[i]['imdbID'] === allMovieObjects[0]['imdbID']) {
                    ++i;
                }
                //var a = document.createElement('a');
                //console.log("Loop number: " + i);
                var imageID = movieObject[i]['imdbID'];
                //var onClickFunction = "getSources(" + imageID + ")";
                var image = document.createElement('img');
                image.src = movieObject[i]['smallPoster'];
                image.width = 200;

                image.setAttribute('onclick', 'getSources(\'' + imageID + '\')');

                //a.appendChild(image);
                //a.title = "my title text";
                //a.href = "GenerateMovieSources?id=" + movieObject[i]['imdbID'];
                movieListDiv.appendChild(image);
            }
        }

        document.body.appendChild(movieListDiv);
    } else {
        //document.getElementById('filterBox').style.visibility = "hidden";
        $('#errorModal').modal();
    }

}

/***************************
 * DISPLAY INITIAL MOVIES
 **************************/
function displayInitialMovies() {
    //Grab the movie list from STORAGE and put into OBJECT
    var allMovies = localStorage['movies'];
    var allMovieObjects = JSON.parse(allMovies);
    console.log(allMovieObjects);

    if (typeof allMovieObjects !== 'undefined' && allMovieObjects.length > 0) {

        var movieContainer = document.getElementById('movieList');

        if (movieContainer != null) {
            document.getElementById('movieList').remove();
        }

        var movieListDiv = document.createElement('div');
        movieListDiv.id = "movieList";

        //Create div to hold the movie the user searched
        var searchedMovieDiv = document.createElement('div');
        var searchedText = document.createElement('p');
        searchedText.appendChild(document.createTextNode("suggestions for movies like"));
        var searchedTitle = document.createElement('h2');
        searchedTitle.appendChild(document.createTextNode(allMovieObjects[0]['title']));

        searchedMovieDiv.appendChild(searchedText);
        searchedMovieDiv.appendChild(searchedTitle);

        //var firstMovieLink = document.createElement('a');
        var firstImageID = allMovieObjects[0]['imdbID'];
        var firstMovieImage = document.createElement('img');
        firstMovieImage.src = allMovieObjects[0]['largePoster'];
        firstMovieImage.width = 300;
        firstMovieImage.addEventListener('click', function () {
            getSources(firstImageID);
        });

        searchedMovieDiv.appendChild(firstMovieImage);
        movieListDiv.appendChild(searchedMovieDiv);

        //Loop through movie list and output movies    
        for (var i = 1; i < allMovieObjects.length; i++) {
            if (allMovieObjects[i] != null) {
                if (allMovieObjects[0]['imdbID'] === allMovieObjects[i]['imdbID']) {
                    ++i;
                }
                //console.log("Initial Display: " + i);
                var imageID = allMovieObjects[i]['imdbID'];
                var image = document.createElement('img');
                image.src = allMovieObjects[i]['smallPoster'];
                image.width = 200;

                image.setAttribute('onclick', 'getSources(\'' + imageID + '\')');

                movieListDiv.appendChild(image);
            }
        }

        document.body.appendChild(movieListDiv);
    } else {
        //document.getElementById('filterBox').style.visibility = "hidden";
        $('#errorModal').modal();
    }

}

/***************************
 * WRITE MOVIE LIST
 **************************/
function writeMovieList(movieList) {
    localStorage['movies'] = movieList;

    $('#messageModal').modal('hide');
    $('#errorModal').modal('hide');
    document.getElementById('heading-container').innerHTML = '';
    document.getElementById('paragraph-container').innerHTML = '';

    //generateFilterBox();
    document.getElementById('filterBox').style.visibility = "visible";
    document.getElementById('nr').checked = "true";
    document.getElementById('nc').checked = "true";
    document.getElementById('r').checked = "true";
    document.getElementById('pg13').checked = "true";
    document.getElementById('pg').checked = "true";
    document.getElementById('g').checked = "true";

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
//function generateFilterBox() {
//    var filterDiv = document.createElement('div');
//
//    //R rating checkbox
//    var rCheckbox = document.createElement('input');
//    rCheckbox.type = "checkbox";
//    rCheckbox.name = "r";
//    rCheckbox.id = "r";
//    rCheckbox.checked = "checked";
//    rCheckbox.setAttribute('onchange', 'filter()');
//
//    var rLabel = document.createElement('label');
//    rLabel.htmlFor = "r";
//    rLabel.appendChild(document.createTextNode('R'));
//
//    //PG13 rating checkbox
//    var pg13Checkbox = document.createElement('input');
//    pg13Checkbox.type = "checkbox";
//    pg13Checkbox.name = "pg13";
//    pg13Checkbox.id = "pg13";
//    pg13Checkbox.checked = "checked";
//    pg13Checkbox.setAttribute('onchange', 'filter()');
//
//    var pg13Label = document.createElement('label');
//    pg13Label.htmlFor = "pg13";
//    pg13Label.appendChild(document.createTextNode('PG-13'));
//
//    //PG rating checkbox
//    var pgCheckbox = document.createElement('input');
//    pgCheckbox.type = "checkbox";
//    pgCheckbox.name = "pg";
//    pgCheckbox.id = "pg";
//    pgCheckbox.checked = "checked";
//    pgCheckbox.setAttribute('onchange', 'filter()');
//
//    var pgLabel = document.createElement('label');
//    pgLabel.htmlFor = "pg";
//    pgLabel.appendChild(document.createTextNode('PG'));
//
//    //G rating checkbox
//    var gCheckbox = document.createElement('input');
//    gCheckbox.type = "checkbox";
//    gCheckbox.name = "g";
//    gCheckbox.id = "g";
//    gCheckbox.checked = "checked";
//    gCheckbox.setAttribute('onchange', 'filter()');
//
//    var gLabel = document.createElement('label');
//    gLabel.htmlFor = "g";
//    gLabel.appendChild(document.createTextNode('G'));
//
//    //NR rating checkbox
//    var nrCheckbox = document.createElement('input');
//    nrCheckbox.type = "checkbox";
//    nrCheckbox.name = "nr";
//    nrCheckbox.id = "nr";
//    nrCheckbox.checked = "checked";
//    nrCheckbox.setAttribute('onchange', 'filter()');
//
//    var nrLabel = document.createElement('label');
//    nrLabel.htmlFor = "nr";
//    nrLabel.appendChild(document.createTextNode('NR/Unrated'));
//
//    //Add checks and labels to div
//
//    filterDiv.appendChild(rLabel);
//    filterDiv.appendChild(rCheckbox);
//
//    filterDiv.appendChild(pg13Label);
//    filterDiv.appendChild(pg13Checkbox);
//
//    filterDiv.appendChild(pgLabel);
//    filterDiv.appendChild(pgCheckbox);
//
//    filterDiv.appendChild(gLabel);
//    filterDiv.appendChild(gCheckbox);
//
//    filterDiv.appendChild(nrLabel);
//    filterDiv.appendChild(nrCheckbox);
//
//    //Add the div
//    document.body.appendChild(filterDiv);
//}