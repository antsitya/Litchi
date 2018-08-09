package com.javen.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.javen.dao.UserMapper;
import com.javen.model.Seal;
import com.javen.model.User;
import com.javen.service.SealService;
//import com.javen.model.User;
import com.javen.service.UserService;
import com.javen.dao.*;
  
  
@Service("sealService")  
public class SealServiceimpl implements SealService {  
    @Autowired  
    private SealMapper sealmapper;  

//    @Transactional
//    @Override
    public int count(int comid){
        return this.sealmapper.count(comid);
    }
    public List<Seal> findAllPage(int before, int comid) {
        // TODO Auto-generated method stub
        return this.sealmapper.findAllPage(before, comid);
    }
//    public Seal findseal(Seal seal) {
//        return this.sealmapper.selectByPrimaryKey(seal);
//    }
    public Seal findseal(int comid, int sealid) {
        // TODO Auto-generated method stub
        return this.sealmapper.findseal(comid, sealid);
    }
}  