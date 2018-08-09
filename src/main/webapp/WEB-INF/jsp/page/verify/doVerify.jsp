<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<%@page import="com.javen.model.User"%>
<%@page import="com.javen.model.Record"%>
<% String path = request.getContextPath();
User user=(User)session.getAttribute("loged");
String from=(String)session.getAttribute("from");
String did=(String)session.getAttribute("did");
String sealname=(String)session.getAttribute("recordseal");
Record verify=(Record)session.getAttribute("VerifyInfo");
%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>荔枝云章-审批</title>
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

<div id="didid" style="visibility: hidden;display:none;"><%=user.getEmployeeId()%></div>
	<form class="layui-form">
		<div class="user_left">
			<div class="layui-form-item">
			    <label class="layui-form-label">审批ID</label>
			    <div class="layui-input-block">
			    	<input type="text" id="id" value="<%=verify.getId() %>" disabled class="layui-input layui-disabled">
			    </div>
			</div>
			<div class="layui-form-item">
			    <label class="layui-form-label">申请人</label>
			    <div class="layui-input-block">
			    	<input type="text" value="<%=from%>" disabled class="layui-input layui-disabled">
			    </div>
			</div>
			<div class="layui-form-item">
			    <label class="layui-form-label">申请时间</label>
			    <div class="layui-input-block">
			    	<input type="text" value="<%=verify.getTime()%>" disabled class="layui-input layui-disabled">
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
			    	<input type="text" value="<%=verify.getTimes()%>" disabled class="layui-input layui-disabled">
			    </div>
			</div>
			<div class="layui-form-item" style="margin-left: 5%;">
		    <div class="layui-input-block">
		    	<button class="layui-btn" lay-submit="" lay-filter="agree">同意</button>
		    	<button class="layui-btn" lay-submit="" lay-filter="refuse">拒绝</button>
		    </div>
		</div>
		</div>
		<div class="user_right">
			<div class="layui-block">
				 <img src="<%=path %>/contract/<%=verify.getImagesUrl()%>.jpg" class="layui-circle" id="userFace">
				 <%-- <img src="<%=path %>/images/admin.jpg" class="layui-circle" id="userFace"> --%>
			</div>
			<p style="font-size:18px;">合同详情</p>		
		</div>
	</form>
	<script type="text/javascript" src="<%=path %>/layui/layui.js"></script>
	<script type="text/javascript" src="<%=path %>/page/verify/doVerify.js"></script>
</body>
</html>