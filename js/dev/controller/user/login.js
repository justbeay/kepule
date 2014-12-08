define(["cryptojs-sha256"], function(crypto) {
	return ["loginCtrl", ["$scope", "$location", "$http", "$cookies", "$window", function($scope, $location, $http, $cookies, $window) {
		if($scope.isLogin){
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
			password = crypto.HmacSHA256(password, $scope.encrySeed).toString();
			password = crypto.HmacSHA256(password, $scope.loginId+":"+loginTime).toString();
			$scope.UserInfo = {
				loginId: $scope.name,
				password: password,
				loginTime: loginTime
			};
			// $http.post("/userBiz/login", $scope.UserInfo).
			$http.post("/test/todo/login.php", $scope.UserInfo).
				success(function(data){
					if(data.loginStatus == '0'){
						$cookies.isLogin = true;
						$cookies.role = data.role;
						alert('用户登录成功');
						$location.path('todoList');
						$window.location.reload();
					}else{
						alert('用户登录失败');
					}
				}
			);
		};
	}]];
});