<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">
	<title>城建优品--商品编辑</title>
	<meta name="renderer" content="webkit">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="format-detection" content="telephone=no">
	<link rel="stylesheet" href="./layui/css/layui.css" media="all" />
	<style type="text/css">
		.layui-form-item .layui-inline{ width:33.333%; float:left; margin-right:0; }
		@media(max-width:1240px){
			.layui-form-item .layui-inline{ width:100%; float:none; }
		}
	</style>
</head>
<body class="childrenBody">
	<form class="layui-form" style="width:80%;">
		<div class="layui-form-item">
		    <label class="layui-form-label"><span style="color:red">*</span>出售用户</label>
		    <div class="layui-input-block">
		    	<input type="text" id="nickName" value="${goods.nickName }" class="layui-input" disabled>
		    </div>
		</div>
		<div class="layui-inline">
		    <label class="layui-form-label"><span style="color:red">*</span>商品类型</label>
			<div class="layui-input-block">
				<select name="goodsType" id="goodsType" lay-filter="goods-type">
					<option value=""></option>
			    </select>
			</div>
	    </div>
	    <div style="margin-top:10px;"></div>
		<div class="layui-form-item">
		    <label class="layui-form-label"><span style="color:red">*</span>商品名</label>
		    <div class="layui-input-block">
		    	<input id="goodsTitle" placeholder="请输入商品名" value="${goods.goodsTitle }" lay-verify="required" class="layui-input">
		    </div>
		</div>
		<div class="layui-form-item">
			    <label class="layui-form-label"><span style="color:red">*</span>商品描述</label>
			    <div class="layui-input-block">
			    	<textarea id="goodsDesc"  placeholder="请输入商品描述" class="layui-textarea">${goods.goodsDesc }</textarea>
			    </div>
		</div>
		<div class="layui-form-item">
		    <label class="layui-form-label"><span style="color:red">*</span>最高价格(元)</label>
		    <div class="layui-input-block">
		    	<input type="text" onkeyup="checknum(this);" id="goodsPrice" value="${goods.goodsMaxPrice }" placeholder="请输入商品最高价格" lay-verify="required" class="layui-input">
		    </div>
		</div>
		<div class="layui-form-item">
		    <label class="layui-form-label"><span style="color:red">*</span>最低价格(元)</label>
		    <div class="layui-input-block">
		    	<input type="text" onkeyup="checknum(this);" id="goodsPrice" value="${goods.goodsMinPrice }" placeholder="请输入商品最低价格" lay-verify="required" class="layui-input">
		    </div>
		</div>
		<div class="layui-inline">
		    <label class="layui-form-label"><span style="color:red">*</span>商品状态</label>
			<div class="layui-input-block">
				<select name="statusName" id="statusName" lay-filter="status-name">
					<option value=""></option>
			    </select>
			</div>
	    </div>
	    <div style="margin-top:10px;"></div>
	  	<div class="layui-form-item">
			<div class="layui-input-block">
				<button class="layui-btn" lay-submit="" lay-filter="addUser" id="modifyUser">立即提交</button>
				<button type="reset" class="layui-btn layui-btn-primary">重置</button>
		    </div>
		</div>
	</form>
	<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
	<script type="text/javascript" src="./layui/layui.all.js"></script>
	<script>
	 function checknum(obj){   
	     if(/^\d+\.?\d{0,2}$/.test(obj.value)){
	        obj.value = obj.value;
	     }else{
	        obj.value = obj.value.substring(0,obj.value.length-1);
	     }     
	   }
	var $;
	layui.config({
		base : "js/"
	}).use(['form','layer','jquery'],function(){
		var form = layui.form,
			layer = parent.layer === undefined ? layui.layer : parent.layer,
			laypage = layui.laypage;
			$ = layui.jquery;
			//获取商品类型
			var goodsType = $('#goodsType').val();
			$.ajax({
				url: '<%=basePath%>goodsTypeList.action',
				dataType: 'json',
				type: 'post',
				success: function (data) {
					$('#goodsType').empty();
						for(var p in data){
				            var option = document.createElement("option");  // 创建添加option属性
				            option.setAttribute("value",data[p].id); // 给option的value添加值
				            option.innerText=data[p].typeName;     // 打印option对应的纯文本 
				            $('#goodsType').append(option);          //给select添加option子标签
						}
						var reqUserId=${param.id};
						var optGoodsType="${goods.goodsType}";
						var optGoodsTypeName="${goods.goodsTypeName}";
						if(reqUserId!=""||reqUserId!=undefined){
						     document.getElementsByName("goodsType")[0].value=optGoodsType;
						     document.getElementsByName("goodsType")[0].text=optGoodsTypeName;
						}
						form.render("select");
					}
				});
			
			//获取商品状态
			var typeNo="QGZT";
			var statusName = ${goods.status};
			$.ajax({
				url: '<%=basePath%>getBaseCodeOpt.action',
				dataType: 'json',
				type: 'post',
				data:{typeNo:typeNo},
				success: function (data) {
					$('#statusName').empty();
						for(var p in data){
				            var option = document.createElement("option");  // 创建添加option属性
				            option.setAttribute("value",data[p].codeId); // 给option的value添加值
				            option.innerText=data[p].codeName;     // 打印option对应的纯文本 
				            $('#statusName').append(option);          //给select添加option子标签
						}
						var reqUserId=${param.id};
						var optStatus="${goods.status}";
						var optStatusName="${goods.statusName}";
						if(reqUserId!=""||reqUserId!=undefined){
						     document.getElementsByName("statusName")[0].value=optStatus;
						     document.getElementsByName("statusName")[0].text=optStatusName;
						}
						form.render("select");
					}
				});
			  //提交求购商品管理
	        $("#modifyUser").click(function(){
	        	var goods=new Object();
	        	goods.id=${goods.id};
	        	goods.goodsType =$("#goodsType").val();
	        	goods.goodsTitle =$("#goodsTitle").val();
	        	goods.goodsDesc =$("#goodsDesc").val();
	        	goods.goodsMaxPrice =$("#goodsMaxPrice").val();
	        	goods.goodsMinPrice =$("#goodsMinPrice").val();
	        	goods.status =$("#statusName").val()==null?statusName:$("#statusName").val();
	        	if(goods.goodsType!=''&&goods.goodsTitle!=''&&goods.goodsDesc!=''&&
	        			goods.goodsMaxPrice!=''&&goods.goodsMinPrice!=''&&goods.status!=''){
	        		$.ajax({
	            	    	url:"<%=basePath%>modifyWantGoodsInfo.action",
	            	    	type:"post",
	            	    	data:goods,
	            	    	success:function(data){
	            	    		if(data=="sessionTimeout"){
	            	    			window.location.href="<%=basePath%>login.jsp";
	    	    	    			window.parent.location.href="<%=basePath%>login.jsp";
	                        	}
	            	    		alert("修改成功");
	            	    		var index = parent.layer.getFrameIndex(window.name); 
	        	    			layer.close(index);
	        	    			window.parent.location.reload();
	            	    	}
	            		});
	        			return false;
	        		}else{
	        			return;
	        		}
	    		});
	});
	</script>
</body>
</html>