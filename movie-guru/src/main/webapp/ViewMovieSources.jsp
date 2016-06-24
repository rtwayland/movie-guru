<%-- 
    Document   : ViewMovieSources
    Created on : Jun 23, 2016, 4:25:30 PM
    Author     : user
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Movie Sources</title>
    </head>
    <body>
        <h1>${movie.title} - ${movie.year}</h1>
        <img src="${movie.poster}" />

<!--    <c:forEach var="source" items="${movie.purchaseWebList}">
        <li>${source.name}</li>
    </c:forEach>-->
</body>
</html>
