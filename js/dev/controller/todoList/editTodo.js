define(function() {
	return ["editTodoCtrl", ["$scope", "$scopeData", "$location", "$http", function($scope, $scopeData, $location, $http) {
		if(parseInt($scope.getLoginRole()) <= 0){
			alert('Permission denied');
			return;
		}
		$scope.id = $scopeData.get("id");
		$scope.back = function() {
			$location.path("todoList");
		};
		$scope.groupInfoList = [];
		$http.get("/api/group").success(
		// $http.post("/test/todo/groupList.php").success(
			function(data) {
				for(var i=0; i<data.length; i++) {
					data[i].id = data[i]._id;
					data[i].name = data[i].type;
					$scope.groupInfoList.push(data[i]);
				}
			});
		$http.get("/api/todo/"+$scope.id).
		// $http.get("/test/todo/viewTodo.php?id="+$scope.id).
			success(function($data){
				if(Object.keys($data).length > 0){
					$scope.id = $data.id;
					$scope.name = $data.name;
					$scope.description = $data.description;
					$scope.creater = $data.creater;
					$scope.executor = $data.executor;
					$scope.done = $data.done ? 1 : 0;
					$scope.group = $data.group;
					for(var i=0; i<$scope.groupInfoList.length; i++) {
						if($scope.groupInfoList[i].id.toString() == $scope.group) {
							$scope.group = $scope.groupInfoList[i].name;
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
		$scope.checkDone = function() {
			if(!$scope.done) {
				return {
					flag: "error",
					msg: "项目进度不能为空"
				};
			} else {
				return {
					flag: "tip",
					msg: "请选择项目进度"
				}
			}
		};
		$scope.submit = function() {
			if(parseInt($scope.getLoginRole()) <= 0){
				alert('Permission denied');
				return;
			}
			$scope.TodoInfo = {
				name: $scope.name,
				description: $scope.description,
				done: $scope.done
			};
			$http.put("/api/todo/"+$scope.id, $scope.TodoInfo)
			// $http.post("editTodoInfo.php?id="+$scope.id, $scope.TodoInfo)
				.success(function(data) {
					if(data.addStatus == '0'){
						alert('任务更新成功');
						$location.path('todoList');
					}else{
						alert('任务更新失败');
					}
				}
			);
		};
	}]];
});