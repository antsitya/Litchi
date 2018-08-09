<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<%@page import="com.javen.model.User"%>
<%@page import="com.javen.model.Archive"%>
<% String path = request.getContextPath();
User user=(User)session.getAttribute("loged");
String from=(String)session.getAttribute("from");
String did=(String)session.getAttribute("did");
Archive archive=(Archive)session.getAttribute("ArchiveInfo");
String sealname=(String)session.getAttribute("seal");
%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>荔枝云章-归档详情</title>
	<meta name="renderer" content="webkit">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="format-detection" content="telephone=no">
	<link rel="stylesheet" href="<%=path %>/layui/css/layui.css" media="all" />
	<link rel="stylesheet" href="<%=path %>/css/font_eolqem241z66flxr.css" media="all" />
	<link rel="stylesheet" href="<%=path %>/css/user.css" media="all"/>
</head>
<body class="childrenBody">
	<form class="layui-form">
		<div class="user_left">
			<div class="layui-form-item">
			    <label class="layui-form-label">归档合同ID</label>
			    <div class="layui-input-block">
			    	<input type="text" value="<%=archive.getArchiveId() %>" disabled class="layui-input layui-disabled">
			    </div>
			</div>
			<div class="layui-form-item">
			    <label class="layui-form-label">申请人</label>
			    <div class="layui-input-block">
			    	<input type="text" value="<%=from%>" disabled class="layui-input layui-disabled">
			    </div>
			</div>
			<div class="layui-form-item">
			    <label class="layui-form-label">处理人</label>
			    <div class="layui-input-block">
			    	<input type="text" value="<%=did%>" disabled class="layui-input layui-disabled">
			    </div>
			</div>
			<div class="layui-form-item">
			    <label class="layui-form-label">处理时间</label>
			    <div class="layui-input-block">
			    	<input type="text" value="<%=archive.getTime()%>" disabled class="layui-input layui-disabled">
			    </div>
			</div>
			<div class="layui-form-item">
			    <label class="layui-form-label">印章名称</label>
			    <div class="layui-input-block">
			    	<input type="text" value="<%=sealname%>" disabled class="layui-input layui-disabled">
			    </div>
			</div>
			<div class="layui-form-item">
			    <label class="layui-form-label">印章次数</label>
			    <div class="layui-input-block">
			    	<input type="text" value="<%=archive.getTimes()%>" disabled class="layui-input layui-disabled">
			    </div>
			</div>
		</div>
		<div class="user_right">
			<div class="layui-block">
				 <img src="<%=path %>/contract/<%=archive.getImage()%>.jpg" class="layui-circle" id="userFace">
				<%--  <img src="<%=path %>/images/admin.jpg" class="layui-circle" id="userFace"> --%>
			</div>
			<p style="font-size:18px;">合同详情</p>		
		</div>
	</form>
	<script type="text/javascript" src="<%=path %>/layui/layui.js"></script>
	<script type="text/javascript" src="<%=path %>/page/archive/archiveDetial.js"></script>
</body>
</html>