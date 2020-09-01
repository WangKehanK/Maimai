package cn.chich.seller.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.chich.seller.bean.Goods;
import cn.chich.seller.dao.GoodsDao;
import cn.chich.seller.service.GoodsService;

@Service("GoodsService")
public class GoodsServiceImpl implements GoodsService {
	@Resource
	private GoodsDao goodsDao;
	@Override
	public List<Goods> goodsList() {
		return goodsDao.goodsList();
	}
	@Override
	public List<Goods> selectGoods(String goodsNo) {
		return goodsDao.selectGoods(goodsNo);
	}
	@Override
	public Goods getGoodById(int id) {
		return goodsDao.getGoodById(id);
	}
	@Override
	public int updateGoodsStatusById(int id, int status) {
		return goodsDao.updateGoodsStatusById(id,status);
	}
	@Override
	public int modifyGoodsInfo(Goods goods) {
		return goodsDao.modifyGoodsInfo(goods);
	}
	@Override
	public List<Goods> selectVioGoodsById(int id) {
		return goodsDao.selectVioGoodsById(id);
	}
	@Override
	public int getGoodsSize(int userId) {
		return goodsDao.getGoodsSize(userId);
	}
	@Override
	public List<Goods> getAllGoodsUrl(int curPage, int pageNum,int userId) {
		return goodsDao.getAllGoodsUrl(curPage,pageNum,userId);
	}
	@Override
	public List<Goods> selectGoodsByGoodsTitle(int curPage, int pageNum,String goodsTitle,int userId) {
		return goodsDao.selectGoodsByGoodsTitle(curPage,pageNum,goodsTitle,userId);
	}
	@Override
	public int addGoodUrl(Goods goods) {
		return goodsDao.addGoodUrl(goods);
	}
	@Override
	public int selectGoodsNumToday() {
		return goodsDao.selectGoodsNumToday();
	}
	@Override
	public int getGoodsSizeByGoodsTitle(String goodsTitle,int userId) {
		return goodsDao.getGoodsSizeByGoodsTitle(goodsTitle,userId);
	}
	@Override
	public List<Goods> getGoodTypeList(int curPage, int pageNum,int goodsType,int userId) {
		return goodsDao.getGoodTypeList(curPage,pageNum,goodsType,userId);
	}
	@Override
	public int getGoodsSizeByGoodsType(int goodsType,int userId) {
		return goodsDao.getGoodsSizeByGoodsType(goodsType,userId);
	}
	@Override
	public List<Goods> getGoodsListByUserId(int userId) {
		return goodsDao.getGoodsListByUserId(userId);
	}
	@Override
	public int editGood(Goods goods) {
		return goodsDao.editGood(goods);
	}
	@Override
	public List<Goods> getAllGoodsBySchoolId(int curPage, int pageNum, int userId, int schoolId) {
		return goodsDao.getAllGoodsBySchoolId(curPage,pageNum,userId,schoolId);
	}

}
