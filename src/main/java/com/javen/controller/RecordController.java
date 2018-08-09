package com.javen.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.javen.model.Archive;
import com.javen.model.Record;
import com.javen.model.Seal;
import com.javen.model.User;
import com.javen.service.ArchiveService;
import com.javen.service.RecordService;
import com.javen.service.SealService;
import com.javen.service.UserService;

import net.sf.json.JSONArray;

@Controller  
@RequestMapping("/record")
public class RecordController {

    @Autowired
    private UserService UserService;
    @Autowired
    private RecordService RecordService;
    @Autowired
    private SealService SealService;
    @RequestMapping(value="/torecord")  
    public String torecord(HttpServletRequest request,Model model){  
        System.out.println("----");
        
        return "page/record/recordList";  
    }  
    @RequestMapping(value="/count.do")
    @ResponseBody
    public int count(HttpServletRequest request,Model model,HttpSession session){  
        System.out.println("查询历史总数----------");
        User user=(User)session.getAttribute("loged");
        int comid=user.getCompanyId();
        System.out.println("comid:"+comid);
        int count = RecordService.count(comid);
        System.out.println(count);
        return count;  
    }
    @RequestMapping(value="/recordList.do",produces = "text/plain;charset=utf-8")
    @ResponseBody
    public String archiveList(HttpServletRequest request,Model model,HttpSession session,@RequestParam("page") int page){
        System.out.println("分页查询----------");
        int limit=8;
        int before = limit * (page - 1);
        int after = page * limit;
        User user002=(User)session.getAttribute("loged");
        int comid=user002.getCompanyId();
        System.out.println("comid:"+comid);
        List<Record> eilist = RecordService.findAllPage(before,comid);
        JSONArray json = JSONArray.fromObject(eilist);
        String js = json.toString();       
        System.out.println(js);
        return js;
    }
    
    @RequestMapping(value="/torecordinfo.do",produces = "text/plain;charset=utf-8")  
    public String toarchiveinfo(HttpServletRequest request,Model model,HttpSession session,@RequestParam("id") int id){
        System.out.println("查看历史信息--------");
        System.out.println("id:"+id);
        User user002=(User)session.getAttribute("loged");
        int comid,fromid,didid;
        comid=user002.getCompanyId();
        String didname,fromname;
        System.out.println("comid"+comid);
        Record record=RecordService.findrecord(comid,id);
        fromid=record.getFromId();
        if(record.getDidId()==null) {
            didname="无";
        }else {
            didname=UserService.getusername(record.getDidId(), comid);
        }
        Seal sea=SealService.findseal(comid, record.getSealid());
        fromname=UserService.getusername(fromid, comid);
        session.setAttribute("RecordInfo", record);
        session.setAttribute("from",fromname);
        session.setAttribute("did",didname);
        session.setAttribute("recordseal",sea.getSealname());
        return "page/record/recordDetial";  
    }
    
    
    
    @RequestMapping(value="/doverify.do",produces = "text/plain;charset=utf-8")  
    public String doverify(HttpServletRequest request,Model model,HttpSession session,@RequestParam("id") int id){
        System.out.println("查看历史信息--------");
        System.out.println("id:"+id);
        User user002=(User)session.getAttribute("loged");
        int comid,fromid,didid;
        comid=user002.getCompanyId();
        String didname,fromname;
        System.out.println("comid"+comid);
        Record record=RecordService.findrecord(comid,id);
        fromid=record.getFromId();
        if(record.getDidId()==null) {
            didname="无";
        }else {
            didname=UserService.getusername(record.getDidId(), comid);
        }
        Seal sea=SealService.findseal(comid, record.getSealid());
        fromname=UserService.getusername(fromid, comid);
        session.setAttribute("VerifyInfo", record);
        session.setAttribute("from",fromname);
        session.setAttribute("did",didname);
        session.setAttribute("recordseal",sea.getSealname());
        return "page/verify/doVerify";
    }
    
    
    
    @RequestMapping(value="/toverify")  
    public String tofinger(HttpServletRequest request,Model model){  
        System.out.println("----");
        
        return "page/verify/verifyList";  
    }
    @RequestMapping(value="/countdid.do")
    @ResponseBody
    public int countdid(HttpServletRequest request,Model model,HttpSession session){  
        System.out.println("查询已审核总数----------");
        User user=(User)session.getAttribute("loged");
        int comid=user.getCompanyId();
        System.out.println("comid:"+comid);
        int count = RecordService.countdid(comid,user.getEmployeeId());
        System.out.println(count);
        return count;  
    }
    @RequestMapping(value="/countwill.do")
    @ResponseBody
    public int countwill(HttpServletRequest request,Model model,HttpSession session){
        System.out.println("查询待审核总数----------");
        User user=(User)session.getAttribute("loged");
        int comid=user.getCompanyId();
        System.out.println("comid:"+comid);
        int count = RecordService.countwill(comid);
        System.out.println(count);
        return count;  
    }
    @RequestMapping(value="/willList.do",produces = "text/plain;charset=utf-8")
    @ResponseBody
    public String willList(HttpServletRequest request,Model model,HttpSession session,@RequestParam("page") int page){
        System.out.println("分页查询----------");
        int limit=8;
        int before = limit * (page - 1);
        int after = page * limit;
        User user002=(User)session.getAttribute("loged");
        int comid=user002.getCompanyId();
        System.out.println("comid:"+comid);
        List<Record> eilist = RecordService.findAllPagewill(before,comid);
        JSONArray json = JSONArray.fromObject(eilist);
        String js = json.toString();       
        System.out.println(js);
        return js;
    }
    @RequestMapping(value="/didList.do",produces = "text/plain;charset=utf-8")
    @ResponseBody
    public String didList(HttpServletRequest request,Model model,HttpSession session,@RequestParam("page") int page){
        System.out.println("分页查询----------");
        int limit=8;
        int before = limit * (page - 1);
        int after = page * limit;
        User user002=(User)session.getAttribute("loged");
        int comid=user002.getCompanyId();
        System.out.println("comid:"+comid);
        List<Record> eilist = RecordService.findAllPagedid(before,comid,user002.getEmployeeId());
        JSONArray json = JSONArray.fromObject(eilist);
        String js = json.toString();       
        System.out.println(js);
        return js;
    }
}
