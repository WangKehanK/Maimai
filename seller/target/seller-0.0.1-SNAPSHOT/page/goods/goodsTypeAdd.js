layui.config({
	base : "js/"
}).use(['form','layer','jquery','layedit','laydate'],function(){
	var form = layui.form,
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		laypage = layui.laypage,
		layedit = layui.layedit,
		laydate = layui.laydate,
		$ = layui.jquery;

	form.on('submit(addGoodsType)',function (res) {
		var typeName=$(".goodsTypeName").val();
		$.ajax({
	    	url:"../../addGoodsType.action",
	    	type:"post",
	    	data:{typeName:typeName},
	    	success:function(data){
	    		if(data=="sessionTimeout"){
            		window.parent.location.href="../../login.jsp";
            	}
	    		var obj=$.parseJSON(data);
	    		if(obj.success=true){
	    			var index = parent.layer.getFrameIndex(window.name); 
	    			layer.close(index);
	    			window.parent.location.reload();
	    		};
	    	}
		});
		return false;
	});
})
