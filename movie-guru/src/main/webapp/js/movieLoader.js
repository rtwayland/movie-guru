/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function displayMovies() {
//    document.getElementById('message-box').style.visibility = "hidden";
    document.body.innerHTML = '';
    var movies = localStorage['movies'];

    var movieObject = JSON.parse(movies);

    for (var i = 0; i < movieObject.length; i++) {
        //var title = movieObject[i]['title'];

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
    $('#messageModal').modal();
    var search = document.getElementById('suggestion-search').value;
    search = encodeURIComponent(search);
    var url = "GenerateSuggestions?suggestion-search=" + search;

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

