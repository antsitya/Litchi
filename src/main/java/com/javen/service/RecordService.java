package com.javen.service;
import java.util.List;
import com.javen.model.*;;
public interface RecordService{
    public List<Record> findAllPage(int before,int comid);
    public List<Record> findAllPagewill(int before,int comid);
    public List<Record> findAllPagedid(int before,int comid,int empid);
    public int count(int comid);
    public int countdid(int comid,int empid);
    public int countwill(int comid);
    public Record findrecord(int comid,int recordId);
    public int updaterecord(Record record);
    public Record selectRecord(int id);
    public int maxid();
    public int insertRecord(Record record);
}
