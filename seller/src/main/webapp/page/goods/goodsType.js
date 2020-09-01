layui.config({
	base : "js/"
}).use(['form','layer','jquery','laypage'],function(){
	var form = layui.form,
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		laypage = layui.laypage,
		$ = layui.jquery;

	$(function(){
        initData();
	});
	//加载页面数据
	var usersData = '';
	function initData(){
   	 $.ajax({	
	    	url:"../../goodsTypeList.action",
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
		if($(".search_input").val() != ''){
			var typeName=$(".search_input").val();
			var index = layer.msg('查询中，请稍候',{icon: 16,time:false,shade:0.8});
            setTimeout(function(){
            	$.ajax({
					url : "../../selectGoodsType.action",
					type : "get",
					dataType : "json",
					data:{typeName:typeName},
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
	//添加分类
	$(".goodsTypeAdd_btn").click(function(){
		var index = layui.layer.open({
			title : "添加分类",
			type : 2,
			content : "goodsTypeAdd.jsp",
			area: ['500px','600px']
		})
		//改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
		$(window).resize(function(){
			layui.layer.full(index);
		})
		layui.layer.full(index);
	})
	$("body").on("click",".users_del",function(){  //删除
			var _this = $(this);
			layer.confirm('确定删除此分类？',{icon:2, title:'提示信息'},function(index){
				for(var i=0;i<usersData.length;i++){
					if(usersData[i].id == _this.attr("data-id")){
						usersData.splice(i,1);
						usersList(usersData);

						$.ajax({
							url : "../../delGoodsTypeById.action",
							type : "get",
							dataType : "json",
							data:{id:_this.attr("data-id")},
							success : function(data){
								
							}
						})
					}
					}
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
			    	+  '<td>'+currData[i].typeName+'</td>'
			    	+  '<td>'+createTime+'</td>'
			    	+  '<td>'
					+    '<a class="layui-btn layui-btn-danger layui-btn-xs users_del" data-id="'+currData[i].id+'"><i class="layui-icon">&#xe640;</i>删除</a>'
			        +  '</td>'
			    	+'</tr>';
				}
			}else{
				dataHtml = '<tr><td colspan="3">暂无数据</td></tr>';
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