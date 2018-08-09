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
        url: "/Litchi/record/count.do",
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
	$("body").on("click",".record",function(){
		var _this = $(this);
		var id=_this.attr("data-id");
		console.log(id);
		var url="/Litchi/record/torecordinfo.do?id="+id;
		console.log("url:"+url);
		var index = layui.layer.open({
			title : "查看历史记录",
			type : 2,
			content : url,
			success : function(layero, index){
				layui.layer.tips('点击此处返回历史列表', '.layui-layer-setwin .layui-layer-close', {
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
			console.log("currData.length:"+currData.length);
			var did,status;
			if(currData.length != 0){
				for(var i=0;i<currData.length;i++){
					if(currData[i].didId==0){
						did="无";
					}else{
						did=currData[i].didId;
					}
					if(currData[i].status=="ok"){
						status="审批通过";
					}else{
						if(currData[i].status=="fail"){
							status="审核失败";
						}else{
							if(currData[i].status=="will"){
								status="待审核";
							}else{
								status="已过期";
							}
						}
						
					}
					dataHtml += '<tr>'
			    	+  '<td><input type="checkbox" name="checked" lay-skin="primary" lay-filter="choose"></td>'
			    	+  '<td>'+currData[i].id+'</td>'
			    	+  '<td>'+currData[i].fromId+'</td>'
			    	+  '<td>'+did+'</td>'
//			    	+  '<td>'+toDate(currData[i].time)+'</td>'
			    	+  '<td>'+toDate(currData[i].time)+'</td>'
			    	+  '<td>'+status+'</td>'
			    	+  '<td>'+currData[i].times+'</td>'
			    	+  '<td>'
					+  '<a class="layui-btn layui-btn-mini record" data-id="'+currData[i].id+'"><i class="iconfont icon-edit"></i>查看</a>'
			        +  '</td>'
			    	+'</tr>';
				}
			}else{
				dataHtml = '<tr><td colspan="8">暂无数据</td></tr>';
			}
//			console.log("dataHtml:"+dataHtml);
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
	                url: "/Litchi/record/recordList.do",
	                data: {                          //数据
	                	page:obj.curr
	                },
	                type: "POST",//类型，POST或者GET
	                scriptCharset:"utf-8",
	                success: function (data) {
	                	usersData=data;
	                	$(".record_content").html(renderDate(usersData));
	    				$('.rchive_list thead input[type="checkbox"]').prop("checked",false);
	    		    	form.render();
	                },
	                error: function (er) {          //失败，回调函数
	                	ErroAlert('请求出错!');
	                }
	            });
			}
		})
	}

	//查询
//	$(".search_btn").click(function(){
//		var newArray = [];
//		if($(".search_input").val() != ''){
//			var index = layer.msg('查询中，请稍候',{icon: 16,time:false,shade:0.8});
//            setTimeout(function(){
//            	$.ajax({
//					url : "/Litchi/json/newsList.json",
//					type : "get",
//					dataType : "json",
//					success : function(data){
//						if(window.sessionStorage.getItem("addNews")){
//							var addNews = window.sessionStorage.getItem("addNews");
//							newsData = JSON.parse(addNews).concat(data);
//						}else{
//							newsData = data;
//						}
//						for(var i=0;i<newsData.length;i++){
//							var newsStr = newsData[i];
//							var selectStr = $(".search_input").val();
//		            		function changeStr(data){
//		            			var dataStr = '';
//		            			var showNum = data.split(eval("/"+selectStr+"/ig")).length - 1;
//		            			if(showNum > 1){
//									for (var j=0;j<showNum;j++) {
//		            					dataStr += data.split(eval("/"+selectStr+"/ig"))[j] + "<i style='color:#03c339;font-weight:bold;'>" + selectStr + "</i>";
//		            				}
//		            				dataStr += data.split(eval("/"+selectStr+"/ig"))[showNum];
//		            				return dataStr;
//		            			}else{
//		            				dataStr = data.split(eval("/"+selectStr+"/ig"))[0] + "<i style='color:#03c339;font-weight:bold;'>" + selectStr + "</i>" + data.split(eval("/"+selectStr+"/ig"))[1];
//		            				return dataStr;
//		            			}
//		            		}
//		            		//文章标题
//		            		if(newsStr.newsName.indexOf(selectStr) > -1){
//			            		newsStr["newsName"] = changeStr(newsStr.newsName);
//		            		}
//		            		//发布人
//		            		if(newsStr.newsAuthor.indexOf(selectStr) > -1){
//			            		newsStr["newsAuthor"] = changeStr(newsStr.newsAuthor);
//		            		}
//		            		//审核状态
//		            		if(newsStr.newsStatus.indexOf(selectStr) > -1){
//			            		newsStr["newsStatus"] = changeStr(newsStr.newsStatus);
//		            		}
//		            		//浏览权限
//		            		if(newsStr.newsLook.indexOf(selectStr) > -1){
//			            		newsStr["newsLook"] = changeStr(newsStr.newsLook);
//		            		}
//		            		//发布时间
//		            		if(newsStr.newsTime.indexOf(selectStr) > -1){
//			            		newsStr["newsTime"] = changeStr(newsStr.newsTime);
//		            		}
//		            		if(newsStr.newsName.indexOf(selectStr)>-1 || newsStr.newsAuthor.indexOf(selectStr)>-1 || newsStr.newsStatus.indexOf(selectStr)>-1 || newsStr.newsLook.indexOf(selectStr)>-1 || newsStr.newsTime.indexOf(selectStr)>-1){
//		            			newArray.push(newsStr);
//		            		}
//		            	}
//		            	newsData = newArray;
//		            	newsList(newsData);
//					}
//				})
//            	
//                layer.close(index);
//            },2000);
//		}else{
//			layer.msg("请输入需要查询的内容");
//		}
//	})
})
function toDate(v) {
       var date = new Date();
       date.setTime(v.time);
       var y = date.getFullYear();
       var m = date.getMonth()+1;
       m = m<10?'0'+m:m;
       var d = date.getDate();
       d = d<10?("0"+d):d;
       var h = date.getHours();
       h = h<10?("0"+h):h;
       var M = date.getMinutes();
       M = M<10?("0"+M):M;
       var str = y+"-"+m+"-"+d;
       return str;
}
