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
 * @author user
 */
@WebServlet(name = "GenerateSuggestions", urlPatterns = {"/GenerateSuggestions"})
public class GenerateSuggestions extends HttpServlet {

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
        String search = request.getParameter("suggestion-search");

        URL url = new URL("https://www.tastekid.com/api/similar?k=228946-moviegur-14IA4LWB&q=" + URLEncoder.encode(search, "UTF-8") + "&type=movies");
        ObjectMapper mapper = new ObjectMapper();

        Map<String, Object> map = mapper.readValue(url, Map.class);
        Map<String, Object> innerMap = (Map<String, Object>) map.get("Similar");

        List list = (List) innerMap.get("Results");
        List<Suggestion> suggestions = new ArrayList<>();
        Suggestion originalMovie = new Suggestion(search, "movie");
        suggestions.add(originalMovie);
        for (Object item : list) {
            Map<String, Object> resultMap = (Map<String, Object>) item;
            Suggestion suggestion = new Suggestion();
            for (String key : resultMap.keySet()) {
                switch (key) {
                    case "Name":
                        suggestion.setName(resultMap.get(key).toString());
                        break;
                    case "Type":
                        suggestion.setType(resultMap.get(key).toString());
                        break;
                }
            }
            suggestions.add(suggestion);
        }

        request.getSession().setAttribute("suggestions", suggestions);
        request.getRequestDispatcher("/GenerateMovie").forward(request, response);
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
