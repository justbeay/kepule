define(function() {
	return ["SearchTodoCtrl", ["$scope", "$scopeData", "$location", "$http", function($scope, $scopeData, $location, $http) {
		$scope.id = $scopeData.get("id");
		$scope.back = function() {
			$location.path("todoList");
		};
		$scope.groupInfoList = [];
		// $http.get("/api/group").success(
		$http.post("/test/todo/groupList.php").success(
			function(data) {
				for(var i=0; i<data.length; i++) {
					data[i].name = data[i].type;
					$scope.groupInfoList.push(data[i]);
				}
			});
		$scope.submit = function() {
			$scopeData.set("name", $scope.name ? $scope.name : undefined);
			$scopeData.set("creater", $scope.creater ? $scope.creater : undefined);
			$scopeData.set("executor", $scope.executor ? $scope.executor : undefined);
			$scopeData.set("done", $scope.done ? $scope.done : undefined);
			$scopeData.set("group", $scope.group ? $scope.group : undefined);
			$location.path("todoList");
		};
	}]];
});