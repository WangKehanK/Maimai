package cn.chich.seller.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.chich.seller.bean.GoodsType;
import cn.chich.seller.dao.GoodsTypeDao;
import cn.chich.seller.service.GoodsTypeService;

@Service("GoodsTypeService")
public class GoodsTypeServiceImpl implements GoodsTypeService{
	@Resource
	private GoodsTypeDao goodsTypeDao;
	@Override
	public List<GoodsType> goodsTypeList() {
		return goodsTypeDao.goodsTypeList();
	}
	@Override
	public int delGoodsTypeById(int id) {
		return goodsTypeDao.delGoodsTypeById(id);
	}
	@Override
	public int addGoodsType(String typeName) {
		return goodsTypeDao.addGoodsType(typeName);
	}
	@Override
	public List<GoodsType> selectGoodsType(String typeName) {
		return goodsTypeDao.selectGoodsType(typeName);
	}

}
