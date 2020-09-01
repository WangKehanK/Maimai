<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>MAIMAI</title>
<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta http-equiv="Access-Control-Allow-Origin" content="*">
<meta name="viewport"
	content="width=device-width, initial-scale=1, maximum-scale=1">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="format-detection" content="telephone=no">
    	<link rel="shortcut icon" href="<%=basePath %>favicon.ico" />
<link rel="stylesheet" href="layui/css/layui.css" media="all" />
<link rel="stylesheet" href="css/font_eolqem241z66flxr.css" media="all" />
<link rel="stylesheet" href="css/main.css" media="all" />
</head>
<body class="main_body">
	<div class="layui-layout layui-layout-admin">
		<!-- 顶部 -->
		<div class="layui-header header">
			<div class="layui-main">
				<a href="#" class="logo">MAIMAI ADMIN</a>
				<!-- 顶部右侧菜单 -->
				<ul class="layui-nav top_menu">
					<li class="layui-nav-item lockcms" pc><a href="javascript:;"><i
							class="iconfont icon-lock1"></i><cite>锁屏</cite></a></li>
					<li class="layui-nav-item" pc>
						<a href="javascript:;"> 
							<img src="<%=basePath%>${sessionScope.user.headimg }"
								class="layui-circle" width="35" height="35"> 
								<cite>${sessionScope.user.nickName }</cite>
						</a>
						<dl class="layui-nav-child">
							<dd>
								<a href="<%=basePath%>login.jsp"><i
									class="iconfont icon-loginout"></i><cite>退出</cite></a>
							</dd>
						</dl>
					</li>
				</ul>
			</div>
		</div>
		<!-- 左侧导航 -->
		<div class="layui-side layui-bg-black">
			<div class="user-photo">
				<a class="img" title="我的头像"><img
					src="<%=basePath%>${sessionScope.user.headimg }"></a>
				<p>
					你好！<span class="userName">${sessionScope.user.nickName }</span>,
					欢迎登录
				</p>
			</div>
			<div class="navBar layui-side-scroll"></div>
		</div>
		<!-- 右侧内容 -->
		<div class="layui-body layui-form">
			<div class="layui-tab marg0" lay-filter="bodyTab">
				<ul class="layui-tab-title top_tab">
					<li class="layui-this" lay-id=""><i
						class="iconfont icon-computer"></i> <cite>后台首页</cite></li>
				</ul>
				<div class="layui-tab-content clildFrame">
					<div class="layui-tab-item layui-show">
						<iframe src="page/main.jsp"></iframe>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- 锁屏 -->
	<div class="admin-header-lock" id="lock-box" style="display: none;">
		<div class="admin-header-lock-img">
			<img src="<%=basePath%>${sessionScope.user.headimg }" />
		</div>
		<div class="admin-header-lock-name" id="lockUserName">嘿嘿，锁住了吧</div>
		<div class="input_btn">
			<input type="password" class="admin-header-lock-input layui-input"
				placeholder="请输入密码解锁.." name="lockPwd" id="lockPwd" />
			<button class="layui-btn" id="unlock">解锁</button>
		</div>
	</div>
	<!-- 移动导航 -->
	<div class="site-tree-mobile layui-hide">
		<i class="layui-icon">&#xe602;</i>
	</div>
	<div class="site-mobile-shade"></div>

	<script type="text/javascript" src="layui/layui.js"></script>
	<script type="text/javascript" src="js/nav.js"></script>
	<script type="text/javascript" src="js/leftNav.js"></script>
	<script type="text/javascript" src="js/index.js"></script>
</body>
</html>