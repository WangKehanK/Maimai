<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>城建优品--商品分类添加</title>
	<meta name="renderer" content="webkit">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="format-detection" content="telephone=no">
	<link rel="stylesheet" href="../../layui/css/layui.css" media="all" />
	<link rel="stylesheet" href="../../css/font_eolqem241z66flxr.css" media="all" />
</head>
<body class="childrenBody">
	<form class="layui-form">
		<div class="layui-form-item">
			<label class="layui-form-label" style="width:100px"><span style="color:red">*</span>商品分类名称</label>
			<div class="layui-input-block">
				<input type="text" class="layui-input goodsTypeName" style="width:300px" lay-verify="required" placeholder="请输入商品分类名称">
			</div>
		</div>
		<div class="layui-form-item">
			<div class="layui-input-block">
				<button class="layui-btn" lay-submit="" lay-filter="addGoodsType">立即提交</button>
		    </div>
		</div>
	</form>
	<script type="text/javascript" src="../../layui/layui.all.js"></script>
	<script type="text/javascript" src="goodsTypeAdd.js"></script>
</body>
</html>