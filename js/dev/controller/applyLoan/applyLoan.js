define(function() {
	return ["ApplyLoanCtrl", ["$scope", function($scope) {
		$scope.checkName = function () {
			if (!$scope.name) {
				return {
					flag: "error",
					msg: "贷款名称不能为空"
				};
			}
			return {
				flag: "tip",
				msg: "请输入贷款名称"
			};
		};
		
		$scope.submit = function () {
			alert("success");
		};
	}]];
});
