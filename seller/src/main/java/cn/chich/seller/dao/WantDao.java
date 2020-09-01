package cn.chich.seller.dao;

import java.util.List;

import cn.chich.seller.bean.Goods;
import cn.chich.seller.bean.Want;

public interface WantDao {

	List<Want> wantList();

	Want getWantGoodById(int id);

	int updateWantGoodsStatusById(int id, int status);

	List<Want> selectWantGoods(String wantNo);

	int modifyWantGoodsInfo(Want goods);

	List<Want> getAllWant(int curPage, int pageNum, int userId);

	int getWantSize();

	List<Want> selectWantByWantTitle(int curPage, int pageNum, String wantTitle, int userId);

	List<Want> getWantListByUserId(int userId);

	int addWantUrl(Want want);

	int selectWantNumToday();

	int editWant(Want want);

	List<Want> getAllWantBySchoolId(int curPage, int pageNum, int userId, int schoolId);

	int getWantSizeByWantTitle(String wantTitle, int userId);

}
