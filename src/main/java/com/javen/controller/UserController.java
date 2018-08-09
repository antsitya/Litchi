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

import com.javen.model.User;

import com.javen.service.UserService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
  
  
@Controller  
@RequestMapping("/user")
// /user/**
public class UserController {  
    private static Logger log=LoggerFactory.getLogger(UserController.class);
    @Autowired
    private UserService UserService; 

    @RequestMapping(value="/tomain.do")  
    public String tomain(HttpServletRequest request,Model model,HttpSession session){  
        System.out.println("main--------");
        User user001=(User)session.getAttribute("loged");
        if(user001.getAdmin()>1) {
            return "page/main";
        }else {
           return "page/main01"; 
        }
          
    }  
    @RequestMapping(value="/toUserInfo.do")  
    public String toUserInfo(HttpServletRequest request,Model model){  
        System.out.println("login--------");
        
        
        
        return "page/user/userInfo";  
    }
    @RequestMapping(value="/toChangePW.do")  
    public String toChangePW(HttpServletRequest request,Model model){  
        System.out.println("login--------");
        
        
        
        return "page/user/changePwd";  
    }
    @RequestMapping(value="/doChangePW.do",method=RequestMethod.POST) 
    @ResponseBody
    public String doChangePW(HttpServletRequest request,Model model,HttpSession session,@RequestParam("npw") String npw){  
        System.out.println("login--------");
        System.out.println("npw:"+npw);
        
        User user2=(User)session.getAttribute("loged");
        user2.setPassword(npw);
        System.out.println("session"+user2.getPassword());
        String R1=UserService.setUserpw(user2);
        session.setAttribute("loged", user2);
        return "success";
    }
    @RequestMapping(value="/updateInfoSelf.do",method=RequestMethod.POST) 
    @ResponseBody
    public String updateInfoSelf(HttpServletRequest request,Model model,HttpSession session,@RequestParam("sex") String sex,@RequestParam("tel") String tel,@RequestParam("email") String email){  
        System.out.println("修改基本信息----------");
        User user3=(User)session.getAttribute("loged");
        user3.setTel(tel);
        user3.setEmail(email);
        if(sex.equals("男")) {
            user3.setSex("nan");
        }else {
            user3.setSex("nv");
        }
        User istel=UserService.isTel(tel);
        if(istel!=null) {
            return "repeat";
        }else {
            UserService.setUserpw(user3);
            session.setAttribute("loged", user3);
            return "success";
        }
    }
    //添加员工
    @RequestMapping(value="/doadduser.do",method=RequestMethod.POST) 
    @ResponseBody
    public String adduser(HttpServletRequest request,Model model,HttpSession session,@RequestParam("employid") String employid,@RequestParam("comid") String comid,@RequestParam("name") String name,
            @RequestParam("sex") String sex,@RequestParam("tel") String tel,@RequestParam("admin") String admin,@RequestParam("email") String email,@RequestParam("pw") String pw){  
        System.out.println("添加用户----------");
        System.out.println("employid:"+employid+",comid:"+comid+",name:"+name+",sex:"+sex+",admin:"+admin+",tel:"+tel+",email:"+email+",pw:"+pw);
        User u=new User();
        u.setAdmin(Integer.valueOf(admin));
        u.setCompanyId(Integer.valueOf(comid));
        u.setEmail(email);
        u.setEmployeeId(Integer.valueOf(employid));
        u.setName(name);
        u.setPassword(pw);
        u.setSex(sex);
        u.setTel(tel);
        User istel=UserService.isTel(tel);
        User isemp=UserService.isreap(u.getEmployeeId(),u.getCompanyId());
        if(istel!=null||isemp!=null) {
            return "repeat";
        }else {
            int x=UserService.adduser(u);
            System.out.println("result:"+u);
            return "success";
        }
    }
    //查询员工
    @RequestMapping(value="/touser.do")  
    public String touser(HttpServletRequest request,Model model,HttpSession session){  
        System.out.println("查询员工----------");
        User user002=(User)session.getAttribute("loged");
        int comid=user002.getCompanyId();
        System.out.println("comid:"+comid);
        
        
        return "page/user/allUsers";  
    }
    @RequestMapping(value="/count.do")
    @ResponseBody
    public int count(HttpServletRequest request,Model model,HttpSession session){  
        System.out.println("查询员工----------");
        User user002=(User)session.getAttribute("loged");
        int comid=user002.getCompanyId();
        System.out.println("comid:"+comid);
        int count = UserService.count(comid);
        return count;  
    }
    @RequestMapping(value="/userList.do",produces = "text/plain;charset=utf-8")
    @ResponseBody
    public String userList(HttpServletRequest request,Model model,HttpSession session,@RequestParam("page") int page){  
        System.out.println("分页查询----------");
        int limit=8;
        int before = limit * (page - 1);
        int after = page * limit;
        User user002=(User)session.getAttribute("loged");
        int comid=user002.getCompanyId();
        System.out.println("comid:"+comid);
        List<User> eilist = UserService.findAllPage(before,comid);
        JSONArray json = JSONArray.fromObject(eilist);
        String js = json.toString();       
        System.out.println(js);
        return js;
    }  
    @RequestMapping(value="/toeditUser.do",produces = "text/plain;charset=utf-8")  
    public String toaddUser(HttpServletRequest request,Model model,HttpSession session,@RequestParam("empid") int empid){  
        System.out.println("修改员工信息--------");
        System.out.println("empid:"+empid);
        User user002=(User)session.getAttribute("loged");
        User user003=new User();
        user003.setCompanyId(user002.getCompanyId());
        user003.setEmployeeId(Integer.valueOf(empid));
        user003=UserService.finduser(user003);
        session.setAttribute("edituser", user003);
        return "page/user/editUser";
    }
    //修改员工
    @RequestMapping(value="/doedituser.do",method=RequestMethod.POST) 
    @ResponseBody
    public String doedituser(HttpServletRequest request,Model model,HttpSession session,@RequestParam("employid") String employid,@RequestParam("comid") String comid,@RequestParam("name") String name,
            @RequestParam("sex") String sex,@RequestParam("tel") String tel,@RequestParam("email") String email,@RequestParam("pw") String pw){  
        System.out.println("添加用户----------");
        System.out.println("employid:"+employid+",comid:"+comid+",name:"+name+",sex:"+sex+",tel:"+tel+",email:"+email+",pw:"+pw);
        User u=new User();
        u.setCompanyId(Integer.valueOf(comid));
        u.setEmail(email);
        u.setEmployeeId(Integer.valueOf(employid));
        u.setName(name);
        u.setPassword(pw);
        u.setSex(sex);
        u.setTel(tel);
        User istel=UserService.isTel(tel);
//        User isemp=UserService.isreap(u.getEmployeeId(),u.getCompanyId());
        if(istel!=null) {
            return "repeat";
        }else {
            int x=UserService.edituser(u);
            return "success";
        }
    }
    @RequestMapping(value="/toaddUser.do",produces = "text/plain;charset=utf-8")
    public String toeditUser(HttpServletRequest request,Model model){  
        System.out.println("login--------");
        
        return "page/user/addUser";  
    }
    // /user/test?id=1
    @RequestMapping(value="/test",method=RequestMethod.GET)  
    public String test(HttpServletRequest request,Model model){  
        System.out.println("----");
        int userId = Integer.parseInt(request.getParameter("id"));  
        System.out.println("userId:"+userId);
        User user=null;
        if (userId==1) {
             user = new User();
        }
       
        log.debug(user.toString());
        model.addAttribute("user", user);  
        return "login";  
    }  
    
    @RequestMapping(value="/login.do",method=RequestMethod.POST) 
    @ResponseBody
    public String login(HttpServletRequest request,Model model,HttpSession session,@RequestParam("pw") String pw, @RequestParam("name") String name){  
        System.out.println("login--------");
        System.out.println("name:"+name+",pw:"+pw);
        User User=UserService.getUserByTel(name, pw);
        if (User != null) {
            System.out.println("USER:{email"+User.getEmail());
            System.out.println("USER:{getPassword"+User.getPassword());
            System.out.println("USER:{getName"+User.getName());
            session.setAttribute("loged", User);
            if(User.getAdmin()>0) {
                return "success";
            }else {
                return "nopermission";
            }
        }else{
            return "faile";
        }
    }
    @RequestMapping(value="/loginSuccess.do")  
    public String loginSuccess(HttpServletRequest request,Model model){  
        System.out.println("main--------");
        return "index";  
    }  
}