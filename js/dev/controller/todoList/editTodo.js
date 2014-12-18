define(function() {
	return ["editTodoCtrl", ["$scope", "$rootScope", "$scopeData", "$location", "$http", "$restful", 
	function($scope, $rootScope, $scopeData, $location, $http, $restful) {
		if($rootScope.loginInfo.loginRole <= '0'){
			alert('Permission denied');
			return;
		}
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
		$restful.get("/api/user", function(data) {  //url request for production
//		$restful.get("/test/todo/userList.php", function(data) {  //url request for testing
			for(var i=0; i<data.length; i++) {
				data[i].id = data[i]._id;
			}
			$scope.executorList = data;
		});
		$restful.get("/api/todo/"+$scope.id, function(data){  //url request for production
//		$restful.get("/test/todo/viewTodo.php?id="+$scope.id, function(data){  //url request for testing
			$scope.id = data._id;
			$scope.name = data.name;
			$scope.description = data.description;
			$scope.creater = data.creater.name;
			$scope.executor = data.executor._id;
			$scope.done = data.done ? 1 : 0;
			$scope.group = data.group;
			for(var i=0; i<$scope.groupInfoList.length; i++) {
				if($scope.groupInfoList[i]._id == $scope.group._id) {
					$scope.group = $scope.groupInfoList[i].name;
					break;
				}
			}
		});
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
			if($rootScope.loginInfo.loginRole <= '0'){
				alert('Permission denied');
				return;
			}
			$scope.TodoInfo = {
				name: $scope.name,
				executor: $scope.executor,
				description: $scope.description,
				done: $scope.done
			};
			$restful.put("/api/todo/"+$scope.id, $scope.TodoInfo, function(data) {  //url request for production
//			$restful.post("/test/todo/editTodoInfo.php?id="+$scope.id, $scope.TodoInfo, function(data) {  //url request for testing
				alert('任务更新成功');
				$location.path('todoList');
			});
		};
	}]];
});