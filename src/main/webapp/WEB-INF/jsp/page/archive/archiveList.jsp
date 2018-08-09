<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<% String path = request.getContextPath();%>
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
	<link rel="stylesheet" href="<%=path %>/css/font_eolqem241z66flxr.css" media="all" />
	<link rel="stylesheet" href="<%=path %>/css/archive.css" media="all" />
</head>
<body class="childrenBody">
	<blockquote class="layui-elem-quote news_search">
		<div class="layui-inline">
		    <div class="layui-input-inline">
		    	<input type="text" value="" placeholder="请输入关键字" class="layui-input search_input">
		    </div>
		    <a class="layui-btn search_btn">查询</a>
		</div>
	</blockquote>
	<div class="layui-form news_list">
	  	<table class="layui-table">
		    <colgroup>
				<col width="50">
				<col>
				<col width="16%">
				<col width="16%">
				<col width="16%">
				<col width="16%">
				<col width="18%">
		    </colgroup>
		    <thead>
				<tr>
					<th><input type="checkbox" name="" lay-skin="primary" lay-filter="allChoose" id="allChoose"></th>
					<th style="text-align:left;">归档合同ID</th>
					<th>申请人工号</th>
					<th>处理人工号</th>
					<th>处理时间</th>
					<th>印章次数</th>
					<th>操作</th>
				</tr> 
		    </thead>
		    <tbody class="archive_content"></tbody>
		</table>
	</div>
	<div id="page"></div>
	<script type="text/javascript" src="<%=path %>/layui/layui.js"></script>
	<script type="text/javascript" src="<%=path %>/page/archive/archiveList.js"></script>
</body>
</html>