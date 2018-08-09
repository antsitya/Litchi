layui.config({
	base : "/Litchi/js/"
}).use(['form','layer','jquery','layedit','laydate'],function(){
	var form = layui.form(),
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		laypage = layui.laypage,
		layedit = layui.layedit,
		laydate = layui.laydate,
		$ = layui.jquery;
 	//同意审批
    form.on("submit(agree)",function(data){
    	layer.open({
    		  title: '确认审批',
    	      content:'<h1 id="hs">请输入印章次数</h1><input id="times" type="number" placeholder="输入印章次数1" class="layui-input"/>',
    		  btn: ['确认印章'],
    		  yes: function(index, layero){
    			  console.log("0");
    			  var id=$("#id").val();
    			  console.log("11");
    			  var times=$("#times").val();
    			  $(layero).find("input").each(function(i, v) {
    				  times=$(v).val();
    		      });
    			  console.log("2");
    			  var hs=$("#hs").html();
    			  var didid=$("#didid").html();
    			  console.log("审批id:" + id+",印章次数:"+times+"处理人："+didid+",hs:"+hs);
    			  $.ajax({
    		            url: "/Litchi/cilent/accept.do",
    		            data: {                          //数据
    		            	id:id,
    		            	times:times,
    		            	didid:didid
    		            },
    		            type: "POST",                   //类型，POST或者GET
    		            success: function (data) {      //成功，回调函数
    		            	if(data=="success"){
    		            		layer.msg("审批成功！"); 
    		                    window.location.reload();//刷新当前页面.
    		            	}else{
    		          		layer.msg("审批失败！");
    		            	}
    		            },
    		            error: function (er) {          //失败，回调函数
    		            	ErroAlert('请求出错!');
    		            }
    		        });
    		  }
    	});
    	return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    })
    //拒绝审批
//    	layer.msg("点击了拒绝按钮！");
    form.on("submit(refuse)",function(data){
        	layer.open({
        		  type: 0, 
        		  title: '拒绝审批',
        		  content: '<h1>请输入拒绝原因</h1><textarea id="reason" placeholder="请输入拒绝原因" class="layui-textarea"></textarea>'
        		  ,btn: ['拒绝印章'],
        		  yes: function(index, layero){
        			  var id=$("#id").val();
        			  console.log("11");
	        			 var reason;
        			  $(layero).find("textarea").each(function(i, v) {
        				  reason=$(v).val();
        		      });
        			  console.log("2");
        			  var didid=$("#didid").html();
        			  console.log("审批id:" + id+",原因:"+reason+"处理人："+didid);
        			  $.ajax({
        		            url: "/Litchi/cilent/deny.do",
        		            data: {                          //数据
        		            	id:id,
        		            	reason:reason,
        		            	didid:didid
        		            },
        		            type: "POST",                   //类型，POST或者GET
        		            success: function (data) {      //成功，回调函数
        		            	if(data=="success"){
        		            		layer.msg("审批成功！"); 
        		                    window.location.reload();//刷新当前页面.
        		            	}else{
        		          		layer.msg("审批失败！");
        		            	}
        		            },
        		            error: function (er) {          //失败，回调函数
        		            	ErroAlert('请求出错!');
        		            }
        		        });
        			  
        			  
        			  layer.msg("点击了拒绝按钮！"); 
        		 }
        });
    	
    	
    	
    	
//    	var tel=$('input[id="telInfo"]').val();
//    	var email=$('input[id="emailInfo"]').val();
//    	var sex=$('input[name="sex"]').val();
//    	console.log("tel:"+tel+",email:"+email+"sex:"+sex);
//    	$.ajax({
//            url: "/Litchi/user/updateInfoSelf.do",
//            data: {                          //数据
//            	sex:sex,
//            	tel:tel,
//            	email:email
//            },
//            type: "POST",                   //类型，POST或者GET
//            success: function (data) {      //成功，回调函数
//            	if(data=="success"){
//            		layer.msg("基本信息修改成功！");
//                    window.location.reload();//刷新当前页面.
//            	}else{
//          		layer.msg("手机号已注册！");
//            	}
//            },
//            error: function (er) {          //失败，回调函数
//            	ErroAlert('请求出错!');
//            }
//        });
    	return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    })
	
})
