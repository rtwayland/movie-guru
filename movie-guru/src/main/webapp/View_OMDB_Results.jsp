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

        <h1>${result.title} - ${result.year}</h1>
        <img src="${result.poster}" />
        <p>${result.plot}</p>
        <h2>${result.imdbID}</h2>
        
        <form method="post" action="GenerateMovieSources">
            <input type="hidden" name="imdbID" value="${result.imdbID}" />
            <button type="submit">See Availability</button>
        </form>
</body>
</html>
