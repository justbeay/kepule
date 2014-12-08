define(["cryptojs-sha256"], function(crypto) {
	return ["addUserCtrl", ["$scope", "$location", "$http", function($scope, $location, $http) {
		$scope.groupInfoList = [];
		$http.get("/api/group").success(
		// $http.post("/test/todo/groupList.php").success(
			function(data) {
				for(var i=0; i<data.length; i++) {
					data[i].name = data[i].type;
					$scope.groupInfoList.push(data[i]);
				}
			});
		$scope.back = function() {
			$location.path("userList");
		};
		$scope.checkLoginId = function() {
			if(!$scope.loginId) {
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
		$scope.checkName = function() {
			if(!$scope.name) {
				return {
					flag: "error",
					msg: "姓名不能为空"
				};
			} else {
				return {
					flag: "tip",
					msg: "请输入姓名"
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
		$scope.checkPasswordAgain = function() {
			if(!$scope.passwordAgain) {
				return {
					flag: "error",
					msg: "重复秘密不能为空"
				};
			} else {
				if($scope.passwordAgain != $scope.password){
					return {
						flag: "error",
						msg: "两次密码输入不一致"
					};
				}else{
					return {
						flag: "tip",
						msg: "请再次输入密码"
					}
				}
			}
		};
		$scope.checkStatus = function() {
			if(!$scope.status) {
				return {
					flag: "error",
					msg: "用户状态不能为空"
				};
			} else {
				return {
					flag: "tip",
					msg: "请输入用户状态"
				}
			}
		};
		$scope.checkEmail = function() {
			if(!$scope.email) {
				return {
					flag: "error",
					msg: "电子邮件地址不能为空"
				};
			} else {
				if(!$scope.email.match(/[a-zA-Z0-9_-]@[a-z0-9]+\.[a-z]{2,3}(\.[a-z]{2,3})?/)){
					return {
						flag: "error",
						msg: "电子邮件地址格式不正确"
					};
				}else{
					return {
						flag: "tip",
						msg: "请输入电子邮件地址"
					}
				}
			}
		};
		$scope.checkGroup = function() {
			if(!$scope.group) {
				return {
					flag: "error",
					msg: "项目组不能为空"
				};
			} else {
				return {
					flag: "tip",
					msg: "请输入项目组"
				}
			}
		};
		$scope.checkRole = function() {
			if(!$scope.role) {
				return {
					flag: "error",
					msg: "用户角色不能为空"
				};
			} else {
				return {
					flag: "tip",
					msg: "请输入用户角色"
				}
			}
		};
		$scope.checkPosition = function() {
			if(!$scope.position) {
				return {
					flag: "error",
					msg: "岗位不能为空"
				};
			} else {
				return {
					flag: "tip",
					msg: "请输入岗位"
				}
			}
		};
		$scope.submit = function() {
			if($scope.getLoginRole() != '9'){
				alert('Permission denied');
				return;
			}
			var password = crypto.SHA256($scope.password).toString();
			password = crypto.HmacSHA256(password, $scope.encrySeed).toString();

			$scope.UserInfo = {
				loginId: $scope.loginId,
				name: $scope.name,
				password: password,
				status: $scope.status,
				email: $scope.email,
				group: $scope.group,
				role: $scope.role,
				position: $scope.position
			};
			$http.post("/api/user", $scope.UserInfo).
			// $http.post("/test/todo/addUser.php", $scope.UserInfo).
				success(function(data){
					if(data.addStatus == '0'){
						alert('用户添加成功');
						$location.path('userList');
					}else{
						alert('用户添加失败');
					}
				}
			);
		};
	}]];
});