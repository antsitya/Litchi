layui
	.config({
		base: "/Litchi/js/"
	})
	.use(
		['form', 'layer', 'layedit', 'laypage'],
		function() {
			var t = 1;
			var form = layui.form(),
				layer = parent.layer === undefined ? layui.layer :
				parent.layer,
				laypage = layui.laypage,
				$ = layui.jquery;

			console.log("加载页面数据pppp");
			// 加载页面数据
			var usersData = '';
			form.on('select(selectMsg)', function(data) {
				if(data.value == "0") {
					$.ajax({
						url: "/Litchi/record/countwill.do",
						data: { // 数据
						},
						type: "POST", // 类型，POST或者GET
						success: function(data) {
							t = 1;
							usersList(data);
						},
						error: function(er) { // 失败，回调函数
							ErroAlert('请求出错!');
						}
					});

				} else {
					$.ajax({
						url: "/Litchi/record/countdid.do",
						data: { // 数据
						},
						type: "POST", // 类型，POST或者GET
						success: function(data) {
							t = 1;
							didusersList(data);
						},
						error: function(er) { // 失败，回调函数
							ErroAlert('请求出错!');
						}
					});
				}
			})

			$.ajax({
				url: "/Litchi/record/countwill.do",
				data: { // 数据
				},
				type: "POST", // 类型，POST或者GET
				success: function(data) {
					t = 1;
					usersList(data);
				},
				error: function(er) { // 失败，回调函数
					ErroAlert('请求出错!');
				}
			});
			// 操作/查看已审批合同
			$("body")
				.on(
					"click",
					".verity",
					function() {
						var _this = $(this);
						var id = _this.attr("data-id");
						console.log(id);
						var url = "/Litchi/record/torecordinfo.do?id=" +
							id;
						console.log("url:" + url);
						var index = layui.layer
							.open({
								title: "查看已审批记录",
								type: 2,
								content: url,
								success: function(layero,
									index) {
									layui.layer
										.tips(
											'点击此处返回已审批列表',
											'.layui-layer-setwin .layui-layer-close', {
												tips: 3
											});
								}
							})
						// 改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
						$(window).resize(function() {
							layui.layer.full(index);
						})
						layui.layer.full(index);
					})
					//操作，进行审批
			$("body").on(
					"click",
					".doverity",
					function() {
						var _this = $(this);
						var id = _this.attr("data-id");
						console.log(id);
						var url = "/Litchi/record/doverify.do?id=" +
							id;
						console.log("url:" + url);
						var index = layui.layer
							.open({
								title: "审批合同",
								type: 2,
								content: url,
								success: function(layero,
									index) {
									layui.layer
										.tips(
											'点击此处返回待审批列表',
											'.layui-layer-setwin .layui-layer-close', {
												tips: 3
											});
								}
							})
						// 改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
						$(window).resize(function() {
							layui.layer.full(index);
						})
						layui.layer.full(index);
					})
			function usersList(count) {
				// 渲染数据
				function renderDate(data) {
					var dataHtml = '';
					console.log(")))))))))))))))))))" + data);
					currData = JSON.parse(data);
					console.log("(((((((((((((((currData:" + currData);
					console.log("currData.length:" + currData.length);
					var did, status;
					if(currData.length != 0) {
						for(var i = 0; i < currData.length; i++) {
							if(currData[i].didId == 0) {
								did = "无";
							} else {
								did = currData[i].didId;
							}
							if(currData[i].status == "ok") {
								status = "审批通过";
							} else {
								if(currData[i].status == "fail") {
									status = "审核失败";
								} else {
									if(currData[i].status == "will") {
										status = "待审核";
									} else {
										status = "已过期";
									}
								}

							}
							dataHtml += '<tr>' +
								'<td>' +
								currData[i].id +
								'</td>' +
								'<td>' +
								currData[i].fromId +
								'</td>' +
								'<td>' +
								toDate(currData[i].time) +
								'</td>' +
								'<td>' +
								status +
								'</td>' +
								'<td>' +
								currData[i].times +
								'</td>' +
								'<td>' +
								'<a class="layui-btn layui-btn-mini doverity" data-id="' +
								currData[i].id +
								'"><i class="iconfont icon-edit"></i>审批</a>' +
								'</td>' + '</tr>';
						}
					} else {
						t = 0;
						dataHtml = '<tr><td colspan="8">暂无数据</td></tr>';
					}
					return dataHtml;
				}

				// 分页
				laypage({
					cont: "page",
					pages: Math.ceil(count / 8),
					groups: 8,
					jump: function(obj) {
						console.log("obj.curr:" + obj.curr);
						$.ajax({
							url: "/Litchi/record/willList.do",
							data: { // 数据
								page: obj.curr
							},
							type: "POST", // 类型，POST或者GET
							scriptCharset: "utf-8",
							success: function(data) {
								usersData = data;
								$("#vtitle").html("待审核ID");
								$(".verity_content").html(
									renderDate(usersData));
								form.render();
							},
							error: function(er) { // 失败，回调函数
								ErroAlert('请求出错!');
							}
						});
					}
				})
			}

			function didusersList(count) {
				// 渲染数据
				function renderDate(data) {
					var dataHtml = '';
					console.log(")))))))))))))))))))" + data);
					currData = JSON.parse(data);
					console.log("(((((((((((((((currData:" + currData);
					console.log("currData.length:" + currData.length);
					var did, status;
					if(currData.length != 0) {
						for(var i = 0; i < currData.length; i++) {
							if(currData[i].didId == 0) {
								did = "无";
							} else {
								did = currData[i].didId;
							}
							if(currData[i].status == "ok") {
								status = "审批通过";
							} else {
								if(currData[i].status == "fail") {
									status = "审核失败";
								} else {
									if(currData[i].status == "will") {
										status = "待审核";
									} else {
										status = "已过期";
									}
								}

							}
							dataHtml += '<tr>' +
								'<td>' +
								currData[i].id +
								'</td>' +
								'<td>' +
								currData[i].fromId +
								'</td>' +
								'<td>' +
								toDate(currData[i].time) +
								'</td>' +
								'<td>' +
								status +
								'</td>' +
								'<td>' +
								currData[i].times +
								'</td>' +
								'<td>' +
								'<a class="layui-btn layui-btn-mini verity" data-id="' +
								currData[i].id +
								'"><i class="iconfont icon-edit"></i>查看</a>' +
								'</td>' + '</tr>';
						}
					} else {
						t = 0;
						dataHtml = '<tr><td colspan="8">暂无合同数据</td></tr>';
					}
					return dataHtml;
				}

				// 分页
				laypage({
					cont: "page",
					pages: Math.ceil(count / 8),
					groups: 8,
					jump: function(obj) {
						console.log("obj.curr:" + obj.curr);
						$.ajax({
							url: "/Litchi/record/didList.do",
							data: { // 数据
								page: obj.curr
							},
							type: "POST", // 类型，POST或者GET
							scriptCharset: "utf-8",
							success: function(data) {
								usersData = data;
								$("#vtitle").html("已审核ID");
								$(".verity_content").html(
									renderDate(usersData));
								form.render();
							},
							error: function(er) { // 失败，回调函数
								ErroAlert('请求出错!');
							}
						});
					}
				})
			}
		})

function toDate(v) {
	var date = new Date();
	date.setTime(v.time);
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	m = m < 10 ? '0' + m : m;
	var d = date.getDate();
	d = d < 10 ? ("0" + d) : d;
	var h = date.getHours();
	h = h < 10 ? ("0" + h) : h;
	var M = date.getMinutes();
	M = M < 10 ? ("0" + M) : M;
	var str = y + "-" + m + "-" + d;
	return str;
}