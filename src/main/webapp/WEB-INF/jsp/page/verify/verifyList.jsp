<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<% String path = request.getContextPath();%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>荔枝云章-</title>
<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport"
	content="width=device-width, initial-scale=1, maximum-scale=1">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="format-detection" content="telephone=no">
<link rel="stylesheet" href="<%=path %>/layui/css/layui.css" media="all" />
<link rel="stylesheet" href="<%=path %>/css/font_eolqem241z66flxr.css"
	media="all" />
<link rel="stylesheet" href="<%=path %>/css/verify.css" media="all" />
</head>
<body class="childrenBody">
	<form class="layui-form">
		<blockquote class="layui-elem-quote news_search">
			<div class="layui-inline selectMsg">
				<select name="msgColl" lay-filter="selectMsg">
					<option value="0">待审核</option>
					<option value="1">已审核</option>
				</select>
			</div>
			<div class="layui-inline">
				<div class="layui-form-mid layui-word-aux">请根据实际情况，严格把控印章的使用</div>
			</div>
		</blockquote>
		<div class="layui-form news_list">
			<table class="layui-table">
				<colgroup>
					<col width="16%">
					<col width="16%">
					<col width="16%">
					<col width="16%">
					<col width="16%">
					<col width="20%">
					<col>
				</colgroup>
				<thead>
					<tr>
						<th style="text-align: center;" id="vtitle">待审核ID</th>
						<th style="text-align: center;">申请人ID</th>
						<th style="text-align: center;">申请时间</th>
						<th style="text-align: center;">处理状态</th>
						<th style="text-align: center;">所需/印章次数</th>
						<th style="text-align: center;">操作</th>
					</tr>
				</thead>
				<tbody class="verity_content"></tbody>
			</table>
		</div>
		<div id="page"></div>
	</form>
	<script type="text/javascript" src="<%=path %>/layui/layui.js"></script>
	<script type="text/javascript" src="<%=path %>/page/verify/verify.js"></script>
</body>
</html>