<%-- 
    Document   : ViewMovieSources
    Created on : Jun 23, 2016, 4:25:30 PM
    Author     : user
--%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Movie Sources</title>
    </head>
    <body>
        <h1>${movie.title}</h1>
        <h2>${movie.rating} ${movie.year} ${movie.runTime}</h2>
        <img src="${movie.poster}" style="display: inline-block;" />

        <iframe width="640" height="360" src="${movie.trailerEmbed}" frameborder="0" allowfullscreen style="display: inline-block;"></iframe>
        <p>${movie.longPlot}</p>
        <p>Director: ${movie.director}</p>
        <p>Writer(s): ${movie.writer}</p>
        <p>Stars: ${movie.actors}</p>
        <c:if test="${!empty movie.freeWebList}">
            <h3>Free Sources</h3>
            <ul>
                <c:forEach var="source" items="${movie.freeWebList}">
                    <a href="${source.link}" target="_blank">${source.name}</a> <br/>
                </c:forEach>
            </ul>
        </c:if>
        <c:if test="${!empty movie.subscriptionWebList}">
            <h3>Subscription Sources</h3>
            <ul>
                <c:forEach var="source" items="${movie.subscriptionWebList}">
                    <a href="${source.link}" target="_blank">${source.name}</a> <br/>
                </c:forEach>
            </ul>
        </c:if>
        <c:if test="${!empty movie.purchaseWebList}">
            <h3>Purchase Sources</h3>
            <ul>
                <c:forEach var="source" items="${movie.purchaseWebList}">
                    <a href="${source.link}" target="_blank">${source.name}</a>
                    <ul>
                        <h4 style="padding: 0; margin: 0">Rent</h4>
                        <c:forEach var="rentFormat" items="${source.rentFormats}">
                            <li>${rentFormat.format} - $${rentFormat.price}</li>
                            </c:forEach>

                        <h4 style="padding: 0; margin: 0">Purchase</h4>
                        <c:forEach var="buyFormat" items="${source.buyFormats}">
                            <li>${buyFormat.format} -  $${buyFormat.price}</li>
                            </c:forEach>
                    </ul>
                </c:forEach>
            </ul>
        </c:if>

    </body>
</html>
