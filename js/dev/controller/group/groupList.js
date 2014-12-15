define(function() {
	return ["groupListCtrl", ["$scope", "$scopeData", "$location", "$http", "$route", "$restful", function($scope, $scopeData, $location, $http, $route, $restful) {
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
			if($scope.loginInfo.loginRole != 9){
				alert('Permission denied');
				return;
			}
			$restful.delete("/api/group/"+id, function($data){  //url request for production
//			$restful.get("/test/todo/deleleGroup.php?id="+id, function($data){  //url request for testing
				alert('删除成功');
				$route.reload();
			});
		};
		$scope.getGroupList = function(pageno){
			$scope.pageCur = pageno;
			$restful.get("/api/group", function(data) {  //url request for production
//			$restful.get("/test/todo/groupList.php", function(data) {  //url request for testing
				$scope.pageTotal = Math.ceil(data.length/$scope.pageSize);
				$scope.groupList = [];
				var rowStart =$scope.pageSize*($scope.pageCur-1);
				var rowEnd = Math.min($scope.pageSize*$scope.pageCur, data.length);
				for(var i=rowStart; i<rowEnd; i++) {
					data[i].id = data[i]._id;
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