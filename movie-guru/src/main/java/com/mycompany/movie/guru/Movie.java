/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.movie.guru;

/**
 *
 * @author Raleigh Wayland
 */
public class Movie {

    private String title;
    private String year;
    private String rating;
    private String runTime;
    private String director;
    private String actors;
    private String plot;
    private String poster;
    private String imdbID;

    public Movie() {
        this.title = "";
        this.year = "";
        this.rating = "";
        this.runTime = "";
        this.director = "";
        this.actors = "";
        this.plot = "";
        this.poster = "";
        this.imdbID = "";
    }

    public Movie(String title, String year, String rating, String runTime, String director, String actors, String plot, String poster, String imdbID) {
        this.title = title;
        this.year = year;
        this.rating = rating;
        this.runTime = runTime;
        this.director = director;
        this.actors = actors;
        this.plot = plot;
        this.poster = poster;
        this.imdbID = imdbID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public String getRunTime() {
        return runTime;
    }

    public void setRunTime(String runTime) {
        this.runTime = runTime;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public String getActors() {
        return actors;
    }

    public void setActors(String actors) {
        this.actors = actors;
    }

    public String getPlot() {
        return plot;
    }

    public void setPlot(String plot) {
        this.plot = plot;
    }

    public String getPoster() {
        return poster;
    }

    public void setPoster(String poster) {
        this.poster = poster;
    }

    public String getImdbID() {
        return imdbID;
    }

    public void setImdbID(String imdbID) {
        this.imdbID = imdbID;
    }

}
