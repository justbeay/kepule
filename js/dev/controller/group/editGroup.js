define(function() {
	return ["editGroupCtrl", ["$scope", "$scopeData", "$location", "$http", "$restful", function($scope, $scopeData, $location, $http, $restful) {
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
		$restful.get("/api/group/"+$scope.id, function(data){  //url request for production
//		$restful.get("/test/todo/viewGroup.php?id="+$scope.id, function(data){  //url request for testing
			$scope.id = data._id;
			$scope.name = data.type;
		});
		$scope.submit = function() {
			if($scope.loginInfo.loginRole != '9'){
				alert('Permission denied');
				return;
			}
			$scope.GroupInfo = {
				type: $scope.name,
			};
			$restful.put("/api/group/"+$scope.id, $scope.GroupInfo, function(data){  //url request for production
//			$restful.post("/test/todo/editGroup.php?id="+$scope.id, $scope.GroupInfo, function(data){  //url request for testing
				alert('项目组添加成功');
				$location.path('userList');
			});
		};
	}]];
});