package cn.chich.seller.dao;

import java.util.List;
import java.util.Map;

import cn.chich.seller.bean.Collect;

public interface CollectDao {

	List<Collect> getCollectList(int userId);

	int addUserCollect(Collect collect);

	int deleteUserCollect(int id);

	Collect isCollect(int id, int userId, String goodsType);

	List<Collect> getCollectWantList(int userId);

}
