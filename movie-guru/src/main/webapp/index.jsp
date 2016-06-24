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
        <title>Home</title>
    </head>
    <body>
        <h1>Get Movie Suggestions!</h1>
        <form method="post" action="GenerateSuggestions">            
            <input type="text" name="suggestion-search" />
            <button type="submit">Search Suggestions</button>
        </form>
        <br/>
        <a href="SearchMovieTitle.jsp">Search for a specific movie</a>
    </body>
</html>
