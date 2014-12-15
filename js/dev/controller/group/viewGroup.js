define(function() {
	return ["viewGroupCtrl", ["$scope", "$scopeData", "$location", "$http", "$restful", function($scope, $scopeData, $location, $http, $restful) {
		var id = $scopeData.get("id");

		$scope.back = function() {
			$location.path("groupList");
		};
		$scope.edit = function() {
			$scopeData.set("id", id);
			$location.path("editGroup");
		};
		$restful.get("/api/group/"+id, function(data){  //url request for production
//		$restful.get("/test/todo/viewGroup.php?id="+id, function(data){  //url request for testing
			data.id = data._id;
			data.name = data.type;
			$scope.group = data;
		});
	}]];
});