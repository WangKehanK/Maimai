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
	<title>城建优品--用户总数</title>
	<meta name="renderer" content="webkit">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="format-detection" content="telephone=no">
	<link rel="stylesheet" href="<%=basePath%>layui/css/layui.css" media="all" />
	<link rel="stylesheet" href="<%=basePath%>css/font_eolqem241z66flxr.css" media="all" />
	<link rel="stylesheet" href="<%=basePath%>css/user.css" media="all" />
	<style type="text/css">
	 #jqGrid{width:2000px}
	 #searchDiv{width:2000px}
	</style>
</head>
<body class="childrenBody">
	<blockquote class="layui-elem-quote news_search" id="searchDiv">
		<div class="layui-inline">
		    <div class="layui-input-inline">
		    	<input type="text" value="" placeholder="请输入昵称" class="layui-input search_input">
		    </div>
		    <a class="layui-btn search_btn">查询</a>
		</div>
	</blockquote>
	<div class="layui-form news_list" id="jqGrid">
	  	<table class="layui-table">
		    <colgroup>
				<col width="6%">
				<col width="5%">
				<col width="5%">
				<col width="5%">
				<col width="5%">
				<col width="4%">
				<col width="4%">
				<col width="5%">
				<col width="7%">
				<col width="6%">
				<col width="6%">
				<col width="6%">
				<col width="6%">
				<col width="4%">
				<col width="4%">
				<col width="6%">
				<col width="5%">
				<col width="6%">
				<col width="6%">
		    </colgroup>
		    <thead>
				<tr>
					<th>操作</th>
					<th>登录名</th>
					<th>昵称</th>
					<th>性别</th>
					<th>手机号码</th>
					<th>证件号码</th>
					<th>地址</th>
					<th>学校</th>
					<th>院系</th>
					<th>专业</th>
					<th>QQ</th>
					<th>邮箱</th>
					<th>会员状态</th>
					<th>信誉值</th>
					<th>违规次数</th>
					<th>创建时间</th>
					<th>是否冻结</th>
					<th>冻结开始时间</th>
					<th>冻结结束时间</th>
				</tr> 
		    </thead>
		    <tbody class="users_content"></tbody>
		</table>
	</div>
	<div id="page" style=" text-align:center"></div>
	<script type="text/javascript" src="<%=basePath%>layui/layui.all.js"></script>
	<script type="text/javascript">
	layui.config({
		base : "js/"
	}).use(['form','layer','jquery','laypage'],function(){
		var form = layui.form,
			layer = parent.layer === undefined ? layui.layer : parent.layer,
			laypage = layui.laypage,
			$ = layui.jquery;
		var pass=1011;//已认证通过
		var unPass=1014;//认证未通过
		var uncertified=1010;//未认证
		var hasFrozen=1012;//已冻结
		var vioUserId;
		//URL有参数则获取
		if( window.location.href.indexOf('?')!= -1){
			vioUserId =  window.location.href.split('?')[1].split('=')[1];
	        $.ajax({
				url : "<%=basePath%>selectVioUserById.action",
				type : "post",
				dataType : "json",
				data:{id:vioUserId},
				success : function(data){
					usersData = data;
		    		//执行加载数据的方法
		   			usersList();
		   			
				}
			})
		}else{
			initData();
		}
		//加载页面数据
		var usersData = '';
		function initData(){
	   	 $.ajax({	
		    	url:"<%=basePath%>usersList.action",
		    	success:function(data){
		    		if(data=="sessionTimeout"){
	            		window.parent.location.href="<%=basePath%>login.jsp";
	            	}
		    		usersData = $.parseJSON(data);
		    		//执行加载数据的方法
		   			usersList();
		   			if(usersData.length != 0){
						for(var i=0;i<usersData.length;i++){
							if(usersData[i].status==pass||usersData[i].status==unPass||usersData[i].status==hasFrozen){//认证通过、未通过
				   				$("#"+usersData[i].status+"_authOk").remove();
				   				$("#"+usersData[i].status+"_authClose").remove();
				   			}
						}
					}
		   		}
		});
		}
		//查询
		$(".search_btn").click(function(){
			var userArray = [];
			if($(".search_input").val() != ''){
				var nickName=$(".search_input").val();
				var index = layer.msg('查询中，请稍候',{icon: 16,time:false,shade:0.8});
	            setTimeout(function(){
	            	$.ajax({
						url : "<%=basePath%>selectUser.action",
						type : "get",
						dataType : "json",
						data:{nickName:nickName},
						success : function(data){
							usersData = data;
				    		//执行加载数据的方法
				   			usersList();
				   			if(usersData.length != 0){
								for(var i=0;i<usersData.length;i++){
									if(usersData[i].status==pass||usersData[i].status==unPass||usersData[i].status==hasFrozen){//认证通过、未通过
						   				$("#"+usersData[i].status+"_authOk").remove();
						   				$("#"+usersData[i].status+"_authClose").remove();
						   			}
								}
							}
						}
					})
	                layer.close(index);
	            },2000);
			}else{
				layer.msg("请输入需要查询的内容");
			}
		})
		//是否冻结
		form.on('switch(isShow)', function(data){
			var _this = $(this);
			var index = layer.msg('修改中，请稍候',{icon: 16,time:false,shade:0.8});
			setTimeout(function(){
				var status = data.elem.checked;//开关是否开启，true或者false
				 if(status) {//已冻结的改成未认证
		            status = hasFrozen;
	            } else {//改成已冻结
	                status = uncertified;
	            }
	        	$.ajax({	
			    	url:"<%=basePath%>frozenUserById.action",
			    	data:{id:_this.attr("data-id"),status:status},
			    	success:function(data){
			    		if(data=="sessionTimeout"){
		            		window.parent.location.href="../../login.jsp";
		            	}
			    		layer.msg("用户状态修改成功！");
			    		window.location.reload();
			    	}
				});
			  },1000);
		})
		//操作
		$("body").on("click",".users_edit",function(){  //会员详情
			var _this = $(this);
			if(_this.attr("data-id")!=""||_this.attr("data-id")!=undefined){
				var index = layui.layer.open({
					title : "会员详情",
					type : 2,
					area: ['500px','600px'],
					content : "<%=basePath%>getUserById.action?id="+_this.attr("data-id")
				})
				//改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
				$(window).resize(function(){
					layui.layer.full(index);
				})
				layui.layer.full(index);
			}
		})

		$("body").on("click",".users_ok",function(){  //认证通过
			var _this = $(this);
			layer.confirm('确定认证通过？',{icon:1, title:'提示信息'},function(index){
				$.ajax({
			    	url:"<%=basePath%>frozenUserById.action",
			    	data:{id:_this.attr("data-id"),status:pass},
			    	success:function(data){
			    		if(data=="sessionTimeout"){
		            		window.parent.location.href="<%=basePath%>login.jsp";
		            	}
		    			layer.msg("用户认证状态修改为：认证通过！");
			    		window.location.reload();
			    	}
				});
				layer.close(index);
			});
		})
		$("body").on("click",".users_close",function(){  //认证未通过
			var _this = $(this);
			layer.confirm('确定认证未通过？',{icon:2, title:'提示信息'},function(index){
				$.ajax({
			    	url:"<%=basePath%>frozenUserById.action",
			    	data:{id:_this.attr("data-id"),status:unPass},
			    	success:function(data){
			    		if(data=="sessionTimeout"){
		            		window.parent.location.href="<%=basePath%>login.jsp";
		            	}
		    			layer.msg("用户认证状态修改为：认证未通过！");
			    		window.location.reload();
			    	}
				});
				layer.close(index);
			});
		})

		function usersList(){
			
			//渲染数据
			function renderDate(data,curnum,limitcount){
				var dataHtml = '';
				//.concat 的目的是为了不修改usersData对象
				currData = usersData.concat().splice(curnum*limitcount-limitcount, limitcount);
				if(currData.length != 0){
					for(var i=0;i<currData.length;i++){
						var createTime=currData[i].createTime;
						var froTime=currData[i].froTime;
						var froEndTime=currData[i].froEndTime;
						if(createTime!=undefined){
							var createDate = new Date(createTime);
							createTime =formatTime(createDate);
						}
						if(froTime!=undefined){
							var froDate = new Date(froTime);
							froTime =formatTime(froDate);
						}
						if(froEndTime!=undefined){
							var froEndDate = new Date(froEndTime);
							froEndTime =formatTime(froEndDate);
						}
						dataHtml += '<tr>'
						+  '<td>'
						+    '<a class="layui-btn  layui-btn-xs users_edit" data-id="'+currData[i].id+'"><i class="iconfont icon-edit"></i>详情</a>'
						+    '<a class="layui-btn layui-btn-warm layui-btn-xs users_ok" id="'+currData[i].status+'_authOk" data-id="'+currData[i].id+'"><i class="layui-icon">&#xe605;</i>认证通过</a>'
						+    '<a class="layui-btn layui-btn-danger layui-btn-xs users_close" id="'+currData[i].status+'_authClose" data-id="'+currData[i].id+'"><i class="layui-icon">&#x1006;</i>认证未通过</a>'
				        +  '</td>'
					    dataHtml +='<td>'+currData[i].userName+'</td>'
				    	+  '<td>'+currData[i].nickName+'</td>'
				    	+  '<td>'+currData[i].genderName+'</td>'
				    	+  '<td>'+currData[i].phone+'</td>'
				    	if(currData[i].idNum!=''){
				    		dataHtml += '<td>'+currData[i].idNum+'</td>'
				    	}else{
				    		dataHtml += '<td></td>'
				    	}
				    	dataHtml +='<td>'+currData[i].addr+'</td>'
				    	+  '<td>'+currData[i].schoolName+'</td>'
				    	+  '<td>'+currData[i].deptName+'</td>'
				    	+  '<td>'+currData[i].majorName+'</td>'
				    	+  '<td>'+currData[i].qq+'</td>'
				    	+  '<td>'+currData[i].email+'</td>'
				    	+  '<td>'+currData[i].statusName+'</td>'
				    	+  '<td>'+currData[i].creditVal+'</td>'
				    	+  '<td>'+currData[i].reportNum+'</td>'
				    	if(createTime != undefined){
				    		dataHtml += '<td>'+createTime+'</td>'
				    	}else{
				    		dataHtml += '<td></td>'
				    	}
				    	dataHtml += '<td><input type="checkbox" name="show" lay-skin="switch" lay-text="是|否" data-id="'+currData[i].id+'" lay-filter="isShow"'+currData[i].isShow+'></td>'
				    	if(froTime != undefined){
				    		dataHtml += '<td>'+froTime+'</td>'
				    	}else{
				    		dataHtml += '<td></td>'
				    	}
						if(froEndTime != undefined){
				    		dataHtml += '<td>'+froEndTime+'</td>'
				    	}else{
				    		dataHtml += '<td></td>'
				    	}
						dataHtml +='</tr>';
					}
				}else{
					dataHtml = '<tr><td colspan="15">暂无数据</td></tr>';
				}
			    return dataHtml;
			};
			
		

			var limitcount = 10;
			    var curnum = 1;
			//分页
			laypage.render({
				elem : 'page',
				count :usersData.length, //总数
                curr:curnum,
                limit:limitcount,
                layout: ['prev', 'page', 'next', 'skip','count','limit'],
				jump : function(obj){	
					curnum = obj.curr;
                    limitcount = obj.limit;
					$(".users_content").html(renderDate(usersData,curnum,limitcount));
					$('.users_list thead input[type="checkbox"]').prop("checked",false);
					if(usersData.length != 0){
						for(var i=0;i<usersData.length;i++){
				   			if(usersData[i].status==pass||usersData[i].status==unPass||usersData[i].status==hasFrozen){//认证通过、未通过
				   				$("#"+usersData[i].status+"_authOk").remove();
				   				$("#"+usersData[i].status+"_authClose").remove();
				   			}
						
					}
					form.render();
					}
					
				}
			});
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