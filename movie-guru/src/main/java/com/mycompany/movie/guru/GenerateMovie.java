/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.movie.guru;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
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
import javax.servlet.http.HttpSession;

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
        //String search = request.getParameter("search");
        //DatabaseHandler handler = new DatabaseHandler();
        HttpSession session = request.getSession(true);
        List<Suggestion> suggestions = (List) session.getAttribute("suggestions");
        List<GuideBoxMovie> movies = new ArrayList<>();
        for (Suggestion s : suggestions) {
            String search = s.getName();
//            System.out.println("Suggestions: " + search);

            URL url = new URL("http://www.omdbapi.com/?t=" + URLEncoder.encode(search, "UTF-8"));
            System.out.println("OMDB Query");
            ObjectMapper mapper = new ObjectMapper();
            
            Map<String, Object> map = mapper.readValue(url, Map.class);

            if (!map.isEmpty() && !map.containsKey("Error")) {

                GuideBoxMovie movie = new GuideBoxMovie();

                movie.setTitle(map.get("Title").toString());
//                movie.setYear(map.get("Year").toString());
                
//                movie.setPoster(map.get("Poster").toString());
//                movie.setRunTime(map.get("Runtime").toString());
//                movie.setDirector(map.get("Director").toString());
//                movie.setActors(map.get("Actors").toString());
//                movie.setShortPlot(map.get("Plot").toString());
                movie.setImdbID(map.get("imdbID").toString());

                URL searchUrl = new URL("https://api-public.guidebox.com/v1.43/US/rKtBmi58PzqcQnGhju9OvicmDeHVW6IE/search/movie/id/imdb/" + movie.getImdbID());
                System.out.println("GUIDEBOX Query");
                ObjectMapper guideBoxMapper = new ObjectMapper();

                Map<String, Object> guideBoxMap = guideBoxMapper.readValue(searchUrl, Map.class);

                if (!guideBoxMap.isEmpty()) {
//                    String rottentomatoes = guideBoxMap.get("rottentomatoes").toString();
                    String poster = guideBoxMap.get("poster_400x570").toString();

//                    movie.setRottentomatoes(rottentomatoes);
                    movie.setPoster(poster);
                    movie.setRating(guideBoxMap.get("rating").toString());
                }
                if (!movie.getPoster().equals("")) {
                    //handler.addMovie(movie);
                    movies.add(movie);
                }
                System.out.println("Movie: " + movie.getTitle());
            }
        }

//        for (int i = movies.size() - 1; i > 18; --i) {
//            movies.remove(i);
//        }
        
        String json = new Gson().toJson(movies);
        PrintWriter out = response.getWriter();
        
        out.print(json);
//        request.getSession().setAttribute("movies", movies);
//        request.getRequestDispatcher("/ViewSuggestions.jsp").forward(request, response);
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
