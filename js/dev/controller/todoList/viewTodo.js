define(function() {
	return ["viewTodoCtrl", ["$scope", "$scopeData", "$location", "$http", function($scope, $scopeData, $location, $http) {
		
		if($scope.loginRole <= 0){
			alert('Permission denied');
			return;
		}
		var todoId = $scopeData.get("id");
		$scope.groupInfoList = [];
		$http.get("/api/group/").
		// $http.post("/test/todo/groupList.php").
			success(function(data) {
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
		$http.get("/api/todo/"+todoId).
		// $http.get("/test/todo/viewTodo.php?id="+todoId).
			success(function($data){
				if(Object.keys($data).length > 0){
					$scope.todo = $data;
					$scope.todo.done = $scope.todo.done ? "已完成" : "未完成";
					for(var i=0; i<$scope.groupInfoList.length; i++) {
						if($scope.groupInfoList[i]._id == $scope.todo.group) {
							$scope.todo.group = $scope.groupInfoList[i].name;
							break;
						}
					}
				}else{
					alert("信息获取失败");
					$location.path("todoList");
				}
			}).
			error(function(){
				alert("信息获取失败");
				$location.path("todoList");
			});
	}]];
});