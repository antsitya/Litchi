<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<% String path = request.getContextPath();%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>荔枝云章-图片上传</title>
<script type="text/javascript" src="<%=path %>/js/jquery.min.js"></script>
</head>
<body>
<form id="test">  
	选择文件:<input data-role="none" type="file" name="file" width="120px">  
	<button data-role="none" onclick="testUpload();">测试</button>
</form>
<script type="text/javascript">
/* function testUpload(){
	alert("开始上传");
	var form = new FormData(document.getElementById("test"));
	var index=1;
	$.ajax({
		url :"/Litchi/cilent/sendimg.do",
		data : form,
		type : 'post',
		processData:false,
        contentType:false,
        success : function(data){
        	alert("成功");
        },
        error : function(data){
        	alert("失败");
        }
	});
} */
function testUpload(){
	console.log("开始上传");
	var form = new FormData(document.getElementById("test"));
	var index=1;
	form.append(index："1");
	$.ajax({
		url :"/Litchi/cilent/sendimg.do",
		data : form,
		type : 'post',
		processData:false,
        contentType:false,
        success : function(data){
        	alert("成功");
        },
        error : function(data){
        	alert("失败");
        }
	});
}
</script>
</body>
</html>