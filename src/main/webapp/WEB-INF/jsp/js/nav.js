var admin =document.getElementById("admin").innerHTML;
//var admin = $("#admin").html();
//console.log(admin);
if(admin=="0"||admin=="1") {
	var navs = [{
		"title": "首页",
		"icon": "&#xe652;",
		"href": "/Litchi/user/tomain.do",
		"spread": false
	}, {
		"title": "归档管理 ",
		"icon": "&#xe61c;",
		"href": "/Litchi/archive/toarchive.do",
		"spread": false
	}, {
		"title": "历史记录",
		"icon": "&#xe60e;",
		"href": "/Litchi/record/torecord.do",
		"spread": false
	}];
} else {
	var navs = [{
		"title": "首页",
		"icon": "&#xe652;",
		"href": "/Litchi/user/tomain.do",
		"spread": false
	}, {
		"title": "审批管理",
		"icon": "&#xe624;",
		"href": "/Litchi/record/toverify.do",
		"spread": false
	}, {
		"title": "员工管理 ",
		"icon": "&#xe650;",
		"href": "/Litchi/user/touser.do",
		"spread": false
	}, {
		"title": "印章管理 ",
		"icon": "&#xe635;",
		"href": "/Litchi/seal/toseal.do",
		"spread": false
	}, {
		"title": "归档管理 ",
		"icon": "&#xe61c;",
		"href": "/Litchi/archive/toarchive.do",
		"spread": false
	}, {
		"title": "历史记录",
		"icon": "&#xe60e;",
		"href": "/Litchi/record/torecord.do",
		"spread": false
	}];
}