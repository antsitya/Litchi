layui.config({
	base : "/Litchi/js/"
}).use(['form','layer','jquery','laypage'],function(){
	var form = layui.form(),
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		laypage = layui.laypage,
		$ = layui.jquery;
	console.log("加载页面数据pppp");
	//加载页面数据
	var usersData = '';
	$.ajax({
        url: "/Litchi/user/count.do",
        data: {                          //数据
        },
        type: "POST",                   //类型，POST或者GET
        success: function (data) {
        	usersList(data);
        },
        error: function (er) {          //失败，回调函数
        	ErroAlert('请求出错!');
        }
  });

	
	//查询
	$(".search_btn").click(function(){
		var userArray = [];
		if($(".search_input").val() != ''){
			var index = layer.msg('查询中，请稍候',{icon: 16,time:false,shade:0.8});
              setTimeout(function(){
              	$.ajax({
					url : "/Litchi/json/usersList.json",
					type : "get",
					dataType : "json",
					success : function(data){
						if(window.sessionStorage.getItem("addUsers")){
							var addUsers = window.sessionStorage.getItem("addUsers");
							usersData = JSON.parse(addUsers).concat(data);
						}else{
							usersData = data;
						}
						for(var i=0;i<usersData.length;i++){
							var usersStr = usersData[i];
							var selectStr = $(".search_input").val();
		            		function changeStr(data){
		            			var dataStr = '';
		            			var showNum = data.split(eval("/"+selectStr+"/ig")).length - 1;
		            			if(showNum > 1){
									for (var j=0;j<showNum;j++) {
		            					dataStr += data.split(eval("/"+selectStr+"/ig"))[j] + "<i style='color:#03c339;font-weight:bold;'>" + selectStr + "</i>";
		            				}
		            				dataStr += data.split(eval("/"+selectStr+"/ig"))[showNum];
		            				return dataStr;
		            			}else{
		            				dataStr = data.split(eval("/"+selectStr+"/ig"))[0] + "<i style='color:#03c339;font-weight:bold;'>" + selectStr + "</i>" + data.split(eval("/"+selectStr+"/ig"))[1];
		            				return dataStr;
		            			}
		            		}
		            		//用户名
		            		if(usersStr.userName.indexOf(selectStr) > -1){
			            		usersStr["userName"] = changeStr(usersStr.userName);
		            		}
		            		//用户邮箱
		            		if(usersStr.userEmail.indexOf(selectStr) > -1){
			            		usersStr["userEmail"] = changeStr(usersStr.userEmail);
		            		}
		            		//性别
		            		if(usersStr.userSex.indexOf(selectStr) > -1){
			            		usersStr["userSex"] = changeStr(usersStr.userSex);
		            		}
		            		//会员等级
		            		if(usersStr.userGrade.indexOf(selectStr) > -1){
			            		usersStr["userGrade"] = changeStr(usersStr.userGrade);
		            		}
		            		if(usersStr.userName.indexOf(selectStr)>-1 || usersStr.userEmail.indexOf(selectStr)>-1 || usersStr.userSex.indexOf(selectStr)>-1 || usersStr.userGrade.indexOf(selectStr)>-1){
		            			userArray.push(usersStr);
		            		}
		            	}
		            	usersData = userArray;
		            	usersList(usersData);
					}
				})
              	
                  layer.close(index);
              },2000);
		}else{
			layer.msg("请输入需要查询的内容");
		}
	})

    //全选
	form.on('checkbox(allChoose)', function(data){
		var child = $(data.elem).parents('table').find('tbody input[type="checkbox"]:not([name="show"])');
		child.each(function(index, item){
			item.checked = data.elem.checked;
		});
		form.render('checkbox');
	});

	//通过判断文章是否全部选中来确定全选按钮是否选中
	form.on("checkbox(choose)",function(data){
		var child = $(data.elem).parents('table').find('tbody input[type="checkbox"]:not([name="show"])');
		var childChecked = $(data.elem).parents('table').find('tbody input[type="checkbox"]:not([name="show"]):checked')
		if(childChecked.length == child.length){
			$(data.elem).parents('table').find('thead input#allChoose').get(0).checked = true;
		}else{
			$(data.elem).parents('table').find('thead input#allChoose').get(0).checked = false;
		}
		form.render('checkbox');
	})
	//添加会员
	$(".usersAdd_btn").click(function(){
		var index = layui.layer.open({
			title : "添加会员",
			type : 2,
			content : "/Litchi/user/toaddUser.do",
			success : function(layero, index){
				layui.layer.tips('点击此处返回文章列表', '.layui-layer-setwin .layui-layer-close', {
					tips: 3
				});
			}
		})
		//改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
		$(window).resize(function(){
			layui.layer.full(index);
		})
		layui.layer.full(index);
	})
	//操作
	$("body").on("click",".users_edit",function(){
		var _this = $(this);
		var empid=_this.attr("data-id");
		console.log(empid);
		var url="/Litchi/user/toeditUser.do?empid="+empid;
		console.log("url:"+url);
		var index = layui.layer.open({
			title : "添加会员",
			type : 2,
			content : url,
			success : function(layero, index){
				layui.layer.tips('点击此处返回文章列表', '.layui-layer-setwin .layui-layer-close', {
					tips: 3
				});
			}
		})
		//改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
		$(window).resize(function(){
			layui.layer.full(index);
		})
		layui.layer.full(index);
	})

	function usersList(count){
		//渲染数据
		function renderDate(data){
			var dataHtml = '';
			console.log(")))))))))))))))))))"+data);
//			currData = usersData.concat().splice(curr*nums-nums, nums);
//			currData = usersData.concat();
//			currData = usersData;
			currData=JSON.parse(data);
			console.log("(((((((((((((((currData:"+currData);
			var admin,sex;
			if(currData.length != 0){
				for(var i=0;i<currData.length;i++){
					if(currData[i].sex=="nan"){
						sex="男";
					}else{
						sex="女";
					}
					switch (currData[i].admin) {
						case 0:admin="普通员工";break;
						case 1:admin="合同管理员";break;
						case 2:admin="财务经理";break;
						case 3:admin="销售经理";break;
						case 4:admin="行政经理";break;
						case 5:admin="研发经理";break;
						case 6:admin="产品经理";break;
						case 7:admin="总经理";break;
						default:admin="系统出错";
							break;
					}
					dataHtml += '<tr>'
			    	+  '<td><input type="checkbox" name="checked" lay-skin="primary" lay-filter="choose"></td>'
			    	+  '<td>'+currData[i].employeeId+'</td>'
			    	+  '<td>'+currData[i].name+'</td>'
			    	+  '<td>'+sex+'</td>'
			    	+  '<td>'+admin+'</td>'
			    	+  '<td>'+currData[i].tel+'</td>'
			    	+  '<td>'+currData[i].email+'</td>'
			    	+  '<td>'
					+  '<a class="layui-btn layui-btn-mini users_edit" data-id="'+currData[i].employeeId+'"><i class="iconfont icon-edit"></i> 编辑</a>'
			        +  '</td>'
			    	+'</tr>';
				}
			}else{
				dataHtml = '<tr><td colspan="8">暂无数据</td></tr>';
			}
		    return dataHtml;
		}

		//分页
		laypage({
			cont : "page",
			pages : Math.ceil(count/8),
			groups: 8,
			jump : function(obj){
				console.log("obj.curr:"+obj.curr);
				$.ajax({
	                url: "/Litchi/user/userList.do",
	                data: {                          //数据
	                	page:obj.curr
	                },
	                type: "POST",//类型，POST或者GET
	                scriptCharset:"utf-8",
	                success: function (data) {
	                	usersData=data;
	                	$(".users_content").html(renderDate(usersData));
	    				$('.users_list thead input[type="checkbox"]').prop("checked",false);
	    		    	form.render();
	                },
	                error: function (er) {          //失败，回调函数
	                	ErroAlert('请求出错!');
	                }
	            });
			}
		})
	}
        
})