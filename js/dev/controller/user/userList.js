define(function() {
	return ["UserListCtrl", ["$scope", "$scopeData", "$location", "$http", "$route", function($scope, $scopeData, $location, $http, $route) {
		$scope.pageSize = 10;
		$scope.pageCur = 1;
		$scope.pageTotal = 1;

		$scope.groupInfoList = [];
		$http.get("/api/group").  //url request for production
		// $http.post("/test/todo/groupList.php").  //url request for testing
			success(function(data) {
				for(var i=0; i<data.length; i++) {
					data[i].id = data[i]._id;
					data[i].name = data[i].type;
					$scope.groupInfoList.push(data[i]);
				}
			});	

		$scope.add = function() {
			$location.path("addUser");
		};
		$scope.edit = function(id) {
			$scopeData.set("id", id);
			$location.path("editUser");
		};
		$scope.view = function(id) {
			$scopeData.set("id", id);
			$location.path("viewUser");
		};
		$scope.delete = function(id) {
			if($scope.loginRole != 9){
				alert('Permission denied');
				return;
			}
			$http.delete("/api/user/"+id).  //url request for production
			// $http.get("/test/todo/deleleUser.php?id="+id).  //url request for testing
				success(function($data){
					alert('删除成功');
					$route.reload();
				}).
				error(function(){
					$route.reload();
				});
		};
		$scope.getUserList = function(pageno){
			$scope.pageCur = pageno;
			$http.get("/api/user").  //url request for production
			// $http.post("/test/todo/userList.php").  //url request for testing
				success(function(data) {
					$scope.pageTotal = Math.ceil(data.length/$scope.pageSize);
					$scope.userList = [];
					var rowStart =$scope.pageSize*($scope.pageCur-1);
					var rowEnd = Math.min($scope.pageSize*$scope.pageCur, data.length);
					for(var i=rowStart; i<rowEnd; i++) {
						data[i].id = data[i]._id;
						data[i].group = $scope.getNameFromList($scope.groupInfoList, data[i].group);
						data[i].position = $scope.getNameFromList($scope.userPositionInfoList, data[i].position);
						data[i].status = $scope.getNameFromList($scope.userStatusInfoList, data[i].status);
						data[i].role = $scope.getNameFromList($scope.userRoleInfoList, data[i].role);
						$scope.userList.push(data[i]);
					}
				});
		};
		$scope.searchPrevUserList = function() {
			$scope.getUserList(Math.max($scope.pageCur-1, 1));
		}
		$scope.searchNextUserList = function() {
			$scope.getUserList(Math.min($scope.pageCur+1, $scope.pageTotal));
		}
		$scope.getUserList($scope.pageCur);
	}]];
});