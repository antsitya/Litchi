<%@page import="com.javen.model.User"%>
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<% String path = request.getContextPath();
User user=(User)session.getAttribute("edituser");
String identy="",nan="",nv="",htmls="";
	if(user.getSex().equals("nan")){
	    nan="checked";
	    nv="";
	}else{
	    nv="checked";
	    nan="";
	}
	String hide="";
	if(user.getAdmin()!=7){
	    hide="visibility:hidden;";
	}
%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>荔枝云章-</title>
	<meta name="renderer" content="webkit">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="format-detection" content="telephone=no">
	<link rel="stylesheet" href="<%=path %>/layui/css/layui.css" media="all" />
	<style type="text/css">
		.layui-form-item .layui-inline{ width:33.333%; float:left; margin-right:0; }
		@media(max-width:1240px){
			.layui-form-item .layui-inline{ width:100%; float:none; }
		}
	</style>
</head>
<body class="childrenBody">
	<form class="layui-form" style="width:80%;">
		<div id="comid" style="visibility: hidden;"><%=user.getCompanyId() %></div>
		<div class="layui-form-item">
			<label class="layui-form-label">工号</label>
			<div class="layui-input-block">
				<input type="text" class="layui-input userid" value="<%=user.getEmployeeId()%>"  disabled lay-verify="required|comid" placeholder="请输入工号">
			</div>
		</div>
		<div class="layui-form-item">
			<label class="layui-form-label">姓名</label>
			<div class="layui-input-block">
				<input type="text" class="layui-input userName" value="<%=user.getName()%>" lay-verify="required|name" placeholder="请输入姓名">
			</div>
		</div>
		<div class="layui-form-item">
			<div class="layui-inline">
			    <label class="layui-form-label">性别</label>
			    <div class="layui-input-block userSex">
			      	<input type="radio" name="sex" value="nan" title="男" <%=nan%>>
			      	<input type="radio" name="sex" value="nv" title="女" <%=nv%>>
			    </div>
		    </div>
		</div>
		<div class="layui-form-item">
			<label class="layui-form-label">手机号</label>
			<div class="layui-input-block">
				<input type="text" class="layui-input tel" value="<%=user.getTel()%>" lay-verify="required|phone" placeholder="请输入手机号">
			</div>
		</div>
		<div class="layui-form-item">
			<label class="layui-form-label">邮箱</label>
			<div class="layui-input-block">
				<input type="text" class="layui-input userEmail" value="<%=user.getEmail()%>" lay-verify="required|email" placeholder="请输入邮箱">
			</div>
		</div>
		<label class="layui-form-label" style="<%=hide%>">密码</label>
			<div class="layui-input-block" style="<%=hide%>">
				<input type="text" class="layui-input userpw" id="newPwds" value="<%=user.getPassword()%>" lay-verify="required|newPwd" placeholder="请输入密码">
			</div>
		</div>
		<div class="layui-form-item">
			<div class="layui-input-block">
				<button class="layui-btn" lay-submit="" lay-filter="editUser">立即修改</button>
		    </div>
		</div>
	</form>
	<script type="text/javascript" src="<%=path %>/layui/layui.js"></script>
	<script type="text/javascript" src="<%=path %>/page/user/addUser.js"></script>
</body>
</html>