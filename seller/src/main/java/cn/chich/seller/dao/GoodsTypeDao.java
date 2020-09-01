package cn.chich.seller.dao;

import java.util.List;

import cn.chich.seller.bean.GoodsType;

public interface GoodsTypeDao {

	List<GoodsType> goodsTypeList();

	int delGoodsTypeById(int id);

	int addGoodsType(String typeName);

	List<GoodsType> selectGoodsType(String typeName);

}
