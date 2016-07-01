<%-- 
    Document   : ViewSuggestions
    Created on : Jun 23, 2016, 12:04:13 PM
    Author     : user
--%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Search Results</title>
    </head>
    <body>
        <h3>suggestions for movies like ${movies[0].title}</h3>
        <div>
            <a href="http://localhost:8080/movie-guru/GenerateMovieSources?id=${movies[0].imdbID}"><img src="${movies[0].poster}" alt="Movie Poster" style="width: 300px;" /></a>
        </div>
        <c:forEach begin="1" var="movie" items="${movies}">
            <a href="http://localhost:8080/movie-guru/GenerateMovieSources?id=${movie.imdbID}"><img src="${movie.poster}" alt="Movie Poster" style="width: 200px;" /></a>
            </c:forEach>
    </body>
</html>
