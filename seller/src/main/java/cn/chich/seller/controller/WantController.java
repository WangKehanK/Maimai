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
import cn.chich.seller.bean.Want;
import cn.chich.seller.service.WantService;

@Controller
public class WantController {
	@Resource
    private WantService wantService;
    @RequestMapping("wantList")
    @ResponseBody
    public List<Want> wantList(){
    	List<Want> list = new ArrayList<Want>();
    	list=wantService.wantList();
		return list;
    }
    @RequestMapping("getWantGoodById")
    public String getWantGoodById(HttpServletRequest request,String id){
    	if(id!=null) {
    		Want goods =wantService.getWantGoodById(Integer.parseInt(id));
    		request.setAttribute("goods", goods);
    	}
    	return "/page/goods/editWantGoods";
    }
    @RequestMapping("updateWantGoodsStatusById")
    @ResponseBody
    public Map updateWantGoodsStatusById(int id,int status){
    	Map<String, Object> map=new HashMap<String,Object>();
    	int i =wantService.updateWantGoodsStatusById(id,status);
    	if(i>0)
			map.put("success", true);
		else
			map.put("success", false);
		return map;
    }
    @RequestMapping("selectWantGoods")
    @ResponseBody
    public List<Want> selectWantGoods(String wantNo){
    	List<Want> list =wantService.selectWantGoods(wantNo);
    	return list;
    }
    @RequestMapping("modifyWantGoodsInfo")
    @ResponseBody
    public Map modifyWantInfo(Want goods){
    	Map<String, Object> map=new HashMap<String,Object>();
    	int i=wantService.modifyWantGoodsInfo(goods);
    	if(i>0){
    		map.put("success", true);
 		}else {
 			map.put("success", false);
 		}
		return map;
    }
}
