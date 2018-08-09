<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<% String path = request.getContextPath();%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>荔枝云章-首页</title>
	<meta name="renderer" content="webkit">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="format-detection" content="telephone=no">
	<link rel="stylesheet" href="<%=path %>/layui/css/layui.css" media="all" />
	<link rel="stylesheet" href="<%=path %>/css/font_eolqem241z66flxr.css" media="all" />
	<link rel="stylesheet" href="<%=path %>/css/main.css" media="all" />
</head>
<body class="childrenBody">
	<div class="panel_box row">
		<div class="panel col">
			<a href="javascript:;" data-url="<%=path %>/record/toverify.do">
				<div class="panel_icon">
					<i class="layui-icon" data-icon="&#xe624;">&#xe624;</i>
				</div>
				<div class="panel_word newMessage">
					<span></span>
					<cite>审批管理</cite>
				</div>
			</a>
		</div>
		<div class="panel col">
			<a href="javascript:;" data-url="<%=path %>/user/touser.do">
				<div class="panel_icon" style="background-color:#009688;">
					<i class="layui-icon" data-icon="&#xe613;">&#xe613;</i>
				</div>
				<div class="panel_word userAll">
					<span></span>
					<cite>员工管理</cite>
				</div>
			</a>
		</div>
		<div class="panel col">
			<a href="javascript:;" data-url="<%=path %>/seal/toseal.do">
				<div class="panel_icon" style="background-color:#393D49;">
					<i class="layui-icon" data-icon="&#xe635;">&#xe635;</i>
				</div>
				<div class="panel_word sealAll">
					<span></span>
					<cite>印章管理</cite>
				</div>
			</a>
		</div>
		<div class="panel col">
			<a href="javascript:;" data-url="<%=path %>/archive/toarchive.do">
				<div class="panel_icon" style="background-color:#F7B824;">
					<i class="iconfont icon-wenben" data-icon="icon-wenben"></i>
				</div>
				<div class="panel_word waitNews">
					<span></span>
					<cite>归档管理</cite>
				</div>
			</a>
		</div>
		<div class="panel col max_panel">
			<a href="javascript:;" data-url="<%=path %>/record/torecord.do">
				<div class="panel_icon" style="background-color:#2F4056;">
					<i class="iconfont icon-text" data-icon="icon-text"></i>
				</div>
				<div class="panel_word allNews">
					<span></span>
					<em>历史记录</em>
					<cite>历史记录</cite>
				</div>
			</a>
		</div>
	</div>
	<script type="text/javascript" src="<%=path %>/layui/layui.js"></script>
	<script type="text/javascript" src="<%=path %>/js/main.js"></script>
</body>
</html>