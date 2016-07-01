/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.movie.guru;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 *
 * @author user
 */
public class GuideBoxMovie {

    private String id;
    private String title;
    private String year;
    private String rating;
    private String runTime;
    private String rottentomatoes;
    private String poster;
    private String shortPlot;
    private String longPlot;
    private String director;
    private String writer;
    private String actors;
    private String imdbID;

    private String trailerLink;
    private String trailerEmbed;

    List<Source> freeWebList = new ArrayList<>();
    List<Source> subscriptionWebList = new ArrayList<>();
    List<Source> purchaseWebList = new ArrayList<>();

    public GuideBoxMovie() {
        this.id = "";
        this.title = "";
        this.year = "";
        this.rating = "";
        this.rottentomatoes = "";
        this.poster = "";
        this.trailerLink = "";
        this.trailerEmbed = "";
    }

    public GuideBoxMovie(String id, String title, String year, String rating, String rottentomatoes, String poster) {
        this.id = id;
        this.title = title;
        this.year = year;
        this.rating = rating;
        this.rottentomatoes = rottentomatoes;
        this.poster = poster;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getRottentomatoes() {
        return rottentomatoes;
    }

    public void setRottentomatoes(String rottentomatoes) {
        this.rottentomatoes = rottentomatoes;
    }

    public String getRunTime() {
        return runTime;
    }

    public void setRunTime(String runTime) {
        this.runTime = runTime;
    }

    public String getShortPlot() {
        return shortPlot;
    }

    public void setShortPlot(String shortPlot) {
        this.shortPlot = shortPlot;
    }

    public String getLongPlot() {
        return longPlot;
    }

    public void setLongPlot(String longPlot) {
        this.longPlot = longPlot;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public String getWriter() {
        return writer;
    }

    public void setWriter(String writer) {
        this.writer = writer;
    }

    public String getActors() {
        return actors;
    }

    public void setActors(String actors) {
        this.actors = actors;
    }

    public String getImdbID() {
        return imdbID;
    }

    public void setImdbID(String imdbID) {
        this.imdbID = imdbID;
    }

    public String getPoster() {
        return poster;
    }

    public void setPoster(String poster) {
        this.poster = poster;
    }

    public String getTrailerLink() {
        return trailerLink;
    }

    public void setTrailerLink(String trailerLink) {
        this.trailerLink = trailerLink;
    }

    public String getTrailerEmbed() {
        return trailerEmbed;
    }

    public void setTrailerEmbed(String trailerEmbed) {
        this.trailerEmbed = trailerEmbed;
    }

    public List<Source> getFreeWebList() {
        return freeWebList;
    }

    public void setFreeWebList(List newFreeWebList) {
        for (Object item : newFreeWebList) {
            Map<String, Object> innerMap = (Map<String, Object>) item;
            String sourceName = innerMap.get("display_name").toString();
            String sourceLink = innerMap.get("link").toString();

            Source source = new Source(sourceName, sourceLink);

            this.freeWebList.add(source);
        }
    }

    public List<Source> getSubscriptionWebList() {
        return subscriptionWebList;
    }

    public void setSubscriptionWebList(List newSubscriptionWebList) {
        for (Object item : newSubscriptionWebList) {
            Map<String, Object> innerMap = (Map<String, Object>) item;
            String sourceName = innerMap.get("display_name").toString();
            String sourceLink = innerMap.get("link").toString();

            Source source = new Source(sourceName, sourceLink);

            this.subscriptionWebList.add(source);
        }
    }

    public List<Source> getPurchaseWebList() {
        return purchaseWebList;
    }

    public void setPurchaseWebList(List newPurchaseWebList) {
        for (Object item : newPurchaseWebList) {
            Map<String, Object> innerMap = (Map<String, Object>) item;
            String sourceName = innerMap.get("display_name").toString();
            String sourceLink = innerMap.get("link").toString();

            Source source = new Source(sourceName, sourceLink);

            List formats = (List) innerMap.get("formats");

            for (Object formatItem : formats) {
                Map<String, Object> formatMap = (Map<String, Object>) formatItem;
                String price = formatMap.get("price").toString();
                String format = formatMap.get("format").toString();
                String type = formatMap.get("type").toString();

                Format newFormat = new Format(price, format, type);

                if (newFormat.getType().equals("rent")) {
                    source.addRentFormats(newFormat);
                } else {
                    source.addBuyFormats(newFormat);
                }

            }
            this.purchaseWebList.add(source);
        }
    }

    public void displaySource() {
        for (Source source : purchaseWebList) {
            System.out.println(source.getName());
        }
    }

}
