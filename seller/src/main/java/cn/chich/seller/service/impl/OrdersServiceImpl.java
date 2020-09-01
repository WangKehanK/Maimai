package cn.chich.seller.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.chich.seller.bean.Orders;
import cn.chich.seller.dao.GoodsDao;
import cn.chich.seller.dao.OrdersDao;
import cn.chich.seller.service.OrdersService;
@Service("OrdersService")
public class OrdersServiceImpl implements OrdersService {
	@Resource
	private OrdersDao ordersDao;
	@Override
	public List<Orders> ordersList() {
		return ordersDao.ordersList();
	}
	@Override
	public List<Orders> selectOrders(String ordersNo) {
		return ordersDao.selectOrders(ordersNo);
	}
	
	@Override
	public int saveOrder(Orders orders) {
		return ordersDao.saveOrder(orders);
	}
	
	@Override
	public int updateOrderStatus(int orderId,int status) {
		return ordersDao.updateOrderStatus(orderId,status);
	}
	@Override
	public List<Orders> getUserOrdersList(int userId) {
		return ordersDao.getUserOrdersList(userId);
	}
	@Override
	public List<Orders> getUserSaleOrdersList(int userId) {
		return ordersDao.getUserSaleOrdersList(userId);
	}
}
