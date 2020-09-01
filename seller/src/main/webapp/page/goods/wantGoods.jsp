<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>城建优品--出售商品</title>
	<meta name="renderer" content="webkit">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="format-detection" content="telephone=no">
	<link rel="stylesheet" href="<%=basePath%>layui/css/layui.css" media="all" />
	<link rel="stylesheet" href="<%=basePath%>css/font_eolqem241z66flxr.css" media="all" />
</head>
<body class="childrenBody">
	<blockquote class="layui-elem-quote news_search">
		<div class="layui-inline">
		    <div class="layui-input-inline">
		    	<input type="text" value="" placeholder="请输入商品编号" class="layui-input search_input">
		    </div>
		    <a class="layui-btn search_btn">查询</a>
		</div>
	</blockquote>
	<div class="layui-form news_list">
	  	<table class="layui-table">
		    <colgroup>
				<col width="10%">
				<col width="6%">
				<col width="6%">
				<col width="10%">
				<col width="7%">
				<col width="7%">
				<col width="6%">
				<col width="10%">
				<col width="10%">
		    </colgroup>
		    <thead>
				<tr>
					<th>商品编号</th>
					<th>求购用户</th>
					<th>商品类型</th>
					<th>商品名</th>
					<th>最高价格(元)</th>
					<th>最低价格(元)</th>
					<th>求购状态</th>
					<th>发布时间</th>
					<th>操作</th>
				</tr> 
		    </thead>
		    <tbody class="goods_content"></tbody>
		</table>
	</div>
	<div id="page" style=" text-align:center"></div>
	<script type="text/javascript" src="<%=basePath%>layui/layui.all.js"></script>
	<script type="text/javascript" src="wantGoods.js"></script>
</body>
</html>