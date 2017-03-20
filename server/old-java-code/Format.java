/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.mycompany.movie.guru;

/**
 * 
 * @author user
 */
public class Format {
    private String price;
    private String format;
    private String type;

    public Format() {
        this.price = "";
        this.format = "";
        this.type = "";
    }
    
    public Format(String price, String format, String type) {
        this.price = price;
        this.format = format;
        this.type = type;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getFormat() {
        return format;
    }

    public void setFormat(String format) {
        this.format = format;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
    
    public String getDisplay() {
        return price + " - " + format + " - " + type;
    }
    
}
