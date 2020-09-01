package cn.chich.seller.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.chich.seller.bean.Major;
import cn.chich.seller.dao.MajorDao;
import cn.chich.seller.service.MajorService;
@Service("MajorService")
public class MajorServiceImpl implements MajorService {

	@Resource
	private MajorDao majorDao;
	@Override
	public List<Major> getMajorOpt(int deptId) {
		return majorDao.getMajorOpt(deptId);
	}
	@Override
	public List<Major> getAllMajor() {
		return majorDao.getAllMajor();
	}


}
