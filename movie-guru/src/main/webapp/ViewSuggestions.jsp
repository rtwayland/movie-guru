<%-- 
    Document   : ViewSuggestions
    Created on : Jun 24, 2016, 3:02:09 PM
    Author     : user
--%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <h1>Here are your suggestions</h1>

    <c:forEach var="suggestion" items="${suggestions}">
        <li>${suggestion.name}</li>
    </c:forEach>
</body>
</html>
