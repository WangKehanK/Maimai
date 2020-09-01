package cn.chich.seller.service;

import java.util.List;

import cn.chich.seller.bean.Goods;
import cn.chich.seller.bean.Want;

public interface WantService {

	List<Want> wantList();

	int modifyWantGoodsInfo(Want goods);

	List<Want> selectWantGoods(String wantNo);

	int updateWantGoodsStatusById(int id, int status);

	Want getWantGoodById(int id);

	int getWantSize();

	List<Want> getAllWant(int curPage, int pageNum, int userId);

	List<Want> selectWantByWantTitle(int curPage, int pageNum, String wantTitle, int userId);

	List<Want> getWantListByUserId(int userId);

	int addWantUrl(Want want);

	int selectWantNumToday();

	int editWant(Want want);

	List<Want> getAllWantBySchoolId(int curPage, int pageNum, int userId, int schoolId);

	int getWantSizeByWantTitle(String wantTitle, int userId);

}
