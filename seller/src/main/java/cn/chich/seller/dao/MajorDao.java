package cn.chich.seller.dao;

import java.util.List;
import java.util.Map;

import cn.chich.seller.bean.Major;

public interface MajorDao {

	List<Major> getMajorOpt(int deptId);

	List<Major> getAllMajor();

}
