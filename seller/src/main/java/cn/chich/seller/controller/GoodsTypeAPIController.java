package cn.chich.seller.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.chich.seller.bean.GoodsType;
import cn.chich.seller.service.GoodsTypeService;
@RequestMapping("/wx/GoodsType")
@Controller
public class GoodsTypeAPIController {
	@Resource
    private GoodsTypeService goodsTypeService;
    @RequestMapping("goodsTypeList")
    @ResponseBody
    public List<GoodsType> goodsTypeList(){
    	List<GoodsType> list = new ArrayList<GoodsType>();
    	list=goodsTypeService.goodsTypeList();
		return list;
    }
    @RequestMapping("selectGoodsType")
    @ResponseBody
    public List<GoodsType> selectGoodsType(String typeName){
    	List<GoodsType> goodsTypeList=goodsTypeService.selectGoodsType(typeName);
    	return goodsTypeList;
    }

}
