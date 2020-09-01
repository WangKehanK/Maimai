package cn.chich.seller.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.chich.seller.bean.Orders;
import cn.chich.seller.bean.User;
import cn.chich.seller.service.GoodsService;
import cn.chich.seller.service.OrdersService;
@RequestMapping("/wx/Orders")
@Controller
public class OrderAPIController {
	@Resource
    private GoodsService goodsService;
	@Resource
    private OrdersService ordersService;
    @RequestMapping("getUserOrdersList")
    @ResponseBody
    public List<Orders> getUserOrdersList(int userId){
    	List<Orders> list = ordersService.getUserOrdersList(userId);
		return list;
    }
    
    @RequestMapping("getUserSaleOrdersList")
    @ResponseBody
    public List<Orders> getUserSaleOrdersList(int userId){
    	List<Orders> list = ordersService.getUserSaleOrdersList(userId);
    	return list;
    }
    
    @RequestMapping("selectOrders")
    @ResponseBody
    public List<Orders> selectOrders(String ordersNo){
    	List<Orders> list = ordersService.selectOrders(ordersNo);
    	return list;
    }
    
    @RequestMapping("saveOrders")
    @ResponseBody
    public  Map<String, Object> saveOrders(Orders orders){
    	Map<String, Object> map=new HashMap<String,Object>();
    	String no = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) ;
	    orders.setOrdersNo(no);
	    orders.setCreateTime(new Date());
	    orders.setStatus(1001);
		int i=ordersService.saveOrder(orders);
		int goodsStatus=1022;//已出售
    	goodsService.updateGoodsStatusById(orders.getGoodsId(), goodsStatus);
        map.put("code", i);
        map.put("ordersId", orders.getId());
	    return map;
    }
    
    @RequestMapping("updateOrderStatus")
    @ResponseBody
    public Map<String, Object> updateOrderStatus(int orderId,int status){
    	Map<String, Object> map=new HashMap<String,Object>();
		int i=ordersService.updateOrderStatus(orderId,status);
		if(i>0) {
           map.put("code", 1);
		}else {
    	   map.put("code", 0);
		}
	    return map;
    }
    @RequestMapping("transComp")
    @ResponseBody
    public Map<String, Object> transComp(int orderId,int goodsId,String flag){
    	Map<String, Object> map=new HashMap<String,Object>();
    	int orderStatus=0;
    	int goodsStatus=0;
    	if("transComp".equals(flag)) {
    		orderStatus=1002;//已完成
    		goodsStatus=1022;//已出售
    	}else if("transCancel".equals(flag)){
    		orderStatus=1004;//已取消
    		goodsStatus=1020;//在售
    	}
    	
    	int i=ordersService.updateOrderStatus(orderId,orderStatus);
    	int j=goodsService.updateGoodsStatusById(goodsId, goodsStatus);
    	if(i>0) {
    		map.put("code", 1);
    	}else {
    		map.put("code", 0);
    	}
    	return map;
    }
}
