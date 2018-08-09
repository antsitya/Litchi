package com.javen.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.javen.service.VerityService;
import com.javen.dao.*;
  
  
@Service("verityService")  
public class VerityServiceimpl implements VerityService {  
    @Autowired  
    private RecordMapper recordmapper;  

//    public int count(int comid){
//        return this.recordmapper.count(comid);
//    }
//    public List<Seal> findAllPage(int before, int comid) {
//        return this.sealmapper.findAllPage(before, comid);
//    }
//    public Seal findseal(int comid, int sealid) {
//        return this.sealmapper.findseal(comid, sealid);
//    }
}  