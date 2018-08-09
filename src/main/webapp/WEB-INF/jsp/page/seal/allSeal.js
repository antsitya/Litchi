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
        url: "/Litchi/seal/count.do",
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
	//操作/查看印章
	$("body").on("click",".seal",function(){
		var _this = $(this);
		var sealid=_this.attr("data-id");
		console.log(sealid);
		var url="/Litchi/seal/tosealInfo.do?sealid="+sealid;
		console.log("url:"+url);
		var index = layui.layer.open({
			title : "查看印章",
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
			currData=JSON.parse(data);
			console.log("(((((((((((((((currData:"+currData);
			if(currData.length != 0){
				for(var i=0;i<currData.length;i++){
					dataHtml += '<tr>'
			    	+  '<td><input type="checkbox" name="checked" lay-skin="primary" lay-filter="choose"></td>'
			    	+  '<td>'+currData[i].sealid+'</td>'
			    	+  '<td>'+currData[i].sealname+'</td>'
			    	+  '<td>'+currData[i].empid+'</td>'
			    	+  '<td>'
					+  '<a class="layui-btn layui-btn-mini seal" data-id="'+currData[i].sealid+'"><i class="iconfont icon-edit"></i>查看</a>'
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
	                url: "/Litchi/seal/sealList.do",
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