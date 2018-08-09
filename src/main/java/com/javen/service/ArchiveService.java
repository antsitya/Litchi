package com.javen.service;
import java.util.List;
import com.javen.model.*;
public interface ArchiveService{
    public List<Archive> findAllPage(int before,int comid);
    public int count(int comid);
    public Archive findseal(int comid,int archiveId);
    public int insertarchive(Archive archive);
}
