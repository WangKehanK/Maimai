<%@ page language="java" contentType="text/html; charset=utf-8"  pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<!-- 引入外部样式等 -->
 <link rel="stylesheet" href="../../layui/css/layui.css" media="all">
 <script src="../../layui/layui.all.js"></script>
<script src="<%=basePath %>js/jquery-3.2.1.min.js"></script>
<title>upload</title>
</head>
<body>
 
<button type="button" class="layui-btn"  id="test1">
  <i class="layui-icon"></i>上传图片
</button>
 <button type="button" class="layui-btn"  id="test2">
  <i class="layui-icon"></i>上传
</button>
<div id="d"></div>
 
<%-- 
<a href="${pageContext.request.contextPath}/layuis/f.do" class="layui-btn">查看已经上传的图片</a>
<c:forEach var="picture" items="${pictureList }" >
	<img src="${pageContext.request.contextPath}/${picture.path}"> 
	
</c:forEach>  --%>
 
<script>
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
    url: '<%=basePath%>layuis/upload.action', //上传接口，和普通ajax一样
    bindAction:'#test2',//执行文件上传动作
    auto: false, //选择文件后不自动上传
    multiple:true,  //开启多文件上传
    number:5,  	//同时上传数量
    choose: function(obj){
        //将每次选择的文件追加到文件队列
        var files = obj.pushFile();
        //预读本地文件，如果是多文件，则会遍历。(不支持ie8/9)
          obj.preview(function(index, file, result){
          console.log("index"+index); //得到文件索引
          console.log(file); //得到文件对象
          console.log(result); //得到文件base64编码，比如图片  
          /* 页面显示图片 */
          $('#d').append('<img src='+ result +'>');
        });
      }
     ,before: function(obj){ //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
	    layers.load(); //上传loading
	 }
    ,allDone: function(obj){ //当文件全部被提交后，才触发
        console.log(obj.total); //得到总文件数
        console.log(obj.successful); //请求成功的文件数
        console.log(obj.aborted); //请求失败的文件数
        if(obj.total==i){
        	layers.closeAll('loading');
        	layers.msg("全部上传成功",{time:2000});
        	//function () {
        	//	parent.location.reload();    //刷新父页面   第二个参数设置msg显示的时间长短
        	//}
        }
      }
    //请求回调函数
    ,done:function(res,index,upload){
    	if(res.code==0){//上传成功
    		i++;		 
    		console.log(i);
    	}
    }
    ,error: function(e){
    	layer.msg('上传失败');
    	layers.closeAll('loading');
    }
  });
});
</script>
 
</body>
</html>    