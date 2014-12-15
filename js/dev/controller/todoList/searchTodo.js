define(function() {
	return ["SearchTodoCtrl", ["$scope", "$scopeData", "$location", "$http", "$restful", function($scope, $scopeData, $location, $http, $restful) {
		$scope.id = $scopeData.get("id");
		$scope.back = function() {
			$location.path("todoList");
		};
		$scope.groupInfoList = [];
		$restful.get("/api/group", function(data) {  //url request for production
//		$restful.get("/test/todo/groupList.php", function(data) {  //url request for testing
			for(var i=0; i<data.length; i++) {
				data[i].id = data[i]._id;
				data[i].name = data[i].type;
				$scope.groupInfoList.push(data[i]);
			}
		});
		$scope.submit = function() {
			$scopeData.set("isSearch", true);
			$scopeData.set("name", $scope.name ? $scope.name : undefined);
			$scopeData.set("creater", $scope.creater ? $scope.creater : undefined);
			$scopeData.set("executor", $scope.executor ? $scope.executor : undefined);
			$scopeData.set("done", $scope.done ? $scope.done : undefined);
			$scopeData.set("group", $scope.group ? $scope.group : undefined);
			$location.path("todoList");
		};
	}]];
});