/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.mycompany.movie.guru;

import java.util.ArrayList;
import java.util.List;

/**
 * 
 * @author user
 */
public class Source {
    private String name;
    private String link;
    
    List<Format> formats = new ArrayList<>();

    public Source() {
        this.name = "";
        this.link = "";
    }
    public Source(String name, String link) {
        this.name = name;
        this.link = link;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public List<Format> getFormats() {
        return formats;
    }

    public void setFormats(List<Format> formats) {
        this.formats = formats;
    }
    
    public void addFormat(Format format) {
        formats.add(format);
    }
    
//    public String displayFormats() {
//        
//        for (Format format: formats) {
//            return format.getDisplay();
//        }
//    }
    
}
