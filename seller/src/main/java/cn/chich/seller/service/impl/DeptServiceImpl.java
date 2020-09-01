package cn.chich.seller.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.chich.seller.bean.Dept;
import cn.chich.seller.dao.DeptDao;
import cn.chich.seller.service.DeptService;
@Service("DeptService")
public class DeptServiceImpl implements DeptService {
	@Resource
	private DeptDao deptDao;
	@Override
	public List<Dept> getAllDept() {
		return deptDao.getAllDept();
	}
	@Override
	public List<Dept> getAllDeptById(int id) {
		return deptDao.getAllDeptById(id);
	}

}
