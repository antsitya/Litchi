package com.javen.service;
import java.util.List;

import com.baomidou.mybatisplus.service.IService;
import com.javen.model.User;
public interface UserService{
    public User getUserByTel(String tel,String password);
    public User isTel(String tel);
    public User finduser(User user);
    public String setUserpw(User user);
    public int adduser(User user);
    public int edituser(User user);
    public User isreap(int empid,int comid);
    public List<User> findAllPage(int before,int comid);
    public int count(int comid);
    public String getusername(int empid,int comid);
}
