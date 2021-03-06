package com.javen.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.javen.model.Archive;
import com.javen.model.Seal;

public interface ArchiveMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table archive
     *
     * @mbggenerated Sun Jul 22 11:59:21 CST 2018
     */
    int deleteByPrimaryKey(Integer archiveId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table archive
     *
     * @mbggenerated Sun Jul 22 11:59:21 CST 2018
     */
    int insert(Archive record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table archive
     *
     * @mbggenerated Sun Jul 22 11:59:21 CST 2018
     */
    int insertSelective(Archive record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table archive
     *
     * @mbggenerated Sun Jul 22 11:59:21 CST 2018
     */
    Archive selectByPrimaryKey(Integer archiveId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table archive
     *
     * @mbggenerated Sun Jul 22 11:59:21 CST 2018
     */
    int updateByPrimaryKeySelective(Archive record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table archive
     *
     * @mbggenerated Sun Jul 22 11:59:21 CST 2018
     */
    int updateByPrimaryKey(Archive record);
    int count(@Param("comid") int comid);
    List<Archive> findAllPage(@Param("before") int before,@Param("comid") int comid);
    Archive findArchive(@Param("comid") int comid,@Param("archiveid") int ArchiveId);
}