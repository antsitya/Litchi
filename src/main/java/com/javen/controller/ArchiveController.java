package com.javen.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.javen.model.Archive;
import com.javen.model.Seal;
import com.javen.model.User;
import com.javen.service.*;

import net.sf.json.JSONArray;

@Controller  
@RequestMapping("/archive")
public class ArchiveController {
    @Autowired
    private UserService UserService;
    @Autowired
    private ArchiveService ArchiveService;
    @Autowired
    private SealService SealService;
    @RequestMapping(value="/toarchive")  
    public String toarchive(HttpServletRequest request,Model model){  
        System.out.println("----");
        
        return "page/archive/archiveList";  
    }
    @RequestMapping(value="/count.do")
    @ResponseBody
    public int count(HttpServletRequest request,Model model,HttpSession session){  
        System.out.println("查询归档总数----------");
        User user=(User)session.getAttribute("loged");
        int comid=user.getCompanyId();
        System.out.println("comid:"+comid);
        int count = ArchiveService.count(comid);
        System.out.println(count);
        return count;  
    }
    @RequestMapping(value="/archiveList.do",produces = "text/plain;charset=utf-8")
    @ResponseBody
    public String archiveList(HttpServletRequest request,Model model,HttpSession session,@RequestParam("page") int page){
        System.out.println("分页查询----------");
        int limit=8;
        int before = limit * (page - 1);
        int after = page * limit;
        User user002=(User)session.getAttribute("loged");
        int comid=user002.getCompanyId();
        System.out.println("comid:"+comid);
        List<Archive> eilist = ArchiveService.findAllPage(before,comid);
        JSONArray json = JSONArray.fromObject(eilist);
        String js = json.toString();       
        System.out.println(js);
        return js;
    }
    
    @RequestMapping(value="/toarchiveinfo.do",produces = "text/plain;charset=utf-8")  
    public String toarchiveinfo(HttpServletRequest request,Model model,HttpSession session,@RequestParam("id") int id){  
        System.out.println("查看归档信息--------");
        System.out.println("id:"+id);
        User user002=(User)session.getAttribute("loged");
        int comid,fromid,didid;
        comid=user002.getCompanyId();
        System.out.println("comid"+comid);
        Archive archive=ArchiveService.findseal(user002.getCompanyId(),id);
        fromid=archive.getFromId();
        didid=archive.getDidId();
        String fromname=UserService.getusername(fromid, comid);
        String didname=UserService.getusername(didid, comid);
        System.out.println("sealid:"+archive.getSealid());
        Seal sea=SealService.findseal(comid, archive.getSealid());
        System.out.println(sea.getSealname());
        session.setAttribute("ArchiveInfo", archive);
        session.setAttribute("from",fromname);
        session.setAttribute("did",didname);
        session.setAttribute("seal", sea.getSealname());
        return "page/archive/archiveDetial";  
    }  
}
