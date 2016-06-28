/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.movie.guru;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URL;
import java.net.URLEncoder;
import java.util.List;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Raleigh Wayland
 */
@WebServlet(name = "GenerateMovieSources", urlPatterns = {"/GenerateMovieSources"})
public class GenerateMovieSources extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //Get the imdbID from the previous search
        String id = request.getParameter("id");

        //Search GuideBox with the imdbID
        URL searchUrl = new URL("https://api-public.guidebox.com/v1.43/US/rKtBmi58PzqcQnGhju9OvicmDeHVW6IE/search/movie/id/imdb/" + id);
        ObjectMapper mapper = new ObjectMapper();

        Map<String, Object> map = mapper.readValue(searchUrl, Map.class);

        //Grab the values from the basic movie search
        String guideBoxID = map.get("id").toString();
        String title = map.get("title").toString();
        String year = map.get("release_year").toString();
        String rating = map.get("rating").toString();
        String rottentomatoes = map.get("rottentomatoes").toString();
        String poster = map.get("poster_400x570").toString();

        //Create a movie object and insert the basic information
        GuideBoxMovie movie = new GuideBoxMovie(guideBoxID, title, year, rating, rottentomatoes, poster);

        //Do a new search with the newly obtained GuideBox ID
        URL sourcesUrl = new URL("https://api-public.guidebox.com/v1.43/US/rKtBmi58PzqcQnGhju9OvicmDeHVW6IE/movie/" + guideBoxID);

        ObjectMapper sourceMapper = new ObjectMapper();

        Map<String, Object> sourceMap = sourceMapper.readValue(sourcesUrl, Map.class);

        String longPlot = sourceMap.get("overview").toString();
        movie.setLongPlot(longPlot);
        //Grab the Trailers from the search
        Map<String, Object> trailers = (Map) sourceMap.get("trailers");

        List trailerList = (List) trailers.get("web");

        for (Object item : trailerList) {
            Map<String, Object> innerMap = (Map<String, Object>) item;

            //Insert the trailer links into the Movie object
            movie.setTrailerLink(innerMap.get("link").toString());
            movie.setTrailerEmbed(innerMap.get("embed").toString());
        }

        //Grab the list of Sources the movie is available at
        List freeWebList = (List) sourceMap.get("free_web_sources");
        List subscriptionWebList = (List) sourceMap.get("subscription_web_sources");
        List purchaseWebList = (List) sourceMap.get("purchase_web_sources");

        //Insert the lists into the movies
        movie.setFreeWebList(freeWebList);
        movie.setSubscriptionWebList(subscriptionWebList);
        movie.setPurchaseWebList(purchaseWebList);

        movie.displaySource();

        request.getSession().setAttribute("movie", movie);
        request.getRequestDispatcher("/ViewMovieSources.jsp").forward(request, response);
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
