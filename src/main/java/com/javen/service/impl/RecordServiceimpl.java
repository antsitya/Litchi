package com.javen.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.javen.dao.*;
import com.javen.model.Record;
import com.javen.model.Seal;
import com.javen.service.*;
  
  
@Service("recordService")  
public class RecordServiceimpl implements RecordService {  
    @Autowired  
    private RecordMapper recordmapper;

    public List<Record> findAllPage(int before, int comid) {
        // TODO Auto-generated method stub
        return this.recordmapper.findAllPage(before, comid);
    }

    public int count(int comid) {
        // TODO Auto-generated method stub
        return this.recordmapper.count(comid);
    }

    public Record findrecord(int comid, int recordId) {
        // TODO Auto-generated method stub
        return this.recordmapper.findRecord(comid, recordId);
    }

    public int countdid(int comid, int empid) {
        // TODO Auto-generated method stub
        return this.recordmapper.countdid(comid,empid);
    }

    public int countwill(int comid) {
        // TODO Auto-generated method stub
        return this.recordmapper.countwill(comid,"will");
    }
    public List<Record> findAllPagewill(int before, int comid) {
        // TODO Auto-generated method stub
        return this.recordmapper.findAllPagewill(before, comid,"will");
    }
    public List<Record> findAllPagedid(int before, int comid,int empid) {
        // TODO Auto-generated method stub
        return this.recordmapper.findAllPagedid(before, comid,empid);
    }
    public int updaterecord(Record record) {
        
        
        return this.recordmapper.updateByPrimaryKeySelective(record);
    }

    public Record selectRecord(int id) {
        // TODO Auto-generated method stub
        return this.recordmapper.selectByPrimaryKey(id);
    }

    public int maxid() {
        // TODO Auto-generated method stub
        return this.recordmapper.maxid();
    }

    public int insertRecord(Record record) {
        // TODO Auto-generated method stub
        return this.recordmapper.insertSelective(record);
    }


}  