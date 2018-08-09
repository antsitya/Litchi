package com.javen.service;
import java.util.List;
import com.javen.model.Seal;
public interface SealService{
    public List<Seal> findAllPage(int before,int comid);
    public int count(int comid);
    public Seal findseal(int comid,int sealid);
}
