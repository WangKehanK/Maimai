package cn.chich.seller.service;

import java.util.List;
import java.util.Map;

import cn.chich.seller.bean.Goods;

public interface GoodsService {

	List<Goods> goodsList();

	List<Goods> selectGoods(String goodsNo);

	Goods getGoodById(int id);

	int updateGoodsStatusById(int id, int status);

	int modifyGoodsInfo(Goods goods);

	List<Goods> selectVioGoodsById(int id);

	int getGoodsSize(int userId);

	List<Goods> getAllGoodsUrl(int curPage, int pageNum, int userId);

	List<Goods> selectGoodsByGoodsTitle(int curPage, int pageNum, String goodsTitle, int userId);

	int addGoodUrl(Goods goods);

	int selectGoodsNumToday();

	int getGoodsSizeByGoodsTitle(String goodsTitle, int userId);

	List<Goods> getGoodTypeList(int curPage, int pageNum, int goodsType, int userId);

	int getGoodsSizeByGoodsType(int goodsType, int userId);

	List<Goods> getGoodsListByUserId(int userId);

	int editGood(Goods goods);

	List<Goods> getAllGoodsBySchoolId(int curPage, int pageNum, int userId, int schoolId);

}
