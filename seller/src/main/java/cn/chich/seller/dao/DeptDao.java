package cn.chich.seller.dao;

import java.util.List;
import java.util.Map;

import cn.chich.seller.bean.Dept;

public interface DeptDao {


	List<Dept> getAllDept();

	List<Dept> getAllDeptById(int id);

}
