<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<% String path = request.getContextPath(); 
System.out.println(path);
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN">


<html>

	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<title>荔枝云章管理系统登陆</title>
		<!--必要样式-->
		<link rel="icon" href="<%=path %>/images/favicon.png">
		<link href="<%=path %>/css/styles.css" rel="stylesheet" type="text/css" />
		<link href="<%=path %>/css/demo.css" rel="stylesheet" type="text/css" />
	</head>

	<body>
		<div class='login'>
			<div class="login_body">

				<div class='login_title'>
					<span>荔枝云章管理系统</span>
				</div>
				<div class='login_fields'>
					<div class='login_fields__user'>
						<div class='icon'>
							<img alt="" src='<%=path %>/images/user_icon_copy.png'>
						</div>
						<input name="login" placeholder='账号（手机号）' maxlength="16" type='text' autocomplete="off" />
						<div class='validation'>
							<img alt="" src='<%=path %>/images/tick.png'>
						</div>
					</div>
					<div class='login_fields__password'>
						<div class='icon'>
							<img alt="" src='<%=path %>/images/lock_icon_copy.png'>
						</div>
						<input name="pwd" placeholder='密码' maxlength="16" type='password' autocomplete="off">
						<div class='validation'>
							<img alt="" src='<%=path %>/images/tick.png'>
						</div>
					</div>
					<div class='login_fields__password'>
						<div class='icon'>
							<img alt="" src='<%=path %>/images/key.png'>
						</div>
						<input name="code" placeholder='验证码' maxlength="4" type='text' name="ValidateNum" autocomplete="off">
						<div class='validation' style="opacity: 1; right: -5px;top: -3px;">
							<canvas class="J_codeimg" id="myCanvas" onclick="Code();">对不起，您的浏览器不支持canvas，请下载最新版浏览器!</canvas>
						</div>
					</div>
					<div class='login_fields__submit'>
						<input type='button' value='登录'>
					</div>
				</div>
				<div class='disclaimer'>
					<p>© 2018 荔枝云章 版权所有</p>
				</div>

			</div>

		</div>
		<link href="<%=path %>/layui/css/layui.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="<%=path %>/js/jquery.min.js"></script>
		<script type="text/javascript" src="<%=path %>/layui/layui.js"></script>
		<script type="text/javascript" src="<%=path %>/js/Treatment.js"></script>
		<script type="text/javascript">
			var canGetCookie = 0; //是否支持存储Cookie 0 不支持 1 支持
			var CodeVal = 0;
			Code();
			function Code() {
				if(canGetCookie == 1) {
					createCode("AdminCode");
					var AdminCode = getCookieValue("AdminCode");
					showCheck(AdminCode);
				} else {
					showCheck(createCode(""));
				}
			}

			function showCheck(a) {
				CodeVal = a;
				var c = document.getElementById("myCanvas");
				var ctx = c.getContext("2d");
				ctx.clearRect(0, 0, 1000, 1000);
				ctx.font = "80px 'Hiragino Sans GB'";
				ctx.fillStyle = "#E8DFE8";
				ctx.fillText(a, 0, 100);
			}
			$(document).keypress(function(e) {
				// 回车键事件  
				if(e.which == 13) {
					$('input[type="button"]').click();
				}
			});

			layui.use('layer', function() {
				$('input[type="button"]').click(function() {
					var login = $('input[name="login"]').val();
					var pwd = $('input[name="pwd"]').val();
					var code = $('input[name="code"]').val();
					if(login == '') {
						ErroAlert('请输入您的账号');
					} else if(pwd == '') {
						ErroAlert('请输入密码');
					} else if(code == '' || code.length != 4) {
						ErroAlert('输入验证码');
					} else {
						if(code.toUpperCase() != CodeVal.toUpperCase()) {
							ErroAlert('验证码不正确');
							Code();
						} else {
							$.ajax({
				                url: "<%=path %>/user/login.do",
				                data: {                          //数据
				                    name:login,
				                    pw:pwd
				                },
				                type: "POST",                   //类型，POST或者GET
				                success: function (data) {    //成功，回调函数
				                	if(data=="success"){
				                		location.href="<%=path %>/user/loginSuccess.do";
				                	}else{
				                		if(data=="nopermission"){
				                			ErroAlert('您没有登陆权限!');
				                		}else{
				                			ErroAlert('账号或密码错误!');
				                		}
				                		setTimeout(function(){
					                		window.location.reload();//刷新当前页面.
					                		},2000);
				                	}
				                },
				                error: function (er) {          //失败，回调函数
				                	ErroAlert('请求出错!');
				                }
				            });
						}
					}
				});
			});
		</script>
	</body>

</html>