package cn.chich.seller.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.chich.seller.bean.Goods;
import cn.chich.seller.bean.User;
import cn.chich.seller.service.GoodsService;

@Controller
public class GoodsController {
	@Resource
    private GoodsService goodsService;
    @RequestMapping("goodsList")
    @ResponseBody
    public List<Goods> goodsList(){
    	List<Goods> list = new ArrayList<Goods>();
    	list=goodsService.goodsList();
		return list;
    }
    @RequestMapping("getGoodById")
    public String getGoodById(HttpServletRequest request,String id){
    	if(id!=null) {
    		Goods goods =goodsService.getGoodById(Integer.parseInt(id));
    		request.setAttribute("goods", goods);
    	}
    	return "/page/goods/editGoods";
    }
    @RequestMapping("selectVioGoodsById")
    @ResponseBody
    public List<Goods> selectVioGoodsById(String id){
    	List<Goods> list = goodsService.selectVioGoodsById(Integer.parseInt(id));
    	return list;
    }
    @RequestMapping("updateGoodsStatusById")
    @ResponseBody
    public Map updateGoodsStatusById(int id,int status){
    	Map<String, Object> map=new HashMap<String,Object>();
    	int i =goodsService.updateGoodsStatusById(id,status);
    	if(i>0)
			map.put("success", true);
		else
			map.put("success", false);
		return map;
    }
    @RequestMapping("selectGoods")
    @ResponseBody
    public List<Goods> selectGoods(String goodsNo){
    	List<Goods> list =goodsService.selectGoods(goodsNo);
    	return list;
    }
    @RequestMapping("modifyGoodsInfo")
    @ResponseBody
    public Map modifyGoodsInfo(Goods goods){
    	Map<String, Object> map=new HashMap<String,Object>();
    	int i=goodsService.modifyGoodsInfo(goods);
    	if(i>0){
    		map.put("success", true);
 		}else {
 			map.put("success", false);
 		}
		return map;
    }
}
