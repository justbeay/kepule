define(function() {
	return ["addTodoCtrl", ["$scope", "$location", "$http", "$restful", function($scope, $location, $http, $restful) {
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
		$restful.get("/api/user", function(data) {  //url request for production
//		$restful.get("/test/todo/userList.php", function(data) {  //url request for testing
			for(var i=0; i<data.length; i++) {
				data[i].id = data[i]._id;
			}
			$scope.executorList = data;
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
			if($scope.loginInfo.loginRole <= '0'){
				alert('Permission denied');
				return;
			}
			$scope.TodoInfo = {
				name: $scope.name,
				description: $scope.description,
				creater: $scope.loginInfo._loginId,
				executor: $scope.executor,
				group: $scope.group
			};
			$restful.post("/api/todo", $scope.TodoInfo, function(data){  //url request for production
//			$restful.post("/test/todo/addTodo.php", $scope.TodoInfo, function(data){  //url request for testing
				alert('任务添加成功');
				$location.path('todoList');
			});
		};
	}]];
});