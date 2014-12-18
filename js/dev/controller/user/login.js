define(["cryptojs-sha256"], function(crypto) {
	return ["loginCtrl", ["$scope", "$rootScope", "$location", "$config", "$http", "$cookies", "$remote", 
	function($scope, $rootScope, $location, $config, $http, $cookies, $remote) {
		if($rootScope.loginInfo.isLogin){
			$location.path("todoList");
		}
		$scope.back = function() {
			$location.path("todoList");
		};
		$scope.checkName = function() {
			if(!$scope.name) {
				return {
					flag: "error",
					msg: "登录名不能为空"
				};
			} else {
				return {
					flag: "tip",
					msg: "请输入登录名"
				}
			}
		};
		$scope.checkPassword = function() {
			if(!$scope.password) {
				return {
					flag: "error",
					msg: "密码不能为空"
				};
			} else {
				return {
					flag: "tip",
					msg: "请输入密码"
				}
			}
		};
		
		$scope.submit = function() {
			var loginTime = new Date().getTime();
			var password = crypto.SHA256($scope.password).toString();
			var encPassword = crypto.HmacSHA256(password, $config.encrySeed).toString();
			password = crypto.HmacSHA256(encPassword, $scope.name+":"+loginTime).toString();
			$scope.UserInfo = {
				loginId: $scope.name,
				password: password,
				loginTime: loginTime
			};
			$remote.post("/userBiz/login", $scope.UserInfo, function(data){  //url request for production
//			$remote.post("/test/todo/login.php", $scope.UserInfo, function(data){  //url request for testing
				alert('用户登录成功');
				$cookies.isLogin = true;
				$cookies._loginId = data._id;
				$cookies.loginId = $scope.name;
				$cookies.loginRole = data.role;
				$rootScope.loginInfo = $rootScope.loginInfo || {};
				$rootScope.loginInfo.isLogin = true;
				$rootScope.loginInfo.loginRole = !!$cookies.isLogin && !!$cookies._loginId && !!$cookies.loginRole 
						? parseInt($cookies.loginRole) : -1;
				$rootScope.loginInfo._loginId = data._id;
				$location.path('todoList');
			});
		};
	}]];
});