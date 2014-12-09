define(["angular", "angular-route", "config", "angular-cookies", "service", "component"], function(angular) {
	return angular.module('ngView', ["ngRoute", "ngConfig", "ngCookies", "ngService", "ngComponent"])

	.config(
	    ["$routeProvider", "$httpProvider", "$controllerProvider", function($routeProvider, $httpProvider, $controllerProvider) {
//		    var interceptor = ['$q', function($q) {
//		    	var $loading = $("#loadingFrame").contents().find("#loading");
//		    	function ajax_before() {
//		    		$("#loadingFrame").show();
//		    		$loading.show();
//	        	}
//		    	function ajax_after() {
//		    		$("#loadingFrame").hide();
//		    		$loading.hide();
//	        	}
//
//		    	var promises;
//				return function(promise) {
//					promises = $q.all(promises? [promise].concat([promises]): [promise]);
//					ajax_before();
//					return promise.then(function(response) {
//						promises.then(function() {
//							ajax_after();
//						});
//						return response;
//					}, function(response) {
//						ajax_after();
//						return $q.reject(response);
//					});
//				};
//		    }];
//		    $httpProvider.responseInterceptors.push();

		    var lazyCtrl = function(ctrlName) {
		    	return ["$q", "$rootScope", function($q, $rootScope) {
					var deferred = $q.defer();
					require(["base", ctrlName], function(base, ctrl) {
						$controllerProvider.register.apply(base, ctrl);
						deferred.resolve();
						$rootScope.$digest();
					});
					return deferred.promise;
				}];
		    };

		    $routeProvider.when("/login", {
				templateUrl: "pages/user/login.html",
				controller: "loginCtrl",
				resolve: {
					ctrl: lazyCtrl("login")
				}
			});
		    $routeProvider.when("/todoList", {
				templateUrl: "pages/todoList/todoList.html",
				controller: "TodoListCtrl",
				resolve: {
					ctrl: lazyCtrl("todoList")
				}
			});
		    $routeProvider.when("/searchTodo", {
				templateUrl: "pages/todoList/searchTodo.html",
				controller: "SearchTodoCtrl",
				resolve: {
					ctrl: lazyCtrl("searchTodo")
				}
			});
			$routeProvider.when("/editTodo", {
				templateUrl: "pages/todoList/editTodo.html",
				controller: "editTodoCtrl",
				resolve: {
					ctrl: lazyCtrl("editTodo")
				}
			});
			$routeProvider.when("/addTodo", {
				templateUrl: "pages/todoList/addTodo.html",
				controller: "addTodoCtrl",
				resolve: {
					ctrl: lazyCtrl("addTodo")
				}
			});
			$routeProvider.when("/viewTodo", {
				templateUrl: "pages/todoList/viewTodo.html",
				controller: "viewTodoCtrl",
				resolve: {
					ctrl: lazyCtrl("viewTodo")
				}
			});
			$routeProvider.when("/userList", {
				templateUrl: "pages/user/userList.html",
				controller: "UserListCtrl",
				resolve: {
					ctrl: lazyCtrl("userList")
				}
			});
			$routeProvider.when("/addUser", {
				templateUrl: "pages/user/addUser.html",
				controller: "addUserCtrl",
				resolve: {
					ctrl: lazyCtrl("addUser")
				}
			});
			$routeProvider.when("/editUser", {
				templateUrl: "pages/user/editUser.html",
				controller: "editUserCtrl",
				resolve: {
					ctrl: lazyCtrl("editUser")
				}
			});
			$routeProvider.when("/viewUser", {
				templateUrl: "pages/user/viewUser.html",
				controller: "viewUserCtrl",
				resolve: {
					ctrl: lazyCtrl("viewUser")
				}
			});
			$routeProvider.when("/groupList", {
				templateUrl: "pages/group/groupList.html",
				controller: "groupListCtrl",
				resolve: {
					ctrl: lazyCtrl("groupList")
				}
			});
			$routeProvider.when("/addGroup", {
				templateUrl: "pages/group/addGroup.html",
				controller: "addGroupCtrl",
				resolve: {
					ctrl: lazyCtrl("addGroup")
				}
			});
			$routeProvider.when("/editGroup", {
				templateUrl: "pages/group/editGroup.html",
				controller: "editGroupCtrl",
				resolve: {
					ctrl: lazyCtrl("editGroup")
				}
			});
			$routeProvider.when("/deleteGroup", {
				templateUrl: "pages/group/deleteGroup.html",
				controller: "deleteGroupCtrl",
				resolve: {
					ctrl: lazyCtrl("deleteGroup")
				}
			});
			$routeProvider.when("/viewGroup", {
				templateUrl: "pages/group/viewGroup.html",
				controller: "viewGroupCtrl",
				resolve: {
					ctrl: lazyCtrl("viewGroup")
				}
			});

	        $routeProvider.otherwise({redirectTo: '/welcome'});
	    }]
	)

	/** 初始化ngView对象，初始化定义$rootScope相关方法 **/
	.run(['$rootScope', '$config', "$route", "$remote",
	function($rootScope, $config, $route, $remote) {

		$rootScope.post2SRV = function(action,formData,callBack,failBack) {
			return $remote.post(action,formData,function(data) {
	            // data = $transLate(data);
	            callBack && callBack(data);
	        },failBack,function(data) {
				alert("与服务器连接失败");
			});
	    };

		/**页面跳转统一方法*/
		var flag;
		$rootScope.locate = function(url) {
	    	setTimeout(function() {
	    		flag = true;
	    		if (window.location.hash == url) {
	    	    	$route.reload();
	    	    	$rootScope.$apply();
	    		} else {
	    			window.location.href=url;
	    		}
	    	}, 1);
	    };

	    $rootScope.$on("$locationChangeStart", function(event, next, current) {
	    	/*if (!flag) {
	    		event.preventDefault();
	    		flag = false;
	    		return;
	    	}
	    	flag = false;*/
	    });

	}])

	.controller("BaseCtrl", ["$scope", "$scopeData", "$http", "$cookies", "$location", "$window", function ($scope, $scopeData, $http, $cookies, $location, $window) {
		$scope.userPositionInfoList = [//岗位
			{id: 1, name: '小组负责人'},
			{id: 2, name:'项目负责人'},
			{id: 3, name:'开发人员'}
		];
		$scope.userStatusInfoList = [//用户状态
			{id: 1, name: '正常'},
			{id: 2, name:'离开项目组'},
			{id: 3, name:'出差'},
			{id: 4, name:'实习'},
			{id: 5, name:'试用期'},
			{id: 6, name:'其他'},
			{id: 9, name:'离职'}
		];
		$scope.userRoleInfoList = [//角色
			{id: 1, name: '平民'},
			{id: 2, name:'平民'},
			{id: 3, name:'平民'},
			{id: 4, name:'平民'},
			{id: 9, name:'系统管理员'}
		];
		$scope.encrySeed = "kepule_server";
		$scope.getNameFromList = function(Infolist, id){
			for(var i=0; i<Infolist.length; i++) {
				if(Infolist[i].id == id) {
					return Infolist[i].name;
				}
			}
			return id;
		}
		$scope.logout = function(){
			$http.post("/userBiz/logout").
			// $http.post("/test/todo/logout.php").
				success(function(data){
					alert("您已安全退出");
					$cookies.isLogin = '';
					$cookies.loginId = '';
					$cookies.loginRole = '';
					$location.path('todoList');
					$window.location.reload();
				}).
				error(function(){
					alert("注销失败");
				});
		}
		$scope.getLoginRole = function(){
			if(!$cookies.isLogin || !$cookies.loginId) return -1;
			if($cookies.loginRole) return $cookies.loginRole;
			var loginId = $cookies.loginId;
			$http.get("/api/user/"+loginId).success(
			// $http.get("/test/todo/viewUser.php?id="+loginId).
				success(function(data){
					$cookies.loginRole = data.role;
					return data.role;
				}).
				error(function(){
					alert("用户信息获取失败");
					return -1;
				});
		}
		$scope.isLogin = $cookies.isLogin ? 1 : 0;
	}])
	;
	
});
