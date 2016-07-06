/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function generateFilterBox() {
    var filterDiv = document.createElement('div');

    //R rating checkbox
    var rCheckbox = document.createElement('input');
    rCheckbox.type = "checkbox";
    rCheckbox.name = "r";
    rCheckbox.id = "r";

    var rLabel = document.createElement('label');
    rLabel.htmlFor = "r";
    rLabel.appendChild(document.createTextNode('R'));

    //PG13 rating checkbox
    var pg13Checkbox = document.createElement('input');
    pg13Checkbox.type = "checkbox";
    pg13Checkbox.name = "pg13";
    pg13Checkbox.id = "pg13";

    var pg13Label = document.createElement('label');
    pg13Label.htmlFor = "pg13";
    pg13Label.appendChild(document.createTextNode('PG-13'));

    //PG rating checkbox
    var pgCheckbox = document.createElement('input');
    pgCheckbox.type = "checkbox";
    pgCheckbox.name = "pg";
    pgCheckbox.id = "pg";

    var pgLabel = document.createElement('label');
    pgLabel.htmlFor = "pg";
    pgLabel.appendChild(document.createTextNode('PG'));

    //Add checks and labels to div
    filterDiv.appendChild(rLabel);
    filterDiv.appendChild(rCheckbox);

    filterDiv.appendChild(pg13Label);
    filterDiv.appendChild(pg13Checkbox);

    filterDiv.appendChild(pgLabel);
    filterDiv.appendChild(pgCheckbox);

    //Add the div
    document.body.appendChild(filterDiv);
}
function displayMovies() {
    $('#messageModal').modal('hide');
    document.getElementById('home-container').innerHTML = '';

    generateFilterBox();

    //Grab the movie list from STORAGE and put into OBJECT
    var movies = localStorage['movies'];
    var movieObject = JSON.parse(movies);
    console.log(movieObject);

    //Create div to hold the movie the user searched
    var searchedMovieDiv = document.createElement('div');

    var firstMovieLink = document.createElement('a');
    var firstMovieImage = document.createElement('img');
    firstMovieImage.src = movieObject[0]['poster'];
    firstMovieImage.width = 300;
    firstMovieLink.appendChild(firstMovieImage);
    firstMovieLink.href = "GenerateMovieSources?id=" + movieObject[0]['imdbID'];
    searchedMovieDiv.appendChild(firstMovieLink);
    document.body.appendChild(searchedMovieDiv);

    //Loop through movie list and output movies

    for (var i = 1; i < movieObject.length; i++) {

        var a = document.createElement('a');
        var image = document.createElement('img');
        image.src = movieObject[i]['poster'];
        image.width = 200;
        //var linkImage = document.createTextNode("my title text");
        a.appendChild(image);
        //a.title = "my title text";
        a.href = "GenerateMovieSources?id=" + movieObject[i]['imdbID'];
        document.body.appendChild(a);
    }


}

function writeMovieList(movieList) {
    localStorage['movies'] = movieList;

    displayMovies();
}
function collect() {
//    console.log("In collect");
    //document.getElementById('message-box').style.visibility = "visible";

    var search = document.getElementById('suggestion-search').value;
    search = encodeURIComponent(search);
    var url = "GenerateSuggestions?suggestion-search=" + search;

    $('#messageModal').modal();

    httpGET(url, writeMovieList);
}

function httpGET(url, callback) {
    console.log('url: ', url)
    console.log('callback', callback)
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            callback(xmlhttp.responseText);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

