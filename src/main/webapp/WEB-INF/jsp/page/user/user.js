var $form;
var form;
var $;
layui.config({
	base : "/Litchi/js/"
}).use(['form','layer','upload','laydate'],function(){
	form = layui.form();
	var layer = parent.layer === undefined ? layui.layer : parent.layer;
		$ = layui.jquery;
		$form = $('form');
		laydate = layui.laydate;

        //添加验证规则
        form.verify({
            oldPwd : function(value, item){
            	var pw=$("#pw").html();
                if(value != pw){
                    return "密码错误，请重新输入！";
                }
            },
            newPwd : function(value, item){
                if(value.length < 6){
                    return "密码长度不能小于6位";
                }
            },
            confirmPwd : function(value, item){
                if(!new RegExp($("#oldPwd").val()).test(value)){
                    return "两次输入密码不一致，请重新输入！";
                }
            }
        })

        //提交个人资料
        form.on("submit(changeUser)",function(data){
        	var tel=$('input[id="telInfo"]').val();
        	var email=$('input[id="emailInfo"]').val();
        	var sex=$('input[name="sex"]').val();
        	console.log("tel:"+tel+",email:"+email+"sex:"+sex);
        	$.ajax({
                url: "/Litchi/user/updateInfoSelf.do",
                data: {                          //数据
                	sex:sex,
                	tel:tel,
                	email:email
                },
                type: "POST",                   //类型，POST或者GET
                success: function (data) {      //成功，回调函数
                	if(data=="success"){
                		layer.msg("基本信息修改成功！");
                        window.location.reload();//刷新当前页面.
                	}else{
              		layer.msg("手机号已注册！");
                	}
                },
                error: function (er) {          //失败，回调函数
                	ErroAlert('请求出错!');
                }
            });
        	return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
        })
        //修改密码
        form.on("submit(changePwd)",function(data){
        	
        	var pwds=$('input[name="nPwd"]').val();
//        	layer.msg("新密码："+pwds);
        	$.ajax({
                url: "/Litchi/user/doChangePW.do",
                data: {                          //数据
                	npw:pwds
                },
                type: "POST",                   //类型，POST或者GET
                success: function (data) {      //成功，回调函数
                	if(data=="success"){
                		layer.msg("密码修改成功！");
                        $(".pwd").val('');
                        parent.location.reload();
//                        window.location.reload();//刷新当前页面.
                	}else{
                		layer.msg("密码修改出错！");
                	}
                },
                error: function (er) {          //失败，回调函数
                	ErroAlert('请求出错!');
                }
            });
          	return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
        })

})