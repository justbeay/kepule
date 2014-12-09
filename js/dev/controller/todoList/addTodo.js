define(function() {
	return ["addTodoCtrl", ["$scope", "$location", "$http", function($scope, $location, $http) {
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
		$scope.checkName = function() {
			if(!$scope.name) {
				return {
					flag: "error",
					msg: "任务名不能为空"
				};
			} else {
				return {
					flag: "tip",
					msg: "请输入任务名"
				}
			}
		};
		$scope.checkCreater = function() {
			if(!$scope.creater) {
				return {
					flag: "error",
					msg: "创建人不能为空"
				};
			} else {
				return {
					flag: "tip",
					msg: "请输入创建人"
				}
			}
		};
		$scope.checkExecutor = function() {
			if(!$scope.executor) {
				return {
					flag: "error",
					msg: "执行人不能为空"
				};
			} else {
				return {
					flag: "tip",
					msg: "请输入执行人"
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
		$scope.submit = function() {
			if(parseInt($scope.getLoginRole()) <= 0){
				alert('Permission denied');
				return;
			}
			$scope.TodoInfo = {
				name: $scope.name,
				description: $scope.description,
				creater: $scope.creater,
				executor: $scope.executor,
				group: $scope.group
			};
			$http.post("/api/todo", $scope.TodoInfo).
			// $http.post("/test/todo/addTodo.php", $scope.TodoInfo).
				success(function(data){
					if(data.addStatus == '0'){
						alert('任务添加成功');
						$location.path('todoList');
					}else{
						alert('任务添加失败');
					}
				}
			);
		};
	}]];
});