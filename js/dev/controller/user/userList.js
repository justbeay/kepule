define(function() {
	return ["UserListCtrl", ["$scope", "$rootScope", "$scopeData", "$dict", "$location", "$http", "$route", "$common", "$restful", 
	function($scope, $rootScope, $scopeData, $dict, $location, $http, $route, $common, $restful) {
		$scope.pageSize = 10;
		$scope.pageCur = 1;
		$scope.pageTotal = 1;

		$scope.groupInfoList = [];
		$restful.get("/api/group", function(data) {  //url request for production
//		$restful.get("/test/todo/groupList.php", function(data) {  //url request for testing
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
			if($rootScope.loginInfo.loginRole != '9'){
				alert('Permission denied');
				return;
			}
			$restful.delete("/api/user/"+id, function($data){  //url request for production
//			$restful.get("/test/todo/deleleUser.php?id="+id, function($data){  //url request for testing
				alert('删除成功');
				$route.reload();
			});
		};
		$scope.getUserList = function(pageno){
			$scope.pageCur = pageno;
			$restful.get("/api/user", function(data) {  //url request for production
//			$restful.get("/test/todo/userList.php", function(data) {  //url request for testing
				$scope.pageTotal = Math.ceil(data.length/$scope.pageSize);
				$scope.userList = [];
				var rowStart =$scope.pageSize*($scope.pageCur-1);
				var rowEnd = Math.min($scope.pageSize*$scope.pageCur, data.length);
				for(var i=rowStart; i<rowEnd; i++) {
					data[i].id = data[i]._id;
					data[i].group = $common.getTranslation($scope.groupInfoList, data[i].group._id);
					data[i].position = $dict.position(data[i].position);
					data[i].status = $dict.status(data[i].status);
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