define(function() {
	return ["viewUserCtrl", ["$scope", "$scopeData", "$location", "$http", function($scope, $scopeData, $location, $http) {
		var id = $scopeData.get("id");

		$scope.groupInfoList = [];
		$http.get("/api/group").
		// $http.post("/test/todo/groupList.php").
			success(function(data) {
				for(var i=0; i<data.length; i++) {
					data[i].id = data[i]._id;
					data[i].name = data[i].type;
					$scope.groupInfoList.push(data[i]);
				}
			});

		$scope.back = function() {
			$location.path("userList");
		};
		$scope.edit = function() {
			$scopeData.set("id", id);
			$location.path("editUser");
		};
		$http.get("/api/user/"+id).
		// $http.get("/test/todo/viewUser.php?id="+id).
			success(function(data){
				if(Object.keys(data).length > 0){
					data.id = data._id;
					data.group = $scope.getNameFromList($scope.groupInfoList, data.group);
					data.position = $scope.getNameFromList($scope.userPositionInfoList, data.position);
					data.status = $scope.getNameFromList($scope.userStatusInfoList, data.status);
					data.role = $scope.getNameFromList($scope.userRoleInfoList, data.role);
					$scope.user = data;
				}else{
					alert("信息获取失败");
					$location.path("userList");
				}
			}).
			error(function(){
				alert("信息获取失败");
				$location.path("userList");
			});
	}]];
});