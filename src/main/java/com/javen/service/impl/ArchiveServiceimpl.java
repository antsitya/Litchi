package com.javen.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.javen.model.*;
import com.javen.service.*;
import com.javen.dao.*;
  
  
@Service("archiveService")  
public class ArchiveServiceimpl implements ArchiveService {  
    @Autowired  
    private ArchiveMapper archivemapper;  

    public int count(int comid){
        return this.archivemapper.count(comid);
    }
    public List<Archive> findAllPage(int before, int comid) {
        return this.archivemapper.findAllPage(before, comid);
    }
    public Archive findseal(int comid, int ArchiveId) {
        return this.archivemapper.findArchive(comid, ArchiveId);
    }
    public int insertarchive(Archive archive) {
        // TODO Auto-generated method stub
        return archivemapper.insertSelective(archive);
    }
}  