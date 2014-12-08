define(function() {
	return ["TodoListCtrl", ["$scope", "$scopeData", "$location", "$http", "$route", function($scope, $scopeData, $location, $http, $route) {
		$scope.pageSize = 10;
		$scope.pageCur = 1;
		$scope.pageTotal = 1;
		$scope.add = function() {
			$location.path("addTodo");
		};
		$scope.edit = function(id) {
			$scopeData.set("id", id);
			$location.path("editTodo");
		};
		$scope.view = function(id) {
			$scopeData.set("id", id);
			$location.path("viewTodo");
		};
		$scope.search = function() {
			$location.path("searchTodo");
		};
		$scope.delete = function(id) {
			if(parseInt($scope.getLoginRole()) <= 0){
				alert('Permission denied');
				return;
			}
			// $http.delete("/api/todo/"+$scope.id).
			$http.get("/test/todo/viewTodo.php?id="+$scope.id).
				success(function($data){
					alert('删除成功');
					$route.reload();
				}).
				error(function(){
					$route.reload();
				});
		};
		$scope.query = function(pageno){
			$scope.pageCur = pageno;
			$scope.SearchInfo = {
				name: $scopeData.get('name'),
				creater: $scopeData.get('creater'),
				executor: $scopeData.get('executor'),
				done: $scopeData.get('done'),
				group: $scopeData.get('group')
			};
			// $http.get("/api/todo", $scope.SearchInfo).success(
			$http.post("/test/todo/todoList.php", $scope.SearchInfo).success(
				function(data) {
					$scope.pageTotal = Math.ceil(data.length/$scope.pageSize);
					$scope.todoList = [];
					var rowStart =$scope.pageSize*($scope.pageCur-1);
					var rowEnd = Math.min($scope.pageSize*$scope.pageCur, data.length);
					for(var i=rowStart; i<rowEnd; i++) {
						data[i].done = data[i].done ? "已完成" : "未完成";
						$scope.todoList.push(data[i]);
					}
				});
		};
		$scope.queryPrev = function() {
			$scope.query(Math.max($scope.pageCur-1, 1));
		}
		$scope.queryNext = function() {
			$scope.query(Math.min($scope.pageCur+1, $scope.pageTotal));
		}
		$scope.query($scope.pageCur);
	}]];
});