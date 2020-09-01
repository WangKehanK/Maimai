<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">
	<title>城建优品--会员详情</title>
	<meta name="renderer" content="webkit">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="format-detection" content="telephone=no">
	<link rel="stylesheet" href="./layui/css/layui.css" media="all" />
	<link rel="stylesheet" href="./layui/css/zoomify.min.css">
	<style type="text/css">
		.layui-form-item .layui-inline{ width:33.333%; float:left; margin-right:0; }
		@media(max-width:1240px){
			.layui-form-item .layui-inline{ width:100%; float:none; }
		}
		.userImgBox{
			margin-left:110px;
			display:flex;
			justify-content: start;
		}
		.userImg{
			width:200px;
			height:200px;
			border:1px solid #000;
			margin:10px 10px 10px 10px;
		}
	</style>
	<script src="<%=basePath %>/js/jquery-3.2.1.min.js"></script>
	<script type="text/javascript" src="./layui/layui.all.js"></script>
	<script src="./layui/zoomify.min.js"></script>
</head>
<body class="childrenBody">
	<form class="layui-form" style="width:80%;">
		<div class="layui-form-item">
		    <label class="layui-form-label"><span style="color:red">*</span>登录名</label>
		    <div class="layui-input-block">
		    	<input type="text" id="userName" value="${user1.userName }" placeholder="请输入登录名" lay-verify="required" class="layui-input">
		    </div>
		</div>
		<div class="layui-form-item">
		    <label class="layui-form-label"><span style="color:red">*</span>昵称</label>
		    <div class="layui-input-block">
		    	<input type="text" id="nickName" value="${user1.nickName }" placeholder="请输入昵称" lay-verify="required" class="layui-input">
		    </div>
		</div>
		<div class="layui-form-item">
		    <label class="layui-form-label"><span style="color:red">*</span>性别</label>
		    <div class="layui-input-block">
		    	<input type="radio" name="gender" id="gender" value="1" title="男">
     			<input type="radio" name="gender" id="gender" value="2" title="女">
		    </div>
		</div>
		<div class="layui-form-item">
		    <label class="layui-form-label"><span style="color:red">*</span>手机号码</label>
		    <div class="layui-input-block">
		    	<input type="tel" id="phone" value="${user1.phone }" placeholder="请输入手机号码" lay-verify="required|phone" class="layui-input">
		    </div>
		</div>
		 <div class="layui-inline">
		    <label class="layui-form-label"><span style="color:red">*</span>学校</label>
			<div class="layui-input-block">
				<select name="schoolName" id="schoolName" lay-filter="school">
					<option value="${user1.schoolId }">${user1.schoolName }</option>
			    </select>
			</div>
	    </div>
	    <div style="margin-top:10px;"></div>
		<div class="layui-inline">
		    <label class="layui-form-label"><span style="color:red">*</span>院系</label>
			<div class="layui-input-block">
				<select name="deptName" id="deptName" lay-filter="dept">
					<option value="${user1.deptId }">${user1.deptName }</option>
			    </select>
			</div>
	    </div>
	    <div style="margin-top:10px;"></div>
		<div class="layui-inline">
		    <label class="layui-form-label"><span style="color:red">*</span>专业</label>
			<div class="layui-input-block">
				<select name="majorName" id="majorName" lay-filter="major">
					<option value="${user1.majorId}">${user1.majorName }</option>
			    </select>
			</div>
	    </div>
	    <div style="margin-top:10px;"></div>
	    <div class="layui-form-item">
		    <label class="layui-form-label"><span style="color:red">*</span>证件号码</label>
		    <div class="layui-input-block">
		    	<input id="idNum" placeholder="请输入证件号码" value="${user1.idNum }" lay-verify="required" class="layui-input">
		    </div>
		</div>
	    <div style="margin-top:10px;"></div>
	    <div class="layui-form-item">
		    <label class="layui-form-label"><span style="color:red">*</span>地址</label>
		    <div class="layui-input-block">
		    	<input id="addr" placeholder="请输入地址" value="${user1.addr }" lay-verify="required" class="layui-input">
		    </div>
		</div>
	    <div style="margin-top:10px;"></div>
		<div class="layui-form-item">
		    <label class="layui-form-label"><span style="color:red">*</span>QQ</label>
		    <div class="layui-input-block">
		    	<input id="qq" value="${user1.qq }" placeholder="请输入QQ" lay-verify="required" class="layui-input">
		    </div>
		</div>
		
		<div class="layui-form-item">
		    <label class="layui-form-label"><span style="color:red">*</span>邮箱</label>
		    <div class="layui-input-block">
		    	<input type="text" id="email" value="${user1.email }" placeholder="请输入邮箱" lay-verify="required|email" class="layui-input">
		    </div>
		</div>
		<div style="margin-top:10px;"></div>
		<div class="layui-inline">
		    <label class="layui-form-label">认证图片</label>
		    <div class="userImgBox">
		    	<c:if test="${user1.idCardImg==''}">
				   <img class="userImg" src="<%=basePath%>/images/nodata.png">
				</c:if>
				<c:if test="${user1.idCardImg!=''}">
					<c:forEach var="item" items="${user1.idCardImg}">
						<a class="example"><img class="userImg" src="<%=basePath%>${item}"></a>
					</c:forEach>
				</c:if>
			</div>
	    </div>
		<div class="layui-form-item">
			    <label class="layui-form-label">备注</label>
			    <div class="layui-input-block">
			    	<textarea id="remark"  placeholder="请输入内容" class="layui-textarea">${user1.remark }</textarea>
			    </div>
		</div>
		<div class="layui-form-item">
			<div class="layui-input-block">
				<button class="layui-btn" lay-submit="" lay-filter="addUser" id="modifyUser">立即提交</button>
				<button type="reset" class="layui-btn layui-btn-primary">重置</button>
		    </div>
		</div>
	</form>
	
	<script>
	layui.config({
		base : "js/"
	}).use(['form','layer','jquery'],function(){
		var form = layui.form,
			layer = parent.layer === undefined ? layui.layer : parent.layer,
			laypage = layui.laypage;
			var $ = layui.jquery;
			var gender=${user1.gender };
	        $("input[name=gender][value=1]").attr("checked", gender == 1 ? true : false);
	        $("input[name=gender][value=2]").attr("checked", gender == 2 ? true : false);   
	        form.render();
			var schoolName = $('#schoolName').val();
			//获取学校
			$.ajax({
				url: '<%=basePath%>/getSchoolOpt.action',
				dataType: 'json',
				type: 'get',
				async: false,
				success: function (data) {
					$('#schoolName').empty();
						for(var p in data){
				            var option = document.createElement("option");  // 创建添加option属性
				            option.setAttribute("value",data[p].id); // 给option的value添加值
				            option.innerText=data[p].name;     // 打印option对应的纯文本 
				            $('#schoolName').append(option);          //给select添加option子标签
				                        // 刷性select，显示出数据
						}
						var reqUserId=${param.id};
						var optSchoolId="${user1.schoolId}";
						var optSchoolName="${user1.schoolName}";
						if(reqUserId!=""||reqUserId!=undefined){
						     document.getElementsByName("schoolName")[0].value=optSchoolId;
						     document.getElementsByName("schoolName")[0].text=optSchoolName;
						}
						form.render("select");
					}
				});
			$('.example img').zoomify();
			form.on('select(school)',function(data1){
				var schoolId=data1.value;
				$('#deptName').empty();
				//获取院系
				$.ajax({
					url: '<%=basePath%>/getDeptOpt.action',
					dataType: 'json',
					type: 'get',
					data:{"schoolId":schoolId},
					success: function (data) {
							for(var p in data){
					            var option = document.createElement("option");  // 创建添加option属性
					            option.setAttribute("value",data[p].id); // 给option的value添加值
					            option.innerText=data[p].name;     // 打印option对应的纯文本 
					            $('#deptName').append(option);          //给select添加option子标签
					            form.render("select");            // 刷性select，显示出数据
							}
						}
					});
			});
			form.on('select(dept)',function(data1){
				var deptId=data1.value;
				$('#majorName').empty();
				//获取专业
				$.ajax({
					url: '<%=basePath%>/getMajorOpt.action',
					dataType: 'json',
					type: 'get',
					data:{"deptId":deptId},
					success: function (data) {
							for(var p in data){
					            var option = document.createElement("option");  // 创建添加option属性
					            option.setAttribute("value",data[p].id); // 给option的value添加值
					            option.innerText=data[p].name;     // 打印option对应的纯文本 
					            $('#majorName').append(option);          //给select添加option子标签
					            form.render("select");            // 刷性select，显示出数据
							}
						}
					});
			});
			  //提交个人资料
	        $("#modifyUser").click(function(){
	        	var user=new Object();
	        	user.id=${user1.id};
	        	user.userName =$("#userName").val();
	        	user.nickName =$("#nickName").val();
	        	user.phone =$("#phone").val();
	        	user.addr =$("#addr").val();
	        	user.idNum =$("#idNum").val();
	        	user.qq =$("#qq").val();
	        	user.email =$("#email").val();
	        	user.remark =$("#remark").val();
	        	user.gender=$('input[type=radio][name=gender]:checked').val();
	        	user.schoolId=$("#schoolName").val();
	        	user.deptId=$("#deptName").val();
	        	user.majorId=$("#majorName").val();
	        	if(user.userName!=undefined&&user.userName!=''&&user.nickName!=undefined&&user.nickName!=''&&
	        				user.phone!=undefined&&user.phone!=''&&user.email!=undefined&&user.email!=''&&
	        				user.qq!=undefined&&user.qq!=''&&user.addr!=undefined&&user.addr!=''&&user.idNum!=undefined&&user.idNum!=''&&
	        				user.schoolId!=undefined&&user.schoolId!=''&&user.deptId!=undefined&&user.deptId!=''&&
	        				user.majorId!=undefined&&user.majorId!=''&&user.gender!=undefined&&user.gender!=''){
	        		$.ajax({
	            	    	url:"<%=basePath%>/modifyUserInfo.action",
	            	    	type:"post",
	            	    	data:user,
	            	    	success:function(data){
	            	    		if(data=="sessionTimeout"){
	            	    			window.location.href="<%=basePath%>/login.jsp";
	    	    	    			window.parent.location.href="<%=basePath%>/login.jsp";
	                        	}
	            	    		alert("修改成功");
	            	    		var index = parent.layer.getFrameIndex(window.name); 
	        	    			layer.close(index);
	        	    			window.parent.location.reload();
	            	    	}
	            		});
	        		
	        			return false;
	        		}else{
	        		
	        			return false;
	        		}
	    		});
	});
	</script>
</body>
</html>