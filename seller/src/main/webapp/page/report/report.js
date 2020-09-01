layui.config({
	base : "js/"
}).use(['form','layer','jquery','laypage'],function(){
	var form = layui.form,
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		laypage = layui.laypage,
		$ = layui.jquery;
	var noVio=1042;//无违规
	var confirmVio=1041;//确认违规
	$(function(){
        initData();
	});
	//加载页面数据
	var usersData = '';
	function initData(){
   	 $.ajax({	
	    	url:"../../reportList.action",
	    	success:function(data){
	    		if(data=="sessionTimeout"){
            		window.parent.location.href="../../login.jsp";
            	}
	    		usersData = $.parseJSON(data);
	    		//执行加载数据的方法
	   			usersList();
	   			if(usersData.length != 0){
					for(var i=0;i<usersData.length;i++){
			   			if(usersData[i].status==confirmVio||usersData[i].status==noVio){//已处理
			   				$("#"+usersData[i].status+"_auth1").remove();
			   				$("#"+usersData[i].status+"_auth2").remove();
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
			var goodsNo=$(".search_input").val();
			var index = layer.msg('查询中，请稍候',{icon: 16,time:false,shade:0.8});
            setTimeout(function(){
            	$.ajax({
					url : "../../selectReports.action",
					type : "get",
					dataType : "json",
					data:{goodsNo:goodsNo},
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
	$("body").on("click",".confirm_vio_handle",function(){  //确认违规
		if($(this).text().indexOf("确认违规") <= 0){
			$.ajax({
				url : "../../handleReports.action",
				type : "post",
				dataType : "json",
				data:{id:$(this).attr("data-id"),status:confirmVio,userId:$(this).attr("data-userId"),goodsId:$(this).attr("data-goodsId")},
				success : function(data){
					if(data=="sessionTimeout"){
	            		window.parent.location.href="../../login.jsp";
	            	}
					layer.msg("处理成功！");
					$(this).html("<i class='iconfont icon-star'></i>已处理");
					window.location.reload();
				}
			})
		}
	})
	$("body").on("click",".no_vio_handle",function(){  //无违规
		if($(this).text().indexOf("无违规") <= 0){
			$.ajax({
				url : "../../handleReports.action",
				type : "post",
				dataType : "json",
				data:{id:$(this).attr("data-id"),status:noVio,userId:$(this).attr("data-userId"),goodsId:$(this).attr("data-goodsId")},
				success : function(data){
					if(data=="sessionTimeout"){
	            		window.parent.location.href="../../login.jsp";
	            	}
					layer.msg("处理成功！");
					$(this).html("<i class='iconfont icon-star'></i>已处理");
					window.location.reload();
				}
			})
		}
	})
	//操作
	$("body").on("click",".users_vio",function(){  //查看违规用户
		var _this = $(this);
		var index = layui.layer.open({
			title : "查看违规用户",
			type : 2,
			area: ['500px','600px'],
			content : "../../page/user/allUsers.jsp?vioUserId="+_this.attr("data-id")
		})
		//改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
		$(window).resize(function(){
			layui.layer.full(index);
		})
		layui.layer.full(index);
	})
	//操作
	$("body").on("click",".goods_vio",function(){  //查看违规商品
		var _this = $(this);
		if(_this.attr("data-no").slice(0,2)=="SP"){//出售
			var index = layui.layer.open({
				title : "查看违规商品",
				type : 2,
				area: ['500px','600px'],
				content : "../../page/goods/saleGoods.jsp?vioGoodsId="+_this.attr("data-id")
			})
		}else{//求购
			var index = layui.layer.open({
				title : "查看违规商品",
				type : 2,
				area: ['500px','600px'],
				content : "../../page/goods/wantGoods.jsp?vioGoodsId="+_this.attr("data-id")
			})
		}
		
		//改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
		$(window).resize(function(){
			layui.layer.full(index);
		})
		layui.layer.full(index);
	})


	function usersList(){
		//渲染数据
		function renderDate(usersData,curnum,limitcount){
			var dataHtml = '';
			currData = usersData.concat().splice(curnum*limitcount-limitcount, limitcount);
			if(currData.length != 0){
				for(var i=0;i<currData.length;i++){
					var createTime=currData[i].createTime;
					var date = new Date(createTime);
					createTime =formatTime(date);
					dataHtml += '<tr>'
			    	+  '<td>'+currData[i].goodsNo+'</td>'
			    	+  '<td>'+currData[i].reportName+'</td>'
			    	+  '<td>'+currData[i].violatorName+'</td>'
			    	+  '<td>'+currData[i].reportNum+'</td>'
			    	+  '<td>'+currData[i].reportContent+'</td>'
			    	+  '<td>'+currData[i].statusName+'</td>'
			    	+  '<td>'+createTime+'</td>'
			    	+  '<td>'
					+    '<a class="layui-btn layui-btn-normal layui-btn-xs confirm_vio_handle" id="'+currData[i].status+'_auth1" data-userId="'+currData[i].violatorId+'" data-goodsId="'+currData[i].goodsId+'" data-id="'+currData[i].id+'">确认违规</a>'
					+    '<a class="layui-btn layui-btn-warm layui-btn-xs no_vio_handle" id="'+currData[i].status+'_auth2" data-userId="'+currData[i].violatorId+'" data-goodsId="'+currData[i].goodsId+'" data-id="'+currData[i].id+'">无违规</a><br>'
					+    '<a class="layui-btn layui-btn-xs users_vio" data-id="'+currData[i].violatorId+'">查看违规用户</a>'
					+    '<a class="layui-btn layui-btn-danger layui-btn-xs goods_vio" data-no="'+currData[i].goodsNo+'" data-id="'+currData[i].goodsId+'">查看违规商品</a>'
			        +  '</td>'
			    	+'</tr>';
				}
			}else{
				dataHtml = '<tr><td colspan="9">暂无数据</td></tr>';
			}
		    return dataHtml;
		}

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
			$(".goods_content").html(renderDate(usersData,curnum,limitcount));
			form.render();			
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