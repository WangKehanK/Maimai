package cn.chich.seller.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.chich.seller.bean.Collect;
import cn.chich.seller.dao.CollectDao;
import cn.chich.seller.service.CollectService;

@Service("CollectService")
public class CollectServiceImpl implements CollectService {
	@Resource
	private CollectDao collectDao;
	@Override
	public List<Collect> getCollectList(int userId) {
		return collectDao.getCollectList(userId);
	}
	
	@Override
	public int addUserCollect(Collect collect) {
		return collectDao.addUserCollect(collect);
	}
	
	@Override
	public int deleteUserCollect(int id) {
		return collectDao.deleteUserCollect(id);
	}

	@Override
	public Collect isCollect(int id, int userId, String goodsType) {
		return collectDao.isCollect(id,userId,goodsType);
	}

	@Override
	public List<Collect> getCollectWantList(int userId) {
		return collectDao.getCollectWantList(userId);
	}
}
