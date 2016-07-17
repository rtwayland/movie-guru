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
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
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
        HttpSession session = request.getSession(true);
        List<Suggestion> suggestions = (List) session.getAttribute("suggestions");
        List<GuideBoxMovie> movies = new ArrayList<>();
        int i = 1;
        for (Suggestion s : suggestions) {
            String search = s.getName();
            System.out.println("Suggestion name: " + search);

            URL url = new URL("https://api-public.guidebox.com/v1.43/US/rKtBmi58PzqcQnGhju9OvicmDeHVW6IE/search/movie/title/" + URLEncoder.encode(search, "UTF-8"));
            System.out.println(i + " GB Query: " + url);
            ObjectMapper mapper = new ObjectMapper();

            Map<String, Object> map;
            try {
                map = mapper.readValue(url, Map.class);
            } catch (Exception ex) {
                // something bad happend, skip to the next one
                Logger logger = Logger.getAnonymousLogger();
                logger.log(Level.SEVERE, "an exception was thrown", ex);
                //Create the map and fill it with the error key
                map = new HashMap<>();
                map.put("error", "no movie");
            }

            if (!map.isEmpty() && !map.containsKey("error")) {
                List list = (List) map.get("results");
                GuideBoxMovie movie = new GuideBoxMovie();

                if (!list.isEmpty()) {
                    Map<String, Object> guideBoxMap = (Map<String, Object>) list.get(0);

                    if (!guideBoxMap.isEmpty()) {
                        movie.setId(guideBoxMap.get("id").toString());
                        movie.setImdbID(guideBoxMap.get("imdb").toString());
                        System.out.println("The GB ID: " + movie.getId());

                        movie.setTitle(guideBoxMap.get("title").toString());
                        movie.setYear(guideBoxMap.get("release_year").toString());
                        movie.setRating(guideBoxMap.get("rating").toString());
                        movie.setRottentomatoes(guideBoxMap.get("rottentomatoes").toString());
                        movie.setSmallPoster(guideBoxMap.get("poster_240x342").toString());
                        movie.setLargePoster(guideBoxMap.get("poster_400x570").toString());

                        //Do a new search with the newly obtained GuideBox ID
                        URL sourcesUrl = new URL("https://api-public.guidebox.com/v1.43/US/rKtBmi58PzqcQnGhju9OvicmDeHVW6IE/movie/" + movie.getId());
                        System.out.println("GUIDEBOX sources: " + sourcesUrl);
                        System.out.println("");
                        ObjectMapper sourceMapper = new ObjectMapper();

                        Map<String, Object> sourceMap = sourceMapper.readValue(sourcesUrl, Map.class);

                        String longPlot = sourceMap.get("overview").toString();
                        movie.setLongPlot(longPlot);

                        if (sourceMap.get("duration") != null) {
                            int duration = (int) sourceMap.get("duration");

                            movie.setRunTime(duration);
                        }

                        //Grab the Trailers from the search
                        Map<String, Object> trailers = (Map) sourceMap.get("trailers");

                        List trailerList = (List) trailers.get("web");

                        for (Object item : trailerList) {
                            Map<String, Object> innerMap = (Map<String, Object>) item;

                            //Insert the trailer links into the Movie object
                            movie.setTrailerLink(innerMap.get("link").toString());
                            movie.setTrailerEmbed(innerMap.get("embed").toString());
                        }

                        List writerList = (List) sourceMap.get("writers");
                        String writers = "";
                        int writeCount = 0;
                        for (Object writer : writerList) {
                            Map<String, Object> innerMap = (Map<String, Object>) writer;
                            if (writeCount == writerList.size() - 1) {
                                writers += innerMap.get("name");
                            } else {
                                writers += innerMap.get("name") + ", ";
                            }
                            writeCount++;
                        }

                        movie.setWriter(writers);

                        List directorList = (List) sourceMap.get("directors");
                        String directors = "";
                        int dirCount = 0;
                        for (Object director : directorList) {
                            Map<String, Object> innerMap = (Map<String, Object>) director;
                            if (dirCount == directorList.size() - 1) {
                                directors += innerMap.get("name");
                            } else {
                                directors += innerMap.get("name") + ", ";
                            }
                            dirCount++;
                        }

                        movie.setDirector(directors);

                        List actorList = (List) sourceMap.get("cast");
                        String actors = "";
                        int count = 0;
                        for (Object actor : actorList) {
                            Map<String, Object> innerMap = (Map<String, Object>) actor;

                            if (count < 7) {
                                if (count == actorList.size() - 1 || count == 6) {
                                    actors += innerMap.get("name");
                                } else {
                                    actors += innerMap.get("name") + ", ";
                                }
                            } else {
                                break;
                            }
                            count++;
                        }

                        movie.setActors(actors);

                        //Grab the list of Sources the movie is available at
                        List freeWebList = (List) sourceMap.get("free_web_sources");
                        List subscriptionWebList = (List) sourceMap.get("subscription_web_sources");
                        List purchaseWebList = (List) sourceMap.get("purchase_web_sources");

                        //Insert the lists into the movies
                        movie.setFreeWebList(freeWebList);
                        movie.setSubscriptionWebList(subscriptionWebList);
                        movie.setPurchaseWebList(purchaseWebList);

                        if (!movie.getLargePoster().equals("")) {
                            movies.add(movie);
                        }

                    } else {
                        System.out.println("EMPTY!\n");
                    }
                }

            }
            i++;
        }

        String json = new Gson().toJson(movies);
        PrintWriter out = response.getWriter();

        out.print(json);
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
