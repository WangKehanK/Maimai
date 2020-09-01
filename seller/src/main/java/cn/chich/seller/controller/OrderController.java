package cn.chich.seller.controller;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.chich.seller.bean.Orders;
import cn.chich.seller.service.OrdersService;

@Controller
public class OrderController {
	@Resource
    private OrdersService ordersService;
    @RequestMapping("ordersList")
    @ResponseBody
    public List<Orders> ordersList(){
    	List<Orders> list = new ArrayList<Orders>();
    	list=ordersService.ordersList();
		return list;
    }
    @RequestMapping("selectOrders")
    @ResponseBody
    public List<Orders> selectOrders(String ordersNo){
    	List<Orders> list = ordersService.selectOrders(ordersNo);
    	return list;
    }
}
