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
    private String rottentomatoes;
    private String poster;
    private String shortPlot;
    private String longPlot;

    private String trailerLink;
    private String trailerEmbed;

    List<Source> freeWebList;
    List<Source> subscriptionWebList;
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

    public void setFreeWebList(List freeWebList) {
        this.freeWebList = freeWebList;
    }

    public List<Source> getSubscriptionWebList() {
        return subscriptionWebList;
    }

    public void setSubscriptionWebList(List subscriptionWebList) {
        this.subscriptionWebList = subscriptionWebList;
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
                
                source.addFormat(newFormat);
            }
            this.purchaseWebList.add(source);
        }
    }

}
