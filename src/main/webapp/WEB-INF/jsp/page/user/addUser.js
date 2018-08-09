var $;
layui.config({
	base : "/Litchi/js/"
}).use(['form','layer','jquery'],function(){
	var form = layui.form(),
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		laypage = layui.laypage;
		$ = layui.jquery;
		$form = $('form');
//添加验证规则
        form.verify({
        	comid : function(value, item){
                if(value.length > 6){
                    return "工号不能超过6位";
                }
            },
            newPwd : function(value, item){
                if(value.length < 6){
                    return "密码长度不能小于6位";
                }
            },
            confirmPwd : function(value, item){
                if(!new RegExp($("#newPwds").val()).test(value)){
                    return "两次输入密码不一致，请重新输入！";
                }
            }
        })
 	form.on("submit(addUser)",function(data){
 		//是否添加过信息
//	 	if(window.sessionStorage.getItem("addUser")){
//	 		addUserArray = JSON.parse(window.sessionStorage.getItem("addUser"));
//	 	}
		var employid,comid,name,sex,admin,tel,email,pw;
		employid=$(".userid").val();
		comid=$("#comid").html();
		name=$(".userName").val();
		sex=data.field.sex;
		tel=$(".tel").val();
		admin=data.field.userGrade;
		email=$(".userEmail").val();
		pw=$(".userpw").val();
		
		console.log("employid:"+employid+",comid:"+comid+",name:"+name+",sex:"+sex+",admin:"+admin+",tel:"+tel+",email:"+email+",pw:"+pw);
   		var index = top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:0.8});
 		$.ajax({
              url: "/Litchi/user/doadduser.do",
              data: {                          //数据
              	employid:employid,
				comid:comid,
				name:name,
				sex:sex,
				tel:tel,
				admin:admin,
				email:email,
				pw:pw
              },
              type: "POST",                   //类型，POST或者GET
              success: function (data) {      //成功，回调函数
              	if(data=="success"){
              		top.layer.close(index);
						top.layer.msg("用户添加成功！");
			 			layer.closeAll("iframe");
				 		//刷新父页面
						parent.location.reload();
              	}else{
              		top.layer.close(index);
					top.layer.msg("用户添加失败(手机号或工号已存在)！");
              	}
              },
              error: function (er) {          //失败，回调函数
              	top.layer.close(index);
					top.layer.msg("请求出错！");
              }
          });
 		return false;
 	});
        
     	form.on("submit(editUser)",function(data){
    		var employid,comid,name,sex,admin,tel,email,pw;
    		employid=$(".userid").val();
    		comid=$("#comid").html();
    		name=$(".userName").val();
    		sex=data.field.sex;
    		tel=$(".tel").val();
//    		admin=data.field.userGrade;
    		email=$(".userEmail").val();
    		pw=$(".userpw").val();
    		
    		console.log("employid:"+employid+",comid:"+comid+",name:"+name+",sex:"+sex+",tel:"+tel+",email:"+email+",pw:"+pw);
       		var index = top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:0.8});
     		$.ajax({
                  url: "/Litchi/user/doedituser.do",
                  data: {                          //数据
                  	employid:employid,
    				comid:comid,
    				name:name,
    				sex:sex,
    				tel:tel,
    				email:email,
    				pw:pw
                  },
                  type: "POST",                   //类型，POST或者GET
                  success: function (data) {      //成功，回调函数
                  	if(data=="success"){
                  		top.layer.close(index);
    						top.layer.msg("用户修改成功！");
    			 			layer.closeAll("iframe");
    				 		//刷新父页面
    						parent.location.reload();
                  	}else{
                  		top.layer.close(index);
    					top.layer.msg("用户添加失败(手机号或工号已存在)！");
                  	}
                  },
                  error: function (er) {          //失败，回调函数
                  	top.layer.close(index);
    					top.layer.msg("请求出错！");
                  }
              });
     		return false;
     	});
	
});
