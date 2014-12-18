define(function() {
	return ["addGroupCtrl", ["$scope", "$rootScope", "$location", "$http", "$restful", 
	function($scope, $rootScope, $location, $http, $restful) {
		$scope.back = function() {
			$location.path("groupList");
		};
		$scope.checkName = function() {
			if(!$scope.name) {
				return {
					flag: "error",
					msg: "组名不能为空"
				};
			} else {
				return {
					flag: "tip",
					msg: "请输入组名"
				}
			}
		};
		$scope.submit = function() {
			if($rootScope.loginInfo.loginRole != '9'){
				alert('Permission denied');
				return;
			}
			$scope.GroupInfo = {
				type: $scope.name,
			};
			$restful.post("/api/group", $scope.GroupInfo, function(data){  //url request for production
//			$restful.post("/test/todo/addGroup.php", $scope.GroupInfo, function(data){  //url request for testing
				alert('项目组添加成功');
				$location.path('userList');
			});
		};
	}]];
});