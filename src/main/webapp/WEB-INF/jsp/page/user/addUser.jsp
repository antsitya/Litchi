<%@page import="com.javen.model.User"%>
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<% String path = request.getContextPath();
User user=(User)session.getAttribute("loged");
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
				<input type="text" class="layui-input userid" lay-verify="required|comid" placeholder="请输入工号">
			</div>
		</div>
		<div class="layui-form-item">
			<label class="layui-form-label">姓名</label>
			<div class="layui-input-block">
				<input type="text" class="layui-input userName" lay-verify="required|name" placeholder="请输入姓名">
			</div>
		</div>
		<div class="layui-form-item">
			<div class="layui-inline">
			    <label class="layui-form-label">性别</label>
			    <div class="layui-input-block userSex">
			      	<input type="radio" name="sex" value="nan" title="男" checked>
			      	<input type="radio" name="sex" value="nv" title="女">
			    </div>
		    </div>
		    <div class="layui-inline">
			    <label class="layui-form-label">职位</label>
				<div class="layui-input-block">
					<select name="userGrade" class="userGrade" lay-filter="userGrade">
						<option value="0">普通员工</option>
						<option value="1">合同管理员</option>
				        <option value="2">财务经理</option>
				        <option value="3">销售经理</option>
				        <option value="4">行政经理</option>
						<option value="5">研发经理</option>
				        <option value="6">产品经理</option>
				    </select>
				</div>
		    </div>
		    <div class="layui-form-item">
			<label class="layui-form-label">手机号</label>
			<div class="layui-input-block">
				<input type="text" class="layui-input tel" lay-verify="required|phone" placeholder="请输入手机号">
			</div>
		</div>
		<div class="layui-form-item">
			<label class="layui-form-label">邮箱</label>
			<div class="layui-input-block">
				<input type="text" class="layui-input userEmail" lay-verify="required|email" placeholder="请输入邮箱">
			</div>
		</div>
		<label class="layui-form-label">密码</label>
			<div class="layui-input-block">
				<input type="text" class="layui-input userpw" id="newPwds" lay-verify="required|newPwd" placeholder="请输入密码">
			</div>
		</div>
		<label class="layui-form-label">确认密码</label>
			<div class="layui-input-block">
				<input type="text" class="layui-input userrpw" lay-verify="required|confirmPwd"" placeholder="请确认输入密码">
			</div>
		</div>
		<div class="layui-form-item">
			<div class="layui-input-block">
				<button class="layui-btn" lay-submit="" lay-filter="addUser">立即添加</button>
				<button type="reset" class="layui-btn layui-btn-primary">重置</button>
		    </div>
		</div>
	</form>
	<script type="text/javascript" src="<%=path %>/layui/layui.js"></script>
	<script type="text/javascript" src="<%=path %>/page/user/addUser.js"></script>
</body>
</html>