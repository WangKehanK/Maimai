package cn.chich.seller.controller;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.chich.seller.bean.Collect;
import cn.chich.seller.bean.Goods;
import cn.chich.seller.bean.User;
import cn.chich.seller.service.CollectService;
import cn.chich.seller.service.GoodsService;
@RequestMapping("/wx/Goods")
@Controller
public class GoodsAPIController {
	@Resource
    private GoodsService goodsService;
	@Resource
    private CollectService collectService;
    @RequestMapping("getAllGoodsUrl")
    @ResponseBody
    public List<Goods> getAllGoodsUrl(int curPage,int pageNum,int userId,int schoolId){
    	List<Goods> list = new ArrayList<Goods>();
    		if(schoolId==0){//全部
    			list=goodsService.getAllGoodsUrl((curPage-1)*pageNum,pageNum,userId);
    		}else {
    			list=goodsService.getAllGoodsBySchoolId((curPage-1)*pageNum,pageNum,userId,schoolId);
    		}
    	
		return list;
    }
    @RequestMapping("getGoodTypeList")
    @ResponseBody
    public List<Goods> getGoodTypeList(int goodsType,int curPage,int pageNum,int userId){
    	List<Goods> list = new ArrayList<Goods>();
    		list=goodsService.getGoodTypeList((curPage-1)*pageNum,pageNum,goodsType,userId);
    	return list;
    }
    @RequestMapping("getGoodsListByUserId")
    @ResponseBody
    public List<Goods> getGoodsListByUserId(int userId){
    	List<Goods> list = goodsService.getGoodsListByUserId(userId);
    	return list;
    }
    @RequestMapping("selectGoodsByGoodsTitle")
    @ResponseBody
    public List<Goods> selectGoodsByGoodsTitle(int userId,int curPage,int pageNum,String goodsTitle){
    	List<Goods> list = new ArrayList<Goods>();
    		list=goodsService.selectGoodsByGoodsTitle((curPage-1)*pageNum,pageNum,goodsTitle,userId);
    	return list;
    }
    //获取当前日期时间的string类型
    public static String dates(){
         Date currentTime = new Date();
         SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
         String dateString = formatter.format(currentTime);
         return dateString;
    }
    @RequestMapping("addGoodUrl")
    @ResponseBody
    public Map addGoodUrl(Goods goods){
    	Map<String, Object> map=new HashMap<String,Object>();
    	int num=goodsService.selectGoodsNumToday()+1;//今日发布的商品数+1
    	String goodsNo="SP"+dates()+new DecimalFormat("0000").format(num);
    	goods.setGoodsNo(goodsNo);
    	int i =goodsService.addGoodUrl(goods);
    	if(i>0){
    		map.put("code", 1);
    		map.put("msg", "商品发布成功");
    	}else {
    		map.put("code", 0);
    		map.put("msg", "请重新发布");
    	}
		return map;
    }
    @RequestMapping("editGood")
    @ResponseBody
    public Map editGood(Goods goods){
    	Map<String, Object> map=new HashMap<String,Object>();
    	int i =goodsService.editGood(goods);
    	if(i>0){
    		map.put("code", 1);
    		map.put("msg", "商品修改成功");
    	}else {
    		map.put("code", 1);
    		map.put("msg", "请重新提交");
    	}
    	return map;
    }
    @RequestMapping("getGoodDetail")
    @ResponseBody
    public Map getGoodDetail(int id,int userId,String goodsType){
    	Map<String, Object> map=new HashMap<String,Object>();
    	Goods goods =goodsService.getGoodById(id);
    	Collect collect=collectService.isCollect(id,userId,goodsType);
    	if(collect!=null) {
    		map.put("collectId", collect.getId());
    	}else {
    		map.put("collectId", 0);	
    	}
		map.put("code", 1);
		map.put("data",goods);
    	return map;
    }
    @RequestMapping("updateGoodStatus")
    @ResponseBody
    public Map updateGoodStatus(int id,String operate){
    	int status=0;
    	String msg="";
    	if("shangjia".equals(operate)) {
    		status=1020;
    		msg="商品上架成功";
    	}else if("xiajia".equals(operate)) {
    		msg="商品下架成功";
    		status=1021;
    	}else if ("del".equals(operate)) {
    		msg="商品删除成功";
    		status=1023;
		}
    	Map<String, Object> map=new HashMap<String,Object>();
    	int i =goodsService.updateGoodsStatusById(id,status);
    	map.put("msg", msg);
    	return map;
    }
}
