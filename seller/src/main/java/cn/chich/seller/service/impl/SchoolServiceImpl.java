package cn.chich.seller.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.chich.seller.bean.School;
import cn.chich.seller.dao.SchoolDao;
import cn.chich.seller.service.SchoolService;

@Service("SchoolService")
public class SchoolServiceImpl implements SchoolService{
	@Resource
	private SchoolDao schoolDao;

	@Override
	public List<School> getAllSchool() {
		return schoolDao.getAllSchool();
	}


}
