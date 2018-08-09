package com.javen.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;  
import org.springframework.ui.Model;  
import org.springframework.web.bind.annotation.RequestMapping;  
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.javen.model.Seal;
import com.javen.model.User;

import com.javen.service.UserService;
import com.javen.service.*;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
  
  
@Controller  
@RequestMapping("/seal")
// /user/**
public class SealController {  
    private static Logger log=LoggerFactory.getLogger(SealController.class);
    @Autowired
    private SealService SealService;
    @Autowired
    private UserService UserService;
   // 查询印章
    @RequestMapping(value="/toseal.do")  
    public String toseal(HttpServletRequest request,Model model,HttpSession session){  
        System.out.println("查询印章----------");
        User user=(User)session.getAttribute("loged");
        int comid=user.getCompanyId();
        System.out.println("comid:"+comid);
        
        
        return "page/seal/allSeal";  
    }
    @RequestMapping(value="/count.do")
    @ResponseBody
    public int count(HttpServletRequest request,Model model,HttpSession session){  
        System.out.println("查询印章总数----------");
        User user=(User)session.getAttribute("loged");
        int comid=user.getCompanyId();
        System.out.println("comid:"+comid);
        int count = SealService.count(comid);
        return count;  
    }
    @RequestMapping(value="/sealList.do",produces = "text/plain;charset=utf-8")
    @ResponseBody
    public String sealList(HttpServletRequest request,Model model,HttpSession session,@RequestParam("page") int page){
        System.out.println("分页查询----------");
        int limit=8;
        int before = limit * (page - 1);
        int after = page * limit;
        User user002=(User)session.getAttribute("loged");
        int comid=user002.getCompanyId();
        System.out.println("comid:"+comid);
        List<Seal> eilist = SealService.findAllPage(before,comid);
        JSONArray json = JSONArray.fromObject(eilist);
        String js = json.toString();       
        System.out.println(js);
        return js;
    }
    @RequestMapping(value="/tosealInfo.do",produces = "text/plain;charset=utf-8")
    public String tosealInfo(HttpServletRequest request,Model model,HttpSession session,@RequestParam("sealid") int sealid){
        System.out.println("查看印章信息--------");
        System.out.println("sealid:"+sealid);
        User user002=(User)session.getAttribute("loged");
        int comid,empid;
        comid=user002.getCompanyId();
        System.out.println("comid"+comid);
        Seal sea=SealService.findseal(user002.getCompanyId(), sealid);
//        User user=new User();
        empid=sea.getEmpid();
        System.out.println("empid:"+empid);  
//        user.setEmployeeId(empid);
//        user.setCompanyId(comid);
        String name=UserService.getusername(empid, comid);
        session.setAttribute("sealInfo", sea);
        session.setAttribute("name",name);
        return "page/seal/sealInfo";
    }
}