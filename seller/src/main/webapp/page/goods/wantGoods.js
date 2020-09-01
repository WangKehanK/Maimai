layui.config({
	base : "js/"
}).use(['form','layer','jquery','laypage'],function(){
	var form = layui.form,
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		laypage = layui.laypage,
		$ = layui.jquery;
	var delQG=1032;//已删除
	$(function(){
        initData();
	});
	//加载页面数据
	var usersData = '';
	function initData(){
   	 $.ajax({	
	    	url:"../../wantList.action",
	    	success:function(data){
	    		if(data=="sessionTimeout"){
            		window.parent.location.href="../../login.jsp";
            	}
	    		usersData = $.parseJSON(data);
	    		//执行加载数据的方法
	   			usersList();
	   		}
	});
	}

	//查询
	$(".search_btn").click(function(){
		var userArray = [];
		if($(".search_input").val() != ''){
			var wantNo=$(".search_input").val();
			var index = layer.msg('查询中，请稍候',{icon: 16,time:false,shade:0.8});
            setTimeout(function(){
            	$.ajax({
					url : "../../selectWantGoods.action",
					type : "get",
					dataType : "json",
					data:{wantNo:wantNo},
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
	
	//操作
	$("body").on("click",".users_edit",function(){  //编辑
		var _this = $(this);
		if(_this.attr("data-id")!=""||_this.attr("data-id")!=undefined){
			var index = layui.layer.open({
				title : "编辑商品",
				type : 2,
				area: ['500px','600px'],
				content : "../../getWantGoodById.action?id="+_this.attr("data-id")
			})
			//改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
			$(window).resize(function(){
				layui.layer.full(index);
			})
			layui.layer.full(index);
		}
	})

	$("body").on("click",".users_del",function(){  //删除
		var _this = $(this);
		layer.confirm('确定删除该商品？',{icon:2, title:'提示信息'},function(index){
			for(var i=0;i<usersData.length;i++){
				if(usersData[i].usersId == _this.attr("data-id")){
					usersData.splice(i,1);
					usersList(usersData);
				}
			}
			$.ajax({
		    	url:"../../updateWantGoodsStatusById.action",
		    	data:{id:_this.attr("data-id"),status:delQG},
		    	success:function(data){
		    		if(data=="sessionTimeout"){
	            		window.parent.location.href="../../login.jsp";
	            	}
	    			layer.msg("删除成功！");
		    		window.location.reload();
		    	}
			});
			layer.close(index);
		});
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
			    	+  '<td>'+currData[i].nickName+'</td>'
			    	+  '<td>'+currData[i].goodsTypeName+'</td>'
			    	+  '<td>'+currData[i].goodsTitle+'</td>'
			    	+  '<td>'+currData[i].goodsMaxPrice+'</td>'
			    	+  '<td>'+currData[i].goodsMinPrice+'</td>'
			    	+  '<td>'+currData[i].statusName+'</td>'
			    	+  '<td>'+createTime+'</td>'
			    	+  '<td>'
					+    '<a class="layui-btn layui-btn-xs users_edit" data-id="'+currData[i].id+'"><i class="iconfont icon-edit"></i>详情</a>'
					+    '<a class="layui-btn layui-btn-danger layui-btn-xs users_del" data-id="'+currData[i].id+'"><i class="layui-icon">&#xe640;</i>删除</a>'
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