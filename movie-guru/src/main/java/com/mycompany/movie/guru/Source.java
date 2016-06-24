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
