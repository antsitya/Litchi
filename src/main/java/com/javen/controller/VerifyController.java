package com.javen.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller  
@RequestMapping("/verify")
public class VerifyController {

    @RequestMapping(value="/toverify")  
    public String tofinger(HttpServletRequest request,Model model){  
        System.out.println("----");
        
        return "page/verify/verifyList";  
    }
    
}
