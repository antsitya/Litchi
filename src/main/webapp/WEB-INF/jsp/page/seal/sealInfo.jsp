<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<%@page import="com.javen.model.User"%>
<%@page import="com.javen.model.Seal"%>
<% String path = request.getContextPath();
User user=(User)session.getAttribute("loged");
String name=(String)session.getAttribute("name");
Seal seal=(Seal)session.getAttribute("sealInfo");
%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>荔枝云章-印章详情</title>
	<meta name="renderer" content="webkit">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="format-detection" content="telephone=no">
	<link rel="stylesheet" href="<%=path %>/layui/css/layui.css" media="all" />
	<link rel="stylesheet" href="<%=path %>/css/user.css" media="all" />
</head>
<body class="childrenBody">
	<form class="layui-form">
		<div class="user_left">
			<div class="layui-form-item">
			    <label class="layui-form-label">印章编号</label>
			    <div class="layui-input-block">
			    	<input type="text" value="<%=seal.getSealid()%>" disabled class="layui-input layui-disabled">
			    </div>
			</div>
			<div class="layui-form-item">
			    <label class="layui-form-label">印章名称</label>
			    <div class="layui-input-block">
			    	<input type="text" value="<%=seal.getSealname()%>" disabled class="layui-input layui-disabled">
			    </div>
			</div>
			<div class="layui-form-item">
			    <label class="layui-form-label">印章管理员(工号)</label>
			    <div class="layui-input-block">
			    	<input type="text" value="<%=seal.getEmpid()%>" disabled class="layui-input layui-disabled">
			    </div>
			</div>
			<div class="layui-form-item">
			    <label class="layui-form-label">印章管理员(姓名)</label>
			    <div class="layui-input-block">
			    	<input type="text" value="<%=name%>" disabled class="layui-input layui-disabled">
			    </div>
			</div>
			<div class="layui-form-item">
			    <label class="layui-form-label">印章描述</label>
			    <div class="layui-input-block">
			    	<textarea placeholder="请输入内容摘要" disabled class="layui-textarea"><%=seal.getDesc()%></textarea>
			    </div>
			</div>
		</div>
		<div class="user_right">
		<div class="layui-block">
			 <img src="<%=path %>/yinzhang/<%=seal.getImage() %>.jpg" class="layui-circle" id="userFace">
		</div>
		<p style="font-size:18px;">印章图像</p>		
		</div>
	</form>
	<script type="text/javascript" src="<%=path %>/layui/layui.js"></script>
</body>
</html>