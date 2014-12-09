define(function() {
	return ["editGroupCtrl", ["$scope", "$scopeData", "$location", "$http", function($scope, $scopeData, $location, $http) {
		$scope.id = $scopeData.get("id");
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
		$http.get("/api/group/"+$scope.id).success(
		// $http.get("/test/todo/viewGroup.php?id="+$scope.id).success(
			function(data){
				if(Object.keys(data).length > 0){
					$scope.id = data._id;
					$scope.name = data.type;
				}else{
					alert("信息获取失败");
					$location.path("groupList");
				}
			}).
			error(function(){
				alert("信息获取失败");
				$location.path("groupList");
			});
		$scope.submit = function() {
			if($scope.getLoginRole() != '9'){
				alert('Permission denied');
				return;
			}
			$scope.GroupInfo = {
				type: $scope.name,
			};
			$http.put("/api/group/"+$scope.id, $scope.GroupInfo).
			// $http.post("/test/todo/editGroup.php?id="+$scope.id, $scope.GroupInfo).
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