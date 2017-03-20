/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.movie.guru;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author user
 */
@WebServlet(name = "FilterResults", urlPatterns = {"/FilterResults"})
public class FilterResults extends HttpServlet {

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
        String rRating = request.getParameter("r");
        String pg13Rating = request.getParameter("pg13");
        String pgRating = request.getParameter("pg");
        
        if (rRating == null) {
            rRating = "off";
        }
        if (pg13Rating == null) {
            pg13Rating = "off";
        }
        if (pgRating == null) {
            pgRating = "off";
        }

        //MovieHandler handler = new DatabaseHandler();
        //List<GuideBoxMovie> movies = handler.getMovies();
        
        HttpSession session = request.getSession(true);
        List<GuideBoxMovie> movies = (List) session.getAttribute("movies");
        List<GuideBoxMovie> filteredMovies = new ArrayList();
        for (GuideBoxMovie movie : movies) {
            if (rRating.equals("on") && movie.getRating().equals("R")) {
                filteredMovies.add(movie);
            }
            if (pg13Rating.equals("on") && movie.getRating().equals("PG-13")) {
                filteredMovies.add(movie);
            }
            if (pgRating.equals("on") && movie.getRating().equals("PG")) {
                filteredMovies.add(movie);
            }
        }
        
        request.getSession().setAttribute("movies", filteredMovies);
        request.getRequestDispatcher("/ViewSuggestions.jsp").forward(request, response);

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
