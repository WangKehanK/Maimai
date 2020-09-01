package cn.chich.seller.controller;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.chich.seller.bean.Collect;
import cn.chich.seller.bean.Goods;
import cn.chich.seller.bean.Want;
import cn.chich.seller.service.CollectService;
import cn.chich.seller.service.WantService;
@RequestMapping("/wx/Want")
@Controller
public class WantAPIController {
	@Resource
    private WantService wantService;
	@Resource
    private CollectService collectService;
    @RequestMapping("getAllWantUrl")
    @ResponseBody
    public List<Want> getAllWant(int curPage,int pageNum,int userId,int schoolId){
    	int totalRecords=wantService.getWantSize();
    	List<Want> list = new ArrayList<Want>();
    	if((totalRecords-curPage*pageNum)>=0) {
    		if(schoolId==0) {
    			list=wantService.getAllWant((curPage-1)*pageNum,pageNum,userId);
    		}else {
    			list=wantService.getAllWantBySchoolId((curPage-1)*pageNum,pageNum,userId,schoolId);
    		}
    	}else{
    		if(schoolId==0) {
    			list=wantService.getAllWant((curPage-1)*pageNum,totalRecords-(curPage-1)*pageNum,userId);
    		}else {
    			list=wantService.getAllWantBySchoolId((curPage-1)*pageNum,totalRecords-(curPage-1)*pageNum,userId,schoolId);
    		}
    	}
		return list;
    }
    @RequestMapping("selectWantByWantTitle")
    @ResponseBody
    public List<Want> selectWantByWantTitle(int userId,int curPage,int pageNum,String goodsTitle){
    	int totalRecords=wantService.getWantSizeByWantTitle(goodsTitle,userId);
    	List<Want> list = new ArrayList<Want>();
    	if((totalRecords-curPage*pageNum)>=0) {
    		list=wantService.selectWantByWantTitle((curPage-1)*pageNum,pageNum,goodsTitle,userId);
    	}else{
    		list=wantService.selectWantByWantTitle((curPage-1)*pageNum,totalRecords-(curPage-1)*pageNum,goodsTitle,userId);
    	}
    	return list;
    }
    @RequestMapping("getWantDetail")
    @ResponseBody
    public Map getWantDetail(int id,int userId,String wantType){
    	Map<String, Object> map=new HashMap<String,Object>();
    	Want want =wantService.getWantGoodById(id);
    	Collect collect=collectService.isCollect(id,userId,wantType);
    	if(collect!=null) {
    		map.put("collectId", collect.getId());
    	}else {
    		map.put("collectId", 0);
    	}
		map.put("code", 1);
		map.put("data",want);
    	return map;
    }
    @RequestMapping("getWantListByUserId")
    @ResponseBody
    public List<Want> getWantListByUserId(int userId){
    	List<Want> list = wantService.getWantListByUserId(userId);
    	return list;
    }
    @RequestMapping("addWantUrl")
    @ResponseBody
    public Map addWantUrl(Want want){
    	Map<String, Object> map=new HashMap<String,Object>();
    	int num=wantService.selectWantNumToday()+1;
    	String goodsNo="QG"+GoodsAPIController.dates()+new DecimalFormat("0000").format(num);
    	want.setGoodsNo(goodsNo);
    	int i =wantService.addWantUrl(want);
    	if(i>0){
    		map.put("code", 1);
    		map.put("msg", "商品求购发布成功");
    	}else {
    		map.put("code", 1);
    		map.put("msg", "请重新发布");
    	}
		return map;
    }
    @RequestMapping("updateWantStatus")
    @ResponseBody
    public Map updateWantStatus(int id,String operate){
    	int status=0;
    	String msg="";
    	if("shangjia".equals(operate)) {
    		status=1031;
    		msg="商品上架成功";
    	}else if("xiajia".equals(operate)) {
    		msg="商品下架成功";
    		status=1030;
    	}else if ("del".equals(operate)) {
    		msg="商品删除成功";
    		status=1032;
		}
    	Map<String, Object> map=new HashMap<String,Object>();
    	int i =wantService.updateWantGoodsStatusById(id,status);
    	map.put("msg", msg);
    	return map;
    }
    @RequestMapping("editWant")
    @ResponseBody
    public Map editWant(Want want){
    	Map<String, Object> map=new HashMap<String,Object>();
    	int i =wantService.editWant(want);
    	if(i>0){
    		map.put("code", 1);
    		map.put("msg", "商品修改成功");
    	}else {
    		map.put("code", 1);
    		map.put("msg", "请重新提交");
    	}
    	return map;
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
