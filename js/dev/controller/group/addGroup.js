define(function() {
	return ["addGroupCtrl", ["$scope", "$location", "$http", function($scope, $location, $http) {
		$scope.back = function() {
			$location.path("groupList");
		};
		$scope.checkName = function() {
			if(!$scope.name) {
				return {
					flag: "error",
					msg: "组名不能为空"
				};
			} else {
				return {
					flag: "tip",
					msg: "请输入组名"
				}
			}
		};
		$scope.submit = function() {
			if($scope.loginRole != 9){
				alert('Permission denied');
				return;
			}
			$scope.GroupInfo = {
				type: $scope.name,
			};
			$http.post("/api/group", $scope.GroupInfo).
			// $http.post("/test/todo/addGroup.php", $scope.GroupInfo).
				success(function(data){
					if(data.addStatus == '0'){
						alert('项目组添加成功');
						$location.path('userList');
					}else{
						alert('项目组添加失败');
					}
				}
			);
		};
	}]];
});