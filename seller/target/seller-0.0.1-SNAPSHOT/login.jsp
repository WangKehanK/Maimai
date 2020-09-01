<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html lang="zh_cn">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>城建优品管理员登录</title>
    <link rel="stylesheet" href="layui/css/layui.css" media="all" />
    <link rel="stylesheet" href="css/login.css" />
</head>
<body class="beg-login-bg">
<div class="container login">
    <div class="content">
        <div id="large-header" class="large-header">
            <canvas id="demo-canvas"></canvas>
            <div class="main-title">
                <div class="beg-login-box">
                    <header>
                        <h1>管理员登录</h1>
                    </header>
                    <div class="beg-login-main">
                        <form class="layui-form layui-form-pane" method="post">
                            <div class="layui-form-item">
                                <input type="text" name="userName" id="userName" lay-verify="required" placeholder="这里输入登录名" class="layui-input">
                            </div>
                            <div class="layui-form-item">
                                <input type="password"  name="pwd" id="pwd" lay-verify="required" placeholder="这里输入密码" class="layui-input">
                            </div>
                            <div class="layui-form-item">
                                <input id="check" type="button" value="登录" class="layui-btn btn-submit btn-blog" lay-submit ></input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script src="js/login.js"></script>
<script type="text/javascript" src="layui/layui.js"></script>
<script>
    layui.use('form',function(){
        var form = layui.form,$ = layui.jquery;
        $("#check").click(function(){
        	var userName=$("#userName").val();
        	var pwd=$("#pwd").val();
            if(userName!=null&&userName!=undefined&&userName!=''&&pwd!=null&&pwd!=undefined&&pwd!=''){
            	    $.ajax({
            	    	url:"<%=basePath%>login.action",
            	    	data:{
	            	    		userName:userName,
	            	    		pwd:pwd
            	    		 },
            	    	success:function(data,status,xhr){
            	    		var obj = $.parseJSON(data);
            	    		if(obj.success==true){
            	    			window.location.href="<%=basePath%>index.jsp";
            	    		}else{
            	    			alert("用户名或密码不正确");
            	    		}
            	    	}
            	});
            }
        });
        
       
    });
</script>
</body>
</html>