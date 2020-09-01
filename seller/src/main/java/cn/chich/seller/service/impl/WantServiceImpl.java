package cn.chich.seller.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.chich.seller.bean.Goods;
import cn.chich.seller.bean.Want;
import cn.chich.seller.dao.WantDao;
import cn.chich.seller.service.WantService;

@Service("WantService")
public class WantServiceImpl implements WantService {
	@Resource
	private WantDao wantDao;
	@Override
	public List<Want> wantList() {
		return wantDao.wantList();
	}
	@Override
	public int modifyWantGoodsInfo(Want goods) {
		return wantDao.modifyWantGoodsInfo(goods);
	}
	@Override
	public List<Want> selectWantGoods(String wantNo) {
		return wantDao.selectWantGoods(wantNo);
	}
	@Override
	public int updateWantGoodsStatusById(int id, int status) {
		return wantDao.updateWantGoodsStatusById(id,status);
	}
	@Override
	public Want getWantGoodById(int id) {
		return wantDao.getWantGoodById(id);
	}
	@Override
	public int getWantSize() {
		return wantDao.getWantSize();
	}
	@Override
	public List<Want> getAllWant(int curPage, int pageNum,int userId) {
		return wantDao.getAllWant(curPage,pageNum,userId);
	}
	@Override
	public List<Want> getWantListByUserId(int userId) {
		return wantDao.getWantListByUserId(userId);
	}
	@Override
	public int addWantUrl(Want want) {
		return wantDao.addWantUrl(want);
	}
	@Override
	public int selectWantNumToday() {
		return wantDao.selectWantNumToday();
	}
	@Override
	public int editWant(Want want) {
		return wantDao.editWant(want);
	}
	@Override
	public List<Want> getAllWantBySchoolId(int curPage, int pageNum, int userId, int schoolId) {
		return wantDao.getAllWantBySchoolId(curPage,pageNum,userId,schoolId);
	}
	@Override
	public List<Want> selectWantByWantTitle(int curPage, int pageNum, String wantTitle, int userId) {
		return wantDao.selectWantByWantTitle(curPage,pageNum,wantTitle,userId);
	}
	@Override
	public int getWantSizeByWantTitle(String wantTitle, int userId) {
		return wantDao.getWantSizeByWantTitle(wantTitle, userId);
	}

}
