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
import java.util.ArrayList;
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
@WebServlet(name = "GenerateMovie", urlPatterns = {"/GenerateMovie"})
public class GenerateMovie extends HttpServlet {

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
        String search = request.getParameter("search");

        URL url = new URL("http://www.omdbapi.com/?t=" + URLEncoder.encode(search, "UTF-8"));
        ObjectMapper mapper = new ObjectMapper();

        Map<String, Object> map = mapper.readValue(url, Map.class);

        List<GuideBoxMovie> movies = new ArrayList<>();
        GuideBoxMovie movie = new GuideBoxMovie();
        for (String key : map.keySet()) {

            switch (key) {
                case "Title":
                    movie.setTitle(map.get(key).toString());
                    break;
                case "Year":
                    movie.setYear(map.get(key).toString());
                    break;
                case "Rated":
                    movie.setRating(map.get(key).toString());
                    break;
                case "Runtime":
                    movie.setRunTime(map.get(key).toString());
                    break;
                case "Director":
                    movie.setDirector(map.get(key).toString());
                    break;
                case "Actors":
                    movie.setActors(map.get(key).toString());
                    break;
                case "Plot":
                    movie.setShortPlot(map.get(key).toString());
                    break;
                case "imdbID":
                    movie.setImdbID(map.get(key).toString());
                    break;
            }
            movies.add(movie);
        }

        URL searchUrl = new URL("https://api-public.guidebox.com/v1.43/US/moid0CdrVjte1T92T5KcUuZ6ROAcU1/search/movie/id/imdb/" + movie.getImdbID());
        ObjectMapper guideBoxMapper = new ObjectMapper();

        Map<String, Object> guideBoxMap = guideBoxMapper.readValue(searchUrl, Map.class);

        String rottentomatoes = guideBoxMap.get("rottentomatoes").toString();
        String poster = guideBoxMap.get("poster_400x570").toString();

        movie.setRottentomatoes(rottentomatoes);
        movie.setPoster(poster);

        request.getSession().setAttribute("result", movie);
        request.getRequestDispatcher("/View_OMDB_Results.jsp").forward(request, response);
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
