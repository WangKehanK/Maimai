package cn.chich.seller.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.chich.seller.dao.BaseCodeDao;
import cn.chich.seller.service.BaseCodeService;

@Service("BaseCodeService")
public class BaseCodeServiceImpl implements BaseCodeService {
	@Resource
	private BaseCodeDao baseCodeDao;
	
	@Override
	public List<Map<String, Object>> getBaseCodeOpt(String typeNo) {
		return baseCodeDao.getBaseCodeOpt(typeNo);
	}

}
