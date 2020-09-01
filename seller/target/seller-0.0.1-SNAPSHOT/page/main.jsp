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
	<title>城建优品</title>
	<meta name="renderer" content="webkit">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="format-detection" content="telephone=no">
	<link rel="stylesheet" href="../layui/css/layui.css" media="all" />
	<link rel="stylesheet" href="../css/font_eolqem241z66flxr.css" media="all" />
	<link rel="stylesheet" href="../css/main.css" media="all" />
</head>
<body class="childrenBody">	
	<div style="float:left;margin-top:20px;width: 635px;height:400px;">
		<!-- 新增用户数量 -->
		<div id="add_user" style="width: 635px;height:200px;"></div>
		<!-- 商品发布数量 -->
		<div id="goods_pub" style="width: 635px;height:200px;"></div>
	</div>
	<!-- 出售商品类别统计 -->
	<div id="class_pub" style="float:left;margin-top:20px;width: 640px;height:400px;"></div>
	
	<div style="float:left;margin-top:20px;width: 635px;height:400px;">
		<!-- 商品求购数量 -->
		<div id="goods_buy" style="width: 635px;height:200px;"></div>
		<!-- 商品成交数量 -->
		<div id="goods_volume" style="width: 635px;height:200px;"></div>
	</div>
	<!-- 求购商品类别统计 -->
	<div id="class_buy" style="float:left;margin-top:20px;width: 640px;height:400px;"></div>
	<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
	<script type="text/javascript" src="../js/echarts.min.js"></script>
	<script type="text/javascript" src="../layui/layui.js"></script>
	<script type="text/javascript" src="../js/main.js"></script>
	<!-- <script> 
	if (window != top) 
	top.location.href = location.href; 
	</script> -->
	<script type="text/javascript">
	//初始化echarts实例
    var myChart1 = echarts.init(document.getElementById('add_user'));
    var myChart2 = echarts.init(document.getElementById('goods_pub'));
    var myChart3 = echarts.init(document.getElementById('goods_buy'));
    var myChart4 = echarts.init(document.getElementById('goods_volume'));
    var myChart5 = echarts.init(document.getElementById('class_pub'));
    var myChart6 = echarts.init(document.getElementById('class_buy'));
    $(function(){
        initData();
    });
    
    //加载初始化数据
    function initData(){
        $.ajax({
            url:"<%=basePath%>initChart1.action",
            success:function(res){
            	if(res=="sessionTimeout"){
            		window.parent.location.href="<%=basePath%>login.jsp";
            	}
                if(res.length>0){
                    var arr1=[];
                	var obj = $.parseJSON(res);
                	for(var i=6;i>=0;i--){
               			var flag=true;
                   		var d=GetDateStr(-i);
                   		for(var j=0;j<obj.length;j++){
   	                		if(d==obj[j].days1){
   	                			arr1.push(obj[j].count1);
   	                			flag=false;
   	                    	}
                   		}
                   		if(flag){
                   			arr1.push(0);
                   			flag=false;
                   		}
                   	}
                	var option1 = {
                    		title: {
                                text: '新增用户数量',
                                x:'center'
                            },
                    	    xAxis: {
                    	        type: 'category',
                    	        data: [GetDateStr(-6), GetDateStr(-5), GetDateStr(-4), GetDateStr(-3),GetDateStr(-2),GetDateStr(-1), GetDateStr(0)]
                    	    },
                    	    yAxis: {
                    	        type: 'value'
                    	    },
                    	    series: [{
                    	    	data: arr1,
                    	        type: 'line',
                    	        itemStyle : {	normal: {
            				        	        	color:'#D72A26',
            					        			lineStyle:{color:'#D72A26'},
                    	        					label : {show: true}
                    	    					}
                    	        			}
                    	    }]
                    	};
                	myChart1.setOption(option1);
                	
                }
            },
            error:function(){
                alert("发生错误");
            }
        });
        $.ajax({
            url:"<%=basePath%>initChart2.action",
            success:function(res){
            	if(res=="sessionTimeout"){
            		window.parent.location.href="<%=basePath%>login.jsp";
            	}
                if(res.length>0){
                    var arr2=[];
                	var obj = $.parseJSON(res);
                	for(var i=6;i>=0;i--){
               			var flag=true;
                   		var d=GetDateStr(-i);
                   		for(var j=0;j<obj.length;j++){
   	                		if(d==obj[j].days2){
   	                			arr2.push(obj[j].count2);
   	                			flag=false;
   	                    	}
                   		}
                   		if(flag){
                   			arr2.push(0);
                   			flag=false;
                   		}
                   	}
                	var option2 = {
                    		title: {
                                text: '商品出售发布数量',
                                x:'center'
                            },
                    	    xAxis: {
                    	        type: 'category',
                    	        data: [GetDateStr(-6), GetDateStr(-5), GetDateStr(-4), GetDateStr(-3),GetDateStr(-2),GetDateStr(-1), GetDateStr(0)]
                    	    },
                    	    yAxis: {
                    	        type: 'value'
                    	    },
                    	    series: [{
                    	    	data: arr2,
                    	        type: 'line',
                    	        itemStyle : {	normal: {
            				        	        	color:'#D72A26',
            					        			lineStyle:{color:'#D72A26'},
                    	        					label : {show: true}
                    	    					}
                    	        			}
                    	    }]
                    	};
                	myChart2.setOption(option2);
                	
                }
            },
            error:function(){
                alert("发生错误");
            }
        });
        $.ajax({
            url:"<%=basePath%>initChart3.action",
            success:function(res){
            	if(res=="sessionTimeout"){
            		window.parent.location.href="<%=basePath%>login.jsp";
            	}
                if(res.length>0){
                    var arr3=[];
                	var obj = $.parseJSON(res);
                	for(var i=6;i>=0;i--){
               			var flag=true;
                   		var d=GetDateStr(-i);
                   		for(var j=0;j<obj.length;j++){
   	                		if(d==obj[j].days3){
   	                			arr3.push(obj[j].count3);
   	                			flag=false;
   	                    	}
                   		}
                   		if(flag){
                   			arr3.push(0);
                   			flag=false;
                   		}
                   	}
                	var option3 = {
                    		title: {
                                text: '商品求购发布数量',
                                x:'center'
                            },
                    	    xAxis: {
                    	        type: 'category',
                    	        data: [GetDateStr(-6), GetDateStr(-5), GetDateStr(-4), GetDateStr(-3),GetDateStr(-2),GetDateStr(-1), GetDateStr(0)]
                    	    },
                    	    yAxis: {
                    	        type: 'value'
                    	    },
                    	    series: [{
                    	    	data: arr3,
                    	        type: 'line',
                    	        itemStyle : {	normal: {
            				        	        	color:'#D72A26',
            					        			lineStyle:{color:'#D72A26'},
                    	        					label : {show: true}
                    	    					}
                    	        			}
                    	    }]
                    	};
                	myChart3.setOption(option3);
                	
                }
            },
            error:function(){
                alert("发生错误");
            }
        });
        $.ajax({
            url:"<%=basePath%>initChart4.action",
            success:function(res){
            	if(res=="sessionTimeout"){
            		window.parent.location.href="<%=basePath%>login.jsp";
            	}
                if(res.length>0){
                    var arr4=[];
                	var obj = $.parseJSON(res);
                	for(var i=6;i>=0;i--){
               			var flag=true;
                   		var d=GetDateStr(-i);
                   		for(var j=0;j<obj.length;j++){
   	                		if(d==obj[j].days4){
   	                			arr4.push(obj[j].count4);
   	                			flag=false;
   	                    	}
                   		}
                   		if(flag){
                   			arr4.push(0);
                   			flag=false;
                   		}
                   	}
                	var option4 = {
                    		title: {
                                text: '商品成交数量',
                                x:'center'
                            },
                    	    xAxis: {
                    	        type: 'category',
                    	        data: [GetDateStr(-6), GetDateStr(-5), GetDateStr(-4), GetDateStr(-3),GetDateStr(-2),GetDateStr(-1), GetDateStr(0)]
                    	    },
                    	    yAxis: {
                    	        type: 'value'
                    	    },
                    	    series: [{
                    	    	data: arr4,
                    	        type: 'line',
                    	        itemStyle : {	normal: {
            				        	        	color:'#D72A26',
            					        			lineStyle:{color:'#D72A26'},
                    	        					label : {show: true}
                    	    					}
                    	        			}
                    	    }]
                    	};
                	myChart4.setOption(option4);
                	
                }
            },
            error:function(){
                alert("发生错误");
            }
        });
        $.ajax({
            url:"<%=basePath%>initChart5.action",
            success:function(res){
            	if(res=="sessionTimeout"){
            		window.parent.location.href="<%=basePath%>login.jsp";
            	}
                if(res.length>0){
                	var classArr=[];
                	var obj = $.parseJSON(res);
                	for(var j=0;j<obj.length;j++){
                		classArr.push(obj[j].name);
                	}
               	 	var option5 = {
               	    	    title : {
               	    	        text: '发布商品类别统计',
               	    	        x:'center'
               	    	    },
               	    	    tooltip : {
               	    	        trigger: 'item',
               	    	        formatter: "{a} <br/>{b} : {c} ({d}%)"
               	    	    },
               	    	    legend: {
               	    	        orient: 'vertical',
               	    	        left: 'left',
               	    	        data:classArr
               	    	    },
               	    	    series : [
               	    	        {
               	    	            name: '访问来源',
               	    	            type: 'pie',
               	    	            radius : '55%',
               	    	            center: ['50%', '60%'],
               	    	            data:obj,
               	    	            itemStyle: {
               	    	                emphasis: {
               	    	                    shadowBlur: 10,
               	    	                    shadowOffsetX: 0,
               	    	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
               	    	                }
               	    	            }
               	    	        }
               	    	    ]
               	    	};
                	myChart5.setOption(option5);
                }
            },
            error:function(){
                alert("发生错误");
            }
        });
        $.ajax({
            url:"<%=basePath%>initChart6.action",
            success:function(res){
            	if(res=="sessionTimeout"){
            		window.parent.location.href="<%=basePath%>login.jsp";
            	}
                if(res.length>0){
                	var classArr=[];
                	var obj = $.parseJSON(res);
                	for(var j=0;j<obj.length;j++){
                		classArr.push(obj[j].name);
                	}
               	 	var option6 = {
               	    	    title : {
               	    	        text: '求购商品类别统计',
               	    	        x:'center'
               	    	    },
               	    	    tooltip : {
               	    	        trigger: 'item',
               	    	        formatter: "{a} <br/>{b} : {c} ({d}%)"
               	    	    },
               	    	    legend: {
               	    	        orient: 'vertical',
               	    	        left: 'left',
               	    	        data:classArr
               	    	    },
               	    	    series : [
               	    	        {
               	    	            name: '访问来源',
               	    	            type: 'pie',
               	    	            radius : '55%',
               	    	            center: ['50%', '60%'],
               	    	            data:obj,
               	    	            itemStyle: {
               	    	                emphasis: {
               	    	                    shadowBlur: 10,
               	    	                    shadowOffsetX: 0,
               	    	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
               	    	                }
               	    	            }
               	    	        }
               	    	    ]
               	    	};
                	myChart6.setOption(option6);
                }
            },
            error:function(){
                alert("发生错误");
            }
        });
        
    }
    	//获取当前日期的前N天的方法
        function GetDateStr(AddDayCount) {
            var dd = new Date();
            dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期 
            var y = dd.getFullYear();
            var m = dd.getMonth() + 1; //getMonth()返回的是索引值，索引值为0-11
            m = m < 10 ? '0' + m : m;
            var d = dd.getDate();
            d = d < 10 ? ('0' + d) : d;
            return m + "-" + d;
        }
    </script>
</body>
</html>