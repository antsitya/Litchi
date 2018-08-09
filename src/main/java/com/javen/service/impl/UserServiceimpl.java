package com.javen.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.javen.dao.UserMapper;
import com.javen.model.User;
import com.javen.service.UserService;
  
  
@Service("userService")  
public class UserServiceimpl implements UserService {  
    @Autowired  
    private UserMapper usermapper;  

//    @Transactional
//    @Override
    public User getUserByTel(String tel,String password) {
        // TODO Auto-generated method stub
        return this.usermapper.selectByTel(tel,password);
    }
    public User isTel(String tel) {
        // TODO Auto-generated method stub
        return this.usermapper.selectTel(tel);
    }
    public String setUserpw(User user) {
        this.usermapper.updateByPrimaryKey(user);
//        System.out.println("upadte******"+x);
        return "OK";
    }
    public int adduser(User user) {
        return this.usermapper.insertSelective(user);
    }
    
    public int edituser(User user) {
        return this.usermapper.updateByPrimaryKeySelective(user);
    }
    public User isreap(int empid,int comid) {
        User x=this.usermapper.isreapt(empid,comid);
        return x;
    }
    public List<User> findAllPage(int before,int comid) {
        // TODO Auto-generated method stub
        return this.usermapper.findAllPage(before,comid);
    }
    public int count(int comid){
        return this.usermapper.count(comid);
    }
    public User finduser(User user) {
        return this.usermapper.selectByPrimaryKey(user);
    }
    public String getusername(int empid,int comid) {
        // TODO Auto-generated method stub
        String name=this.usermapper.getname(empid, comid).getName();
        System.out.println("名称:"+name);
        if(name!=null) {
            return name;
        }else {
            return "error";
        }
       
    }
}  