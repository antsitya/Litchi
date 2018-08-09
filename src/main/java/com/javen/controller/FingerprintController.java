package com.javen.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller  
@RequestMapping("/finger")
public class FingerprintController {

    @RequestMapping(value="/tofinger")  
    public String tofinger(HttpServletRequest request,Model model){  
        System.out.println("----");
        
        return "page/";  
    }  
    
}
