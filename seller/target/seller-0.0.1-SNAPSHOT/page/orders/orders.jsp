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
	<title>城建优品--订单</title>
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
		    	<input type="text" value="" placeholder="请输入订单编号" class="layui-input search_input">
		    </div>
		    <a class="layui-btn search_btn">查询</a>
		</div>
	</blockquote>
	<div class="layui-form news_list">
	  	<table class="layui-table">
		    <colgroup>
				<col width="120">
				<col width="120">
				<col width="70">
				<col width="70">
				<col width="70">
				<col width="100">
				<col width="70">
				<col width="80">
				<col width="100">
				<col width="90">
				<col width="85">
		    </colgroup>
		    <thead>
				<tr>
					<th>订单编号</th>
					<th>商品编号</th>
					<th>出售用户</th>
					<th>购买用户</th>
					<th>商品类型</th>
					<th>商品名</th>
					<th>价格(元)</th>
					<th>订单状态</th>
					<th>地址</th>
					<th>联系方式</th>
					<th>创建时间</th>
				</tr> 
		    </thead>
		    <tbody class="users_content"></tbody>
		</table>
	</div>
	<div id="page"></div>
	<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
	<script type="text/javascript" src="<%=basePath%>layui/layui.all.js"></script>
	<script type="text/javascript">
	layui.config({
		base : "js/"
	}).use(['form','layer','jquery','laypage'],function(){
		var form = layui.form,
			layer = parent.layer === undefined ? layui.layer : parent.layer,
			laypage = layui.laypage,
			$ = layui.jquery;
		var delSP=1023;//已删除
		var usersData = '';
		//URL有参数则获取
		<%-- if( window.location.href.indexOf('?')!== -1){
			vioGoodsId =  window.location.href.split('?')[1].split('=')[1];

	        $.ajax({
				url : "<%=basePath%>selectVioGoodsById.action",
				type : "post",
				data:{id:vioGoodsId},
				success : function(data){
					usersData = $.parseJSON(data);
		    		//执行加载数据的方法
		   			usersList(usersData);
				}
			})
		}else{
			initData();
		} --%>
		//加载页面数据
		$(function(){
			initData();
		})
		function initData(){
	   	 $.ajax({	
		    	url:"<%=basePath%>ordersList.action",
		    	success:function(data){
		    		if(data=="sessionTimeout"){
	            		window.parent.location.href="<%=basePath%>login.jsp";
	            	}
		    		usersData = $.parseJSON(data);
		    		//执行加载数据的方法
		   			usersList(usersData);
		   		}
		});
		}

		//查询
		$(".search_btn").click(function(){
			var userArray = [];
			if($(".search_input").val() != ''){
				var ordersNo=$(".search_input").val();
				var index = layer.msg('查询中，请稍候',{icon: 16,time:false,shade:0.8});
	            setTimeout(function(){
	            	$.ajax({
						url : "<%=basePath%>selectOrders.action",
						dataType : "json",
						data:{ordersNo:ordersNo},
						success : function(data){
							usersData = data;
				    		//执行加载数据的方法
				   			usersList();
						}
					})
	                layer.close(index);
	            },2000);
			}else{
				layer.msg("请输入需要查询的内容");
			}
		})

		function usersList(data){
			//渲染数据
			function renderDate(data,curr){
				var dataHtml = '';
				currData = usersData.concat().splice(curr*nums-nums, nums);
				if(currData.length != 0){
					for(var i=0;i<currData.length;i++){
						var createTime=currData[i].createTime;
						var date = new Date(createTime);
						createTime =formatTime(date);
						dataHtml += '<tr>'
						+  '<td>'+currData[i].ordersNo+'</td>'
						+  '<td>'+currData[i].goodsNo+'</td>'
				    	+  '<td>'+currData[i].saleUserName+'</td>'
				    	+  '<td>'+currData[i].nickName+'</td>'
				    	+  '<td>'+currData[i].goodsTypeName+'</td>'
				    	+  '<td>'+currData[i].goodsTitle+'</td>'
				    	+  '<td>'+currData[i].goodsPrice+'</td>'
				    	+  '<td>'+currData[i].statusName+'</td>'
				    	+  '<td>'+currData[i].addr+'</td>'
				    	+  '<td>'+currData[i].contactTel+'</td>'
				    	+  '<td>'+createTime+'</td>'
				    	+'</tr>';
					}
				}else{
					dataHtml = '<tr><td colspan="10">暂无数据</td></tr>';
				}
			    return dataHtml;
			}

			//分页
			var nums = 13; //每页出现的数据量
			laypage.render({
				cont : "page",
				pages : Math.ceil(usersData.length/nums),
				jump : function(obj){
					$(".users_content").html(renderDate(data,obj.curr));
					$('.users_list thead input[type="checkbox"]').prop("checked",false);
			    	form.render();
				}
			})
		}
	})
	function formatTime(_time){
	    var year = _time.getFullYear();
	    var month = _time.getMonth()+1<10 ? "0"+(_time.getMonth()+1) : _time.getMonth()+1;
	    var day = _time.getDate()<10 ? "0"+_time.getDate() : _time.getDate();
	    var hour = _time.getHours()<10 ? "0"+_time.getHours() : _time.getHours();
	    var minute = _time.getMinutes()<10 ? "0"+_time.getMinutes() : _time.getMinutes();
	    var second = _time.getSeconds()<10 ? "0"+_time.getSeconds() : _time.getSeconds();
	    return year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
	}
	</script>
</body>
</html>