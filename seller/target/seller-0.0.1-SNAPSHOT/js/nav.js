var navs = [{
	"title" : "后台首页",
	"icon" : "icon-computer",
	"href" : "page/main.jsp",
	"spread" : false
}
,{
	"title" : "个人信息管理",
	"icon" : "&#xe613;",
	"href" : "",
	"spread" : false,
	"children" : [
		{
			"title" : "个人资料",
			"icon" : "&#xe60a;",
			"href" : "page/user/userInfo.jsp",
			"spread" : false
		},
		{
			"title" : "修改密码",
			"icon" : "&#xe60a;",
			"href" : "page/user/changePwd.jsp",
			"spread" : false
		}
	]
}
,{
	"title" : "用户信息管理",
	"icon" : "&#xe613;",
	"href" : "page/user/allUsers.jsp",
	"spread" : false
}
,{
	"title" : "商品信息管理",
	"icon" : "&#xe61c;",
	"href" : "",
	"spread" : false,
	"children" : [
		{
			"title" : "商品分类管理",
			"icon" : "&#xe60a;",
			"href" : "page/goods/goodsType.jsp",
			"spread" : false
		},
		{
			"title" : "出售商品管理",
			"icon" : "&#xe60a;",
			"href" : "page/goods/saleGoods.jsp",
			"spread" : false
		},
		{
			"title" : "求购商品管理",
			"icon" : "&#xe60a;",
			"href" : "page/goods/wantGoods.jsp",
			"spread" : false
		}
	]
}
,{
	"title" : "违规投诉管理",
	"icon" : "icon-text",
	"href" : "page/report/report.jsp",
	"spread" : false
}
,{
	"title" : "订单管理",
	"icon" : "icon-text",
	"href" : "page/orders/orders.jsp",
	"spread" : false
}
]