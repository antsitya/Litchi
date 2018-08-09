<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<%@page import="com.javen.model.User"%>
<% String path = request.getContextPath();
User user=(User)session.getAttribute("loged");
String identy="",nan="",nv="";
switch(user.getAdmin()){
	case 0: identy="普通员工";break;
	case 1: identy="合同管理员";break;
	case 2: identy="财务经理";break;
	case 3: identy="销售经理";break;
	case 4: identy="行政经理";break;
	case 5: identy="研发经理";break;
	case 6: identy="产品经理";break;
	case 7: identy="总经理";break;
	default: identy="出现错误";break;
}
	if(user.getSex().equals("nan")){
	    nan="checked";
	    nv="";
	}else{
	    nv="checked";
	    nan="";
	}
%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>荔枝云章-个人资料</title>
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
			    <label class="layui-form-label">工号</label>
			    <div class="layui-input-block">
			    	<input type="text" value="<%=user.getEmployeeId()%>" disabled class="layui-input layui-disabled">
			    </div>
			</div>
			<div class="layui-form-item">
			    <label class="layui-form-label">职位</label>
			    <div class="layui-input-block">
			    	<input type="text" value="<%=identy%>" disabled class="layui-input layui-disabled">
			    </div>
			</div>
			<div class="layui-form-item">
			    <label class="layui-form-label">姓名</label>
			    <div class="layui-input-block">
			    	<input type="text" value="<%=user.getName()%>" disabled class="layui-input layui-disabled">
			    </div>
			</div>
			<div class="layui-form-item">
				<div class="layui-inline">
				    <label class="layui-form-label">性别</label>
				    <div class="layui-input-block userSex">
				      	<input type="radio" name="sex" value="男" title="男" <%=nan%>>
				      	<input type="radio" name="sex" value="女" title="女" <%=nv%>>
				    </div>
			    </div>
			</div>
			<div class="layui-form-item">
			    <label class="layui-form-label">手机号码</label>
			    <div class="layui-input-block">
			    	<input id="telInfo" type="tel" value="<%=user.getTel()%>" placeholder="请输入手机号码" lay-verify="required|phone" class="layui-input">
			    </div>
			</div>
			<div class="layui-form-item">
			    <label class="layui-form-label">邮箱</label>
			    <div class="layui-input-block">
			    	<input id="emailInfo" type="text" value="<%=user.getEmail()%>" placeholder="请输入邮箱" lay-verify="required|email" class="layui-input">
			    </div>
			</div>
		</div>
		<div class="user_right">
			<img src="<%=path %>/images/admin.jpg" class="layui-circle" id="userFace">
		</div>
		<div class="layui-form-item" style="margin-left: 5%;">
		    <div class="layui-input-block">
		    	<button class="layui-btn" lay-submit="" lay-filter="changeUser">立即修改</button>
		    </div>
		</div>
	</form>
	<script type="text/javascript" src="<%=path %>/layui/layui.js"></script>
	<script type="text/javascript" src="<%=path %>/page/user/user.js"></script>
</body>
</html>