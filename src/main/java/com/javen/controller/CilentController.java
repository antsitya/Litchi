package com.javen.controller;

import java.io.File;
import java.io.IOException;
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
import org.springframework.web.multipart.MultipartFile;

import com.javen.model.*;


//import java.sql.Date sdate;//数据库支持类型
// 
//java.util.Date udate;

import com.javen.service.UserService;
import com.javen.service.*;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
  
  
@Controller  
@RequestMapping("/cilent")

public class CilentController {  
    private static Logger log=LoggerFactory.getLogger(CilentController.class);
    @Autowired
    private RecordService recordService;
    @Autowired
    private ArchiveService archiveService; 
    
    @RequestMapping(value="/apply")
    @ResponseBody
    public String apply(HttpServletRequest request,Model model){
        System.out.println("----");
        
        return "page/verify/verifyList";  
    }
    @RequestMapping(value="/accept.do")
    @ResponseBody
    public String accept(HttpServletRequest request,Model model,HttpSession session,@RequestParam("id") String id
            ,@RequestParam("times") String times,@RequestParam("didid") String didid){
        System.out.println("----");
        System.out.println("id:"+id+",times:"+times+",didid:"+didid);
        Record record=new Record();
        record.setId(Integer.valueOf(id));
        record.setTimes(Integer.valueOf(times));
        record.setDidId(Integer.valueOf(didid));
        record.setStatus("ok");
        int x=recordService.updaterecord(record);
        System.out.println(x);
        record=recordService.selectRecord(Integer.valueOf(id));
        System.out.println(record.getFromId());
        Archive archive=new Archive();
        archive.setCompanyId(record.getCompanyId());
        archive.setDidId(record.getDidId());
        archive.setFromId(record.getFromId());
        archive.setImage(record.getImagesUrl());
        archive.setImgeNums(record.getImgeNums());
        archive.setImgeTimes(record.getImgeTimes());
        archive.setResult("ok");
        archive.setSealid(record.getSealid());
        archive.setTime(record.getTime());
        archive.setTimes(Integer.valueOf(times));
        int y=archiveService.insertarchive(archive);
        return "success";  
    }
    @RequestMapping(value="/deny.do")
    @ResponseBody
    public String deny(HttpServletRequest request,Model model,HttpSession session,@RequestParam("id") String id
            ,@RequestParam("reason") String reason,@RequestParam("didid") String didid){
        System.out.println("----");
        System.out.println("id:"+id+",reason:"+reason+",didid:"+didid);
        Record record=new Record();
        record.setId(Integer.valueOf(id));
        record.setReason(reason);
        record.setDidId(Integer.valueOf(didid));
        record.setStatus("fail");
        int x=recordService.updaterecord(record);
        System.out.println(x);
        return "success";  
    }
    /*
     * 客户端与服务器通信方案
     * 1.客户端员工登陆账号调用服务器端接口（apply.do）发起印章申请（传入的参数：id(),comid(公司id),fromid(申请人id),times(申请印章次数),imagename(合同图片名称),imagenums(合同图片数量),sealid(申请印章的id),）
     * 2.上传图片到服务器指定路径（命名）
     * 3.申请发送成功后客户端每10秒调用服务器端接口（query.do）查询申请处理状态，当状态变为（ok/fail）时进行对应的处理。
     * 
     */
    
    
    //客户端申请合同印章
    @RequestMapping(value="/apply.do")
    @ResponseBody
    public String apply(HttpServletRequest request,Model model,HttpSession session,@RequestParam("id") String id
            ,@RequestParam("comid") String comid,@RequestParam("fromid") String fromid,@RequestParam("times") String times
            ,@RequestParam("imagename") String imagename,@RequestParam("imagenums") String imagenums,@RequestParam("sealid") String sealid){
        System.out.println("----");
        System.out.println("id:"+id+",fromid:"+fromid);
        Record record=new Record();
        record.setId(Integer.valueOf(id));
        record.setFromId(Integer.valueOf(fromid));
        record.setStatus("will");
        record.setCompanyId(Integer.valueOf(comid));
        record.setImagesUrl(imagename);
        record.setImgeNums(Integer.valueOf(imagenums));
        record.setSealid(Integer.valueOf(sealid));
        record.setTimes(Integer.valueOf(times));
        java.sql.Date sdate;//数据库支持类型
        java.util.Date udate;
        udate = new java.util.Date();//获取系统时间
        sdate = new java.sql.Date(udate.getTime());//类型转换
        record.setTime(sdate);
        int x=recordService.insertRecord(record);
        int result=recordService.maxid();
        System.out.println(result);
        return String.valueOf(result);  
    }
    
   //跳转至上传图片页面
  @RequestMapping(value="/tosendimg.do")
  public String sendimg(HttpServletRequest request,Model model){
      System.out.println("----");
      
      return "page/uploadimg";  
  }
  //客户端传输图片至服务器
//    @RequestMapping(value="/sendimg.do")
//    @ResponseBody
//    public String sendimg(HttpServletRequest request,Model model,HttpSession session
//            ,@RequestParam("imagename") String imagename,@RequestParam("index") String index){
//        System.out.println("----");
//        System.out.println("imagename:"+imagename+",index:"+index);
//        
//        return "ok";  
//    }
    
    
    @RequestMapping(value="/sendimg.do")
    @ResponseBody
    public String sendimg(HttpServletRequest request,Model model,HttpSession session,@RequestParam("file") MultipartFile file,@RequestParam("index") String index) throws IllegalStateException, IOException{
        System.out.println("进入sendimg!index:"+index);
        String path = request.getSession().getServletContext().getRealPath("/WEB-INF/jsp/contract");
        System.out.println("path>>"+path);
 
        String fileName = file.getOriginalFilename();
        System.out.println("fileName>>"+fileName);
        
        File dir = new File(path, fileName);
        System.out.println("dir.exists()>>"+dir.exists());
        if(!dir.exists()){
            dir.mkdirs();
        }
        System.out.println("dir.exists()>>"+dir.exists());
//      MultipartFile自带的解析方法
        file.transferTo(dir);
        
        return "ok";
    }
    @RequestMapping(value="/sendimg1.do")
    @ResponseBody
    public String sendimg1(HttpServletRequest request,Model model,HttpSession session,@RequestParam("file") MultipartFile file,String index) throws IllegalStateException, IOException{
        System.out.println("进入sendimg!index:"+index);
        String path = request.getSession().getServletContext().getRealPath("/WEB-INF/jsp/contract");
        System.out.println("path>>"+path);
 
        String fileName = file.getOriginalFilename();
        System.out.println("fileName>>"+fileName);
        
        File dir = new File(path, fileName);
        System.out.println("dir.exists()>>"+dir.exists());
        if(!dir.exists()){
            dir.mkdirs();
        }
        System.out.println("dir.exists()>>"+dir.exists());
//      MultipartFile自带的解析方法
        file.transferTo(dir);
        
        return "ok";
    }
    
    
    
  //客户端查询印章结果
    @RequestMapping(value="/query.do")
    @ResponseBody
    public String query(HttpServletRequest request,Model model,HttpSession session,@RequestParam("id") String id){
        System.out.println("----");
        System.out.println("id:"+id);
        Record record=new Record();
        record=recordService.selectRecord(Integer.valueOf(id));
        System.out.println(record.getStatus());
        return record.getStatus();  
    }
}