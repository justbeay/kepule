define(function() {
	return ["viewTodoCtrl", ["$scope", "$scopeData", "$location", "$http", "$restful", function($scope, $scopeData, $location, $http, $restful) {
		
		if($scope.loginInfo.loginRole <= 0){
			alert('Permission denied');
			return;
		}
		var todoId = $scopeData.get("id");
		$scope.groupInfoList = [];
		$restful.get("/api/group/", function(data) {  //url request for production
//		$restful.get("/test/todo/groupList.php", function(data) {  //url request for testing
			for(var i=0; i<data.length; i++) {
				data[i].name = data[i].type;
				$scope.groupInfoList.push(data[i]);
			}
		});

		$scope.back = function() {
			$location.path("todoList");
		};
		$scope.edit = function() {
			$location.path("editTodo");
		};
		$restful.get("/api/todo/"+todoId, function($data){  //url request for production
//		$restful.get("/test/todo/viewTodo.php?id="+todoId, function($data){  //url request for testing
			$scope.todo = $data;
			$scope.todo.done = $scope.todo.done ? "已完成" : "未完成";
			for(var i=0; i<$scope.groupInfoList.length; i++) {
				if($scope.groupInfoList[i]._id == $scope.todo.group._id) {
					$scope.todo.group = $scope.groupInfoList[i].name;
					break;
				}
			}
		});
	}]];
});