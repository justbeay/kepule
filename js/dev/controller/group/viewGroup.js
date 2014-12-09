define(function() {
	return ["viewGroupCtrl", ["$scope", "$scopeData", "$location", "$http", function($scope, $scopeData, $location, $http) {
		var id = $scopeData.get("id");

		$scope.back = function() {
			$location.path("groupList");
		};
		$scope.edit = function() {
			$scopeData.set("id", id);
			$location.path("editGroup");
		};
		$http.get("/api/group/"+id).
		// $http.get("/test/todo/viewGroup.php?id="+id).
			success(function(data){
				if(Object.keys(data).length > 0){
					data.id = data._id;
					data.name = data.type;
					$scope.group = data;
				}else{
					alert("信息获取失败");
					$location.path("groupList");
				}
			}).
			error(function(){
				alert("信息获取失败");
				$location.path("groupList");
			});
	}]];
});