<%-- 
    Document   : SearchMovieTitle
    Created on : Jun 23, 2016, 12:03:34 PM
    Author     : user
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Search Movie Title</title>
    </head>
    <body>
        <h1>Search for a Movie</h1>
        
        <form method="post" action="GenerateMovie">
            <input type="text" name="search"/>
            <button type="submit" >Search</button>
        </form>
    </body>
</html>
