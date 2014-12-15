define(function() {
	return ["viewUserCtrl", ["$scope", "$scopeData", "$dict", "$location", "$http", "$common", "$restful",
	function($scope, $scopeData, $dict, $location, $http, $common, $restful) {
		var id = $scopeData.get("id");

		$scope.viewMore = id==$scope.loginInfo._loginId || $scope.loginInfo.loginRole=='9';
		$scope.groupInfoList = [];
		$restful.get("/api/group", function(data) {  //url request for production
//		$restful.get("/test/todo/groupList.php", function(data) {  //url request for testing
			for(var i=0; i<data.length; i++) {
				data[i].id = data[i]._id;
				data[i].name = data[i].type;
				$scope.groupInfoList.push(data[i]);
			}
		});

		$scope.back = function() {
			$location.path("userList");
		};
		$scope.edit = function() {
			$scopeData.set("id", id);
			$location.path("editUser");
		};
		$restful.get("/api/user/"+id, function(data){  //url request for production
//		$restful.get("/test/todo/viewUser.php?id="+id, function(data){  //url request for testing
			data.id = data._id;
			data.group = $common.getTranslation($scope.groupInfoList, data.group);
			data.sex = $dict.sex(data.sex);
			data.residenceType = $dict.residenceType(data.residenceType);
			data.marital = data.marital ? '已婚' : '未婚';
			data.position = $dict.position(data.position);
			data.status = $dict.status(data.status);
			data.role = $dict.role(data.role);
			$scope.user = data;
		});
	}]];
});