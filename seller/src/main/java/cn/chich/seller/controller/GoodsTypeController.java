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

@Controller
public class GoodsTypeController {
	@Resource
    private GoodsTypeService goodsTypeService;
    @RequestMapping("goodsTypeList")
    @ResponseBody
    public List<GoodsType> goodsTypeList(){
    	List<GoodsType> list = new ArrayList<GoodsType>();
    	list=goodsTypeService.goodsTypeList();
		return list;
    }
    
    @RequestMapping("delGoodsTypeById")
    @ResponseBody
    public Map delGoodsTypeById(int id){
    	Map<String, Object> map=new HashMap<String,Object>();
    	int i=goodsTypeService.delGoodsTypeById(id);
    	if(i>0)
			map.put("success", true);
		else
			map.put("success", false);
		return map;
    }
    @RequestMapping("addGoodsType")
    @ResponseBody
    public Map addGoodsType(String typeName){
    	Map<String, Object> map=new HashMap<String,Object>();
    	int i=goodsTypeService.addGoodsType(typeName);
    	if(i>0)
    		map.put("success", true);
    	else
    		map.put("success", false);
    	return map;
    }
    @RequestMapping("selectGoodsType")
    @ResponseBody
    public List<GoodsType> selectGoodsType(String typeName){
    	List<GoodsType> goodsTypeList=goodsTypeService.selectGoodsType(typeName);
    	return goodsTypeList;
    }

}
