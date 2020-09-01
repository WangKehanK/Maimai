package cn.chich.seller.service;

import java.util.List;

import cn.chich.seller.bean.GoodsType;

public interface GoodsTypeService {

	List<GoodsType> goodsTypeList();

	int delGoodsTypeById(int id);

	int addGoodsType(String typeName);

	List<GoodsType> selectGoodsType(String typeName);

}
