<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>城建优品--个人资料</title>
	<meta name="renderer" content="webkit">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="format-detection" content="telephone=no">
	<link rel="stylesheet" href="../../layui/css/layui.css" media="all" />
	<link rel="stylesheet" href="../../css/user.css" media="all" />
	<style type="text/css">
		.userFace{width:250px;
		height:250px;
		border:1px solid #000;
		margin-top:10px;}
	</style>
</head>
<body class="childrenBody">
	<form class="layui-form" method="post" enctype="multipart/form-data">
		<div class="user_left">
			<div class="layui-form-item">
			    <label class="layui-form-label"><span style="color:red">*</span>用户名</label>
			    <div class="layui-input-block">
			    	<input type="text" id="userName" value="${sessionScope.user.userName }" disabled class="layui-input layui-disabled">
			    </div>
			</div>
			<div class="layui-form-item">
			    <label class="layui-form-label"><span style="color:red">*</span>用户组</label>
			    <div class="layui-input-block">
			    	<input type="text" id="adminType" value="超级管理员" disabled class="layui-input layui-disabled">
			    </div>
			</div>
			<div class="layui-form-item">
			    <label class="layui-form-label"><span style="color:red">*</span>姓名</label>
			    <div class="layui-input-block">
			    	<input type="text" id="nickName" value="${sessionScope.user.nickName }" placeholder="请输入名称" lay-verify="required" class="layui-input">
			    </div>
			</div>
			<div class="layui-form-item" pane="">
			    <label class="layui-form-label"><span style="color:red">*</span>性别</label>
			    <div class="layui-input-block">
			    	<input type="radio" name="gender" id="gender" value="0" title="男">
	     			<input type="radio" name="gender" id="gender" value="1" title="女">
			    </div>
			</div>
			<div class="layui-form-item">
			    <label class="layui-form-label"><span style="color:red">*</span>手机号码</label>
			    <div class="layui-input-block">
			    	<input type="tel" id="phone" value="${sessionScope.user.phone }" placeholder="请输入手机号码" lay-verify="required|phone" class="layui-input">
			    </div>
			</div>
			<div class="layui-form-item">
			    <label class="layui-form-label"><span style="color:red">*</span>邮箱</label>
			    <div class="layui-input-block">
			    	<input type="text" id="email" value="${sessionScope.user.email }" placeholder="请输入邮箱" lay-verify="required|email" class="layui-input">
			    </div>
			</div>
			<div class="layui-form-item">
			    <label class="layui-form-label">备注</label>
			    <div class="layui-input-block">
			    	<textarea id="remark" placeholder="请输入内容" class="layui-textarea">${sessionScope.user.remark }</textarea>
			    </div>
			</div>
		</div>
		<div class="user_right">
			<!-- <input type="file" name="dddd" class="layui-upload-file" lay-title="掐指一算，我要换一个头像了"> -->
			<button type="button" class="layui-btn"  id="test1">
			  <i class="layui-icon"></i>上传图片
			</button>
			<div id="userFace">
				<img class="layui-circle userFace" src="<%=basePath%>${sessionScope.user.headimg }">
			</div>
		</div>
		<div class="layui-form-item" style="margin-left: 5%;">
		    <div class="layui-input-block">
		    	<button class="layui-btn" lay-submit id="editUser">立即提交</button>
				<button type="reset" class="layui-btn layui-btn-primary">重置</button>
		    </div>
		</div>
	</form>
	<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
	<script src="../../layui/layui.all.js"></script>
	<script type="text/javascript">
	var imgPath="${sessionScope.user.headimg }";
	var layers;
	layui.use('layer', function(){
		layers= layui.layer;
	 	   
	});
	layui.use('upload', function(){
	  var upload = layui.upload;
	  var i=0;//上传成功个数
	  var m=0;//选择文件个数
	  
	  //执行实例
	  var uploadInst = upload.render({
	 	elem: '#test1', //绑定元素，点击id为test1 的时候弹出选择文件窗口
	    url: '<%=basePath%>/upload.action', //上传接口，和普通ajax一样
	    bindAction:'#test1',//执行文件上传动作
	    auto: true, //选择文件后自动上传
	    multiple:false,  //关闭多文件上传
	    choose: function(obj){
	        //将每次选择的文件追加到文件队列
	        var files = obj.pushFile();
	        //预读本地文件，如果是多文件，则会遍历。(不支持ie8/9)
	          obj.preview(function(index, file, result){
	          console.log("index"+index); //得到文件索引
	          console.log(file); //得到文件对象
	          console.log(result); //得到文件base64编码，比如图片  
	          /* 页面显示图片 */
	          $('#userFace').empty();
	          $('#userFace').append('<img class="layui-circle userFace" src='+ result +'>');
	        });
	      }
	     ,before: function(obj){ //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
		    layers.load(); //上传loading
		 }
	    //请求回调函数
	    ,done:function(res,index,upload){
	    	if(res.code==0){//上传成功
	    		console.log(i);
	    		imgPath=res.src;
	    		layers.closeAll('loading');
	    	}
	    }
	    ,error: function(e){
	    	layer.msg('上传失败');
	    	layers.closeAll('loading');
	    }
	  });
	});
	layui.use('form',function(){
        var form = layui.form,$ = layui.jquery;
        var gender=${sessionScope.user.gender };
        $("input[name=gender][value=0]").attr("checked", gender == 0 ? true : false);
        $("input[name=gender][value=1]").attr("checked", gender == 1 ? true : false);      
        form.render();
      //提交个人资料
        $("#editUser").click(function(){
        	var user=new Object();
        	user.userName =$("#userName").val();
        	user.nickName =$("#nickName").val();
        	user.phone =$("#phone").val();
        	user.email =$("#email").val();
        	user.remark =$("#remark").val();
        	user.headimg=imgPath;
        	user.gender=$('input[type=radio][name=gender]:checked').val();
        		if(user.userName!=undefined&&user.userName!=''&&user.nickName!=undefined&&user.nickName!=''&&
        				user.phone!=undefined&&user.phone!=''&&user.email!=undefined&&user.email!=''&&
        				user.remark!=undefined&&user.remark!=''&&user.gender!=undefined&&user.gender!=''){
    	        	$.ajax({
            	    	url:"<%=basePath%>/editUserInfo.action",
            	    	async:false,
            	    	data:user,
            	    	success:function(data){
            	    		if(data=="sessionTimeout"){
                        		window.parent.location.href="<%=basePath%>/login.jsp";
                        	}
            	    		var obj = $.parseJSON(data);
            	    		if(obj.success==true){
            	    			alert("修改成功");
            	    			window.parent.location.href="<%=basePath%>/login.jsp";
            	    		}
            	    	}
            		});
        		}
    		});
	});

	</script>
</body>
</html>