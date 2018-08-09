<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<%@page import="com.javen.model.User"%>
<%@page import="com.javen.model.Record"%>
<% String path = request.getContextPath();
User user=(User)session.getAttribute("loged");
String from=(String)session.getAttribute("from");
String did=(String)session.getAttribute("did");
String sealname=(String)session.getAttribute("recordseal");
Record record=(Record)session.getAttribute("RecordInfo");
String status="",reason="";
if("ok".equals(record.getStatus())){
	status="审批通过";
}else{
	if("fail".equals(record.getStatus())){
		status="审核失败";
	}else{
		if(record.getStatus().equals("will")){
			status="待审核";
		}else{
			status="已过期";
		}
	}
}
if(record.getReason()!=null){
    reason=record.getReason();
}else{
    reason="无";
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
	<link rel="stylesheet" href="<%=path %>/css/font_eolqem241z66flxr.css" media="all" />
	<link rel="stylesheet" href="<%=path %>/css/user.css" media="all"/>
</head>
<body class="childrenBody">
	<form class="layui-form">
		<div class="user_left">
			<div class="layui-form-item">
			    <label class="layui-form-label">历史记录ID</label>
			    <div class="layui-input-block">
			    	<input type="text" value="<%=record.getId() %>" disabled class="layui-input layui-disabled">
			    </div>
			</div>
			<div class="layui-form-item">
			    <label class="layui-form-label">申请人</label>
			    <div class="layui-input-block">
			    	<input type="text" value="<%=from%>" disabled class="layui-input layui-disabled">
			    </div>
			</div>
			<div class="layui-form-item">
			    <label class="layui-form-label">合同状态</label>
			    <div class="layui-input-block">
			    	<input type="text" value="<%=status%>" disabled class="layui-input layui-disabled">
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
			    	<input type="text" value="<%=record.getTime()%>" disabled class="layui-input layui-disabled">
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
			    	<input type="text" value="<%=record.getTimes()%>" disabled class="layui-input layui-disabled">
			    </div>
			</div>
			<div class="layui-form-item">
			    <label class="layui-form-label">处理原因</label>
			    <div class="layui-input-block">
			    	<textarea placeholder="请输入内容摘要" disabled class="layui-textarea"><%=reason%></textarea>
			    </div>
			</div>
		</div>
		<div class="user_right">
			<div class="layui-block">
				<a href="javascript:DataHtml('admin.jpg','<%=path %>/contract/<%=record.getImagesUrl()%>.jpg')">
					 <img src="<%=path %>/contract/<%=record.getImagesUrl()%>.jpg" class="layui-circle" id="userFace">
				</a>
				<%-- <a href="javascript:DataHtml('admin.jpg','<%=path %>/images/admin.jpg')">
				 	<img src="<%=path %>/images/admin.jpg" class="layui-circle" id="userFace">
				</a> --%>
				 
			</div>
			<img alt="" style="display:none" id="displayimg" src="" />
			<p style="font-size:18px;">合同详情</p>		
		</div>
	</form>
	<script type="text/javascript" src="<%=path %>/layui/layui.js"></script>
	<script type="text/javascript" src="<%=path %>/page/record/recordDetial.js"></script>
</body>
</html>