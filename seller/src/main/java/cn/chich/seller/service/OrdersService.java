package cn.chich.seller.service;

import java.util.List;

import cn.chich.seller.bean.Orders;

public interface OrdersService {

	List<Orders> ordersList();

	List<Orders> selectOrders(String ordersNo);

	int saveOrder(Orders orders);
	
	int updateOrderStatus(int orderId, int status);

	List<Orders> getUserOrdersList(int userId);

	List<Orders> getUserSaleOrdersList(int userId);
}
