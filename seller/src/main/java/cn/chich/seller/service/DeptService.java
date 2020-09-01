package cn.chich.seller.service;

import java.util.List;
import java.util.Map;

import cn.chich.seller.bean.Dept;

public interface DeptService {

	List<Dept> getAllDept();

	List<Dept> getAllDeptById(int id);

}
