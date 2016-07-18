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
        if (allMovieObjects[i]['imdbID'] === id) {
            movie = allMovieObjects[i];
            break;
        }
    }

    loadModal(movie);
}

function fillModalHeader(movie) {
    document.getElementById('modalMovieTitle').innerHTML = movie['title'];
    document.getElementById('modalMovieRating').innerHTML = movie['rating'];
    document.getElementById('modalMovieYear').innerHTML = movie['year'];
    document.getElementById('modalMovieTime').innerHTML = movie['runTime'];
    var photoDiv = document.getElementById('moviePoster');

    if (photoDiv !== null) {
        photoDiv.innerHTML = '';

        var image = document.createElement('img');
        image.src = movie['largePoster'];

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
    document.getElementById('modalMoviePlot').innerHTML = movie['longPlot'];

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
}

function fillModalSources(movie) {
    var freeList = movie['freeWebList'];
    var buyList = movie['purchaseWebList'];
    var subscriptionList = movie['subscriptionWebList'];

    var movieSourcesDiv = document.getElementById('movieSources');
    movieSourcesDiv.innerHTML = '';

    var freeSourcesListItem = document.createElement('li');
    var freeSourcesDiv = document.createElement('div');
    freeSourcesDiv.id = "freeSources";
    var freeSourcesHeading = document.createElement('h5');
    freeSourcesHeading.appendChild(document.createTextNode('Free Sources'));
    freeSourcesDiv.appendChild(freeSourcesHeading);

    var paidSourcesListItem = document.createElement('li');
    var paidSourcesDiv = document.createElement('div');
    paidSourcesDiv.id = "paidSources";
    var paidSourcesHeading = document.createElement('h5');
    paidSourcesHeading.appendChild(document.createTextNode('Paid Sources'));
    paidSourcesDiv.appendChild(paidSourcesHeading);

    var subscriptionSourcesListItem = document.createElement('li');
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
    freeSourcesListItem.appendChild(freeSourcesDiv);

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
    paidSourcesListItem.appendChild(paidSourcesDiv);

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
    subscriptionSourcesListItem.appendChild(subscriptionSourcesDiv);

    movieSourcesUL = document.createElement('ul');
    movieSourcesUL.appendChild(freeSourcesListItem);
    movieSourcesUL.appendChild(paidSourcesListItem);
    movieSourcesUL.appendChild(subscriptionSourcesListItem);
    
    movieSourcesDiv.appendChild(movieSourcesUL);
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

    var netflix = document.getElementById('netflix');
    var prime = document.getElementById('prime');
    var hulu = document.getElementById('hulu');

    var allMovies = localStorage['movies'];
    var filteredSources = localStorage['filteredSourceList'];
    var movieObjects;

    var filteredList = [];
    var i;
    if ((netflix.checked || prime.checked || hulu.checked) && filteredSources != null) {
        movieObjects = JSON.parse(filteredSources);
        i = 0;
    } else {
        movieObjects = JSON.parse(allMovies);
        i = 1;
    }

    while (i < movieObjects.length) {
        switch (movieObjects[i]['rating']) {
            case "NR":
            case "UNRATED":
                if (nrRating.checked) {
                    filteredList.push(movieObjects[i]);
                }
                break;
            case "R":
                if (rRating.checked) {
                    filteredList.push(movieObjects[i]);
                }
                break;
            case "PG-13":
                if (pg13Rating.checked) {
                    filteredList.push(movieObjects[i]);
                }
                break;
            case "PG":
                if (pgRating.checked) {
                    filteredList.push(movieObjects[i]);
                }
                break;
            case "G":
                if (gRating.checked) {
                    filteredList.push(movieObjects[i]);
                }
                break;
            case "NC-17":
                if (ncRating.checked) {
                    filteredList.push(movieObjects[i]);
                }
                break;
            default:
                filteredList.push(movieObjects[i]);
                break;
        }
        i++;
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
 * FILTER SOURCES
 **************************/
function filterSources() {
    var netflix = document.getElementById('netflix');
    var prime = document.getElementById('prime');
    var hulu = document.getElementById('hulu');

    var allMovies = localStorage['movies'];
    var filteredRatings = localStorage['filteredList'];

    var movieObjects;

    var filteredSourceList = [];
    var i;
    if (filteredRatings != null) {
        movieObjects = JSON.parse(filteredRatings);
        i = 0;
    } else {
        movieObjects = JSON.parse(allMovies);
        i = 1;
    }

    while (i < movieObjects.length) {
        var subscriptionList = movieObjects[i]['subscriptionWebList'];
        //console.log(subscriptionList);
        var inserted = false;
        if (typeof subscriptionList !== 'undefined' && subscriptionList.length > 0) {
            for (var j = 0; j < subscriptionList.length && inserted === false; j++) {
                if (subscriptionList[j] != null) {
                    //console.log(subscriptionList[0]['name']);
                    switch (subscriptionList[j]['name']) {
                        case "Netflix":
                            if (netflix.checked) {
                                filteredSourceList.push(movieObjects[i]);
                                inserted = true;
                            }
                            break;
                        case "Amazon Prime":
                            if (prime.checked) {
                                filteredSourceList.push(movieObjects[i]);
                                inserted = true;
                            }
                            break;
                        case "Hulu":
                            if (hulu.checked) {
                                filteredSourceList.push(movieObjects[i]);
                                inserted = true;
                            }
                            break;
                    }
                }
            }
        }
        ++i;
    }

    if (!netflix.checked && !prime.checked && !hulu.checked) {
        var nrRating = document.getElementById('nr');
        var rRating = document.getElementById('r');
        var pg13Rating = document.getElementById('pg13');
        var pgRating = document.getElementById('pg');
        var gRating = document.getElementById('g');
        var ncRating = document.getElementById('nc');

        if (nrRating.checked && rRating.checked && pg13Rating.checked && pgRating.checked && gRating.checked && ncRating.checked) {
            displayInitialMovies();
        } else {
            filter();
        }

    } else {
        var jsonString = JSON.stringify(filteredSourceList);
        localStorage['filteredSourceList'] = jsonString;
        var movieContainer = document.getElementById('movieList');

        if (movieContainer != null) {
            document.getElementById('movieList').remove();
        }

        displayMovies("filteredSourceList");
    }

}

function reset() {
    if (localStorage['filteredSourceList'] != null) {
        localStorage.removeItem('filteredSourceList');
    }

    if (localStorage['filteredList'] != null) {
        localStorage.removeItem('filteredList');
    }

    document.getElementById('nr').checked = true;
    document.getElementById('nc').checked = true;
    document.getElementById('r').checked = true;
    document.getElementById('pg13').checked = true;
    document.getElementById('pg').checked = true;
    document.getElementById('g').checked = true;

    document.getElementById('netflix').checked = false;
    document.getElementById('prime').checked = false;
    document.getElementById('hulu').checked = false;

    displayInitialMovies();
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
        var suggestionsFor = document.createElement('div');
        suggestionsFor.className = "suggestionsFor";
        var searchedForText = document.createElement('p');
        searchedForText.appendChild(document.createTextNode("suggestions for"));
        suggestionsFor.appendChild(searchedForText);

        var moviesLike = document.createElement('div');
        moviesLike.className = "moviesLike";
        var moviesLikeText = document.createElement('p');
        moviesLikeText.appendChild(document.createTextNode("movies like"));
        moviesLike.appendChild(moviesLikeText);

        var movieTitle = document.createElement('div');
        movieTitle.className = "movieTitle";
        var searchedTitle = document.createElement('p');
        searchedTitle.appendChild(document.createTextNode(allMovieObjects[0]['title']));
        movieTitle.appendChild(searchedTitle);

        var titlePic = document.createElement('div');
        titlePic.className = "titlePic";
        var firstImageID = allMovieObjects[0]['imdbID'];
        var firstMovieImage = document.createElement('img');
        firstMovieImage.src = allMovieObjects[0]['largePoster'];
//        firstMovieImage.width = 300;
        firstMovieImage.addEventListener('click', function () {
            getSources(firstImageID);
        });
        titlePic.appendChild(firstMovieImage);

        var bannerText = document.createElement('div');
        bannerText.className = "bannerText";

        var searchedMovieBanner = document.createElement('div');
        searchedMovieBanner.className = "searchedMovieBanner";

        bannerText.appendChild(suggestionsFor);
        bannerText.appendChild(moviesLike);
        bannerText.appendChild(movieTitle);
        searchedMovieBanner.appendChild(bannerText);
        searchedMovieBanner.appendChild(titlePic);

        var horizontalRuleDiv = document.createElement('div');
        horizontalRuleDiv.className = "divider";
        var horizontalRule = document.createElement('hr');
        horizontalRuleDiv.appendChild(horizontalRule);

        movieListDiv.appendChild(searchedMovieBanner);
        movieListDiv.appendChild(horizontalRuleDiv);

        var movieImages = document.createElement('div');
        movieImages.className = "movieImages";

        //Loop through movie list and output movies    
        for (var i = 0; i < movieObject.length; i++) {
            if (movieObject[i] !== null && typeof movieObject[i] !== 'undefined') {
                if (movieObject[i]['imdbID'] === allMovieObjects[0]['imdbID']) {
                    ++i;
                }
                var imageDiv = document.createElement('div');
                var imageID = movieObject[i]['imdbID'];
                var image = document.createElement('img');
                image.src = movieObject[i]['smallPoster'];
//                image.width = 200;

                image.setAttribute('onclick', 'getSources(\'' + imageID + '\')');

                imageDiv.appendChild(image);
                movieImages.appendChild(imageDiv);
            }
        }

        movieListDiv.appendChild(movieImages);

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
        var suggestionsFor = document.createElement('div');
        suggestionsFor.className = "suggestionsFor";
        var searchedForText = document.createElement('p');
        searchedForText.appendChild(document.createTextNode("suggestions for"));
        suggestionsFor.appendChild(searchedForText);

        var moviesLike = document.createElement('div');
        moviesLike.className = "moviesLike";
        var moviesLikeText = document.createElement('p');
        moviesLikeText.appendChild(document.createTextNode("movies like"));
        moviesLike.appendChild(moviesLikeText);

        var movieTitle = document.createElement('div');
        movieTitle.className = "movieTitle";
        var searchedTitle = document.createElement('p');
        searchedTitle.appendChild(document.createTextNode(allMovieObjects[0]['title']));
        movieTitle.appendChild(searchedTitle);

        var titlePic = document.createElement('div');
        titlePic.className = "titlePic";
        var firstImageID = allMovieObjects[0]['imdbID'];
        var firstMovieImage = document.createElement('img');
        firstMovieImage.src = allMovieObjects[0]['largePoster'];
//        firstMovieImage.width = 300;
        firstMovieImage.addEventListener('click', function () {
            getSources(firstImageID);
        });
        titlePic.appendChild(firstMovieImage);

        var bannerText = document.createElement('div');
        bannerText.className = "bannerText";

        var searchedMovieBanner = document.createElement('div');
        searchedMovieBanner.className = "searchedMovieBanner";

        bannerText.appendChild(suggestionsFor);
        bannerText.appendChild(moviesLike);
        bannerText.appendChild(movieTitle);
        searchedMovieBanner.appendChild(bannerText);
        searchedMovieBanner.appendChild(titlePic);

        var horizontalRuleDiv = document.createElement('div');
        horizontalRuleDiv.className = "divider";
        var horizontalRule = document.createElement('hr');
        horizontalRuleDiv.appendChild(horizontalRule);

        movieListDiv.appendChild(searchedMovieBanner);
        movieListDiv.appendChild(horizontalRuleDiv);

        var movieImages = document.createElement('div');
        movieImages.className = "movieImages";

        //Loop through movie list and output movies    
        for (var i = 1; i < allMovieObjects.length; i++) {
            if (allMovieObjects[i] != null) {
                if (allMovieObjects[0]['imdbID'] === allMovieObjects[i]['imdbID']) {
                    ++i;
                }
                var imageDiv = document.createElement('div');
                var imageID = allMovieObjects[i]['imdbID'];
                var image = document.createElement('img');
                image.src = allMovieObjects[i]['smallPoster'];
//                image.width = 200;

                image.setAttribute('onclick', 'getSources(\'' + imageID + '\')');

                imageDiv.appendChild(image);
                movieImages.appendChild(imageDiv);
            }
        }

        movieListDiv.appendChild(movieImages);

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
    localStorage.clear();
    localStorage['movies'] = movieList;

    $('#messageModal').modal('hide');
    $('#errorModal').modal('hide');
    document.getElementById('heading-container').innerHTML = '';
    document.getElementById('paragraph-container').innerHTML = '';
    document.getElementById('wrap').style.position = 'relative';
    document.getElementById('wrap').style.left = '';
    document.getElementById('wrap').style.top = '';
    document.body.style.backgroundImage = 'none';

    //generateFilterBox();
    document.getElementById('filterBox').style.visibility = "visible";
    document.getElementById('nr').checked = true;
    document.getElementById('nc').checked = true;
    document.getElementById('r').checked = true;
    document.getElementById('pg13').checked = true;
    document.getElementById('pg').checked = true;
    document.getElementById('g').checked = true;

    //document.getElementById('sourceFilterBox').style.visibility = "visible";
    document.getElementById('netflix').checked = false;
    document.getElementById('prime').checked = false;
    document.getElementById('hulu').checked = false;

    //document.getElementById('resetButton').style.visibility = "visible";

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