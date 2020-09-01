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
	<title>城建优品--修改密码</title>
	<meta name="renderer" content="webkit">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="format-detection" content="telephone=no">
	<link rel="stylesheet" href="../../layui/css/layui.css" media="all" />
	<link rel="stylesheet" href="../../css/user.css" media="all" />
</head>
<body class="childrenBody">
	<form class="layui-form changePwd" method="post">
		<div class="layui-form-item">
		    <label class="layui-form-label"><span style="color:red">*</span>用户名</label>
		    <div class="layui-input-block">
		    	<input type="text" value="${sessionScope.user.nickName }" disabled class="layui-input layui-disabled">
		    </div>
		</div>
		<div class="layui-form-item">
		    <label class="layui-form-label"><span style="color:red">*</span>新密码</label>
		    <div class="layui-input-block">
		    	<input type="password" id="newPwd" placeholder="请输入新密码" lay-verify="required|newPwd" class="layui-input pwd">
		    </div>
		</div>
		<div class="layui-form-item">
		    <label class="layui-form-label"><span style="color:red">*</span>确认密码</label>
		    <div class="layui-input-block">
		    	<input type="password" id="confirmPwd" placeholder="请确认密码" lay-verify="required|confirmPwd" class="layui-input pwd">
		    </div>
		</div>
		<div class="layui-form-item">
		    <div class="layui-input-block">
		    	<button class="layui-btn" lay-submit="" id="changePwd">立即修改</button>
				<button type="reset" class="layui-btn layui-btn-primary">重置</button>
		    </div>
		</div>
	</form>
	<script type="text/javascript" src="../../layui/layui.all.js"></script>
	<script type="text/javascript">
	layui.use('form',function(){
        var form = layui.form,$ = layui.jquery;
        //提交个人资料
        $("#changePwd").click(function(){
        	var newPwd=$("#newPwd").val();
        	var confirmPwd=$("#confirmPwd").val();
        	if(newPwd==undefined||newPwd==''){
        		return;
        	}else if(confirmPwd==undefined||confirmPwd==''){
        		return;
        	}else if($("#newPwd").val().length<6){
        		alert("密码长度不能小于6位");
        		return;
        	}else if(newPwd!=confirmPwd){
        		alert("两次输入密码不一致，请重新输入！");
        		return;
        	}else{
	        	$.ajax({
	    	    	url:"<%=basePath%>changePwd.action",
	    	    	async:false, 
	    	    	data:{
	    	    		pwd:newPwd
	    	    	},
	    	    	success:function(data){
	    	    		var obj = $.parseJSON(data);
	    	    		if(obj.success==true){
	    	    			alert("密码修改成功");
	    	    			window.location.href="<%=basePath%>login.jsp";
	    	    			window.parent.location.href="<%=basePath%>login.jsp";
	    	    		}
	    	    	}
	    		});
        	}
        });
	});
	</script>
</body>
</html>