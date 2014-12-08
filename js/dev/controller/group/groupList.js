define(function() {
	return ["groupListCtrl", ["$scope", "$scopeData", "$location", "$http", "$route", function($scope, $scopeData, $location, $http, $route) {
		$scope.pageSize = 10;
		$scope.pageCur = 1;
		$scope.pageTotal = 1;

		$scope.add = function() {
			$location.path("addGroup");
		};
		$scope.edit = function(id) {
			$scopeData.set("id", id);
			$location.path("editGroup");
		};
		$scope.view = function(id) {
			$scopeData.set("id", id);
			$location.path("viewGroup");
		};
		$scope.delete = function(id) {
			if($scope.getLoginRole() != '9'){
				alert('Permission denied');
				return;
			}
			$http.delete("/api/group/"+$scope.id).
			// $http.get("/test/todo/deleleGroup.php?id="+$scope.id).
				success(function($data){
					alert('删除成功');
					$route.reload();
				}).
				error(function(){
					$route.reload();
				});
		};
		$scope.getGroupList = function(pageno){
			$scope.pageCur = pageno;
			$http.get("/api/group").success(
			// $http.get("/test/todo/groupList.php").success(
				function(data) {
					$scope.pageTotal = Math.ceil(data.length/$scope.pageSize);
					$scope.groupList = [];
					var rowStart =$scope.pageSize*($scope.pageCur-1);
					var rowEnd = Math.min($scope.pageSize*$scope.pageCur, data.length);
					for(var i=rowStart; i<rowEnd; i++) {
						data[i].name = data[i].type;
						$scope.groupList.push(data[i]);
					}
				});
		};
		$scope.searchPrevGroupList = function() {
			$scope.getGroupList(Math.max($scope.pageCur-1, 1));
		}
		$scope.searchNextGroupList = function() {
			$scope.getGroupList(Math.min($scope.pageCur+1, $scope.pageTotal));
		}
		$scope.getGroupList($scope.pageCur);
	}]];
});