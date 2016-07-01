<%-- 
    Document   : View_OMDB_Results
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
        <h1>Results</h1>

        <c:forEach var="movie" items="${movies}">
            <a href="http://localhost:8080/movie-guru/GenerateMovieSources?id=${movie.imdbID}"><img src="${movie.poster}" alt="Movie Poster" style="width: 200px;" /></a>
            </c:forEach>
    </body>
</html>
