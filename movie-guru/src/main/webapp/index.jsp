<%-- 
    Document   : index
    Created on : Jun 23, 2016, 11:37:38 AM
    Author     : user
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Movie Guru Home</title>
    </head>
    <body>
        <h1>Movie Guru</h1>
        <h2>find your next favorite movie</h2>
        <form method="post" action="GenerateSuggestions">            
            <input type="text" name="suggestion-search" placeholder="Movie Title" />
            <button type="submit">Search Suggestions</button>
        </form>
        <p>Enter a movie title and we will give you recommendations of other movies you might like as well as where you can find them</p>
<!--        <br/>
        <a href="SearchMovieTitle.jsp">Search for a specific movie</a>-->
    </body>
</html>
