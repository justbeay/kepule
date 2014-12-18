define(function() {
	return ["TodoListCtrl", ["$scope", "$scopeData", "$location", "$http", "$route", "$restful", function($scope, $scopeData, $location, $http, $route, $restful) {
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
			if($scope.loginInfo.loginRole <= '0'){
				alert('Permission denied');
				return;
			}
			$restful.delete("/api/todo/"+$scope.id, function($data){  //url request for production
//			$restful.get("/test/todo/viewTodo.php?id="+$scope.id, function($data){  //url request for testing
				alert('删除成功');
				$route.reload();
			});
		};
		$scope.changeDone = function(id, isDone) {
			if($scope.loginInfo.loginRole <= '0'){
				alert('Permission denied');
				return;
			}
			$scope.TodoInfo = {
				done: isDone
			};
			$restful.put("/api/todo/"+id, $scope.TodoInfo, function(data) {  //url request for production
//			$restful.post("/test/todo/editTodoInfo.php?id="+id, $scope.TodoInfo, function(data) {  //url request for testing
				alert('任务更新成功');
				$location.path('todoList');
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
			function dealQueryResult(data){
				$scope.pageTotal = Math.ceil(data.length/$scope.pageSize);
				$scope.todoList = [];
				var rowStart =$scope.pageSize*($scope.pageCur-1);
				var rowEnd = Math.min($scope.pageSize*$scope.pageCur, data.length);
				for(var i=rowStart; i<rowEnd; i++) {
					data[i].id = data[i]._id;
					$scope.todoList.push(data[i]);
				}
			}
			if($scopeData.get('isSearch')){
				$remote.post("/todoBiz/list", $scope.SearchInfo, function(data) {  //url request for production
//				$remote.post("/test/todo/todoList.php", $scope.SearchInfo, function(data) {  //url request for testing
					dealQueryResult(data);
				});
			}else{
				$restful.get("/api/todo", function(data) {  //url request for production
//				$restful.get("/test/todo/todoList.php", function(data) {  //url request for testing
					dealQueryResult(data);
				});
			}
		};
		$scope.queryPrev = function() {
			$scope.query(Math.max($scope.pageCur-1, 1));
		}
		$scope.queryNext = function() {
			$scope.query(Math.min($scope.pageCur+1, $scope.pageTotal));
		}
		// 若不是从搜索页面过来则先清空搜索条件然后再查询列表
		if(!$scopeData.get('isSearch')){
			$scopeData.set('name', undefined);
			$scopeData.set('creater', undefined);
			$scopeData.set('executor', undefined);
			$scopeData.set('done', undefined);
			$scopeData.set('group', undefined);
		}
		$scopeData.set('isSearch', undefined);
		$scope.query($scope.pageCur);
	}]];
});