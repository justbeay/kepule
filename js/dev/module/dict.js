define(["angular", "common"], function(angular) {
	angular.module('ngDict', ["ngCommon"])
	
	.factory("$dict", ["$common", function($common) {
		var positionInfoList = [//岗位
			{id:1, name:'小组负责人'},
			{id:2, name:'项目负责人'},
			{id:3, name:'开发人员'}
		];
		var statusInfoList = [//用户状态
			{id:1, name:'正常'},
			{id:2, name:'离开项目组'},
			{id:3, name:'出差'},
			{id:4, name:'实习'},
			{id:5, name:'试用期'},
			{id:6, name:'其他'},
			{id:9, name:'离职'}
		];
		var roleInfoList = [//角色
			{id:1, name:'平民'},
			{id:2, name:'平民'},
			{id:3, name:'平民'},
			{id:4, name:'平民'},
			{id:9, name:'系统管理员'}
		];
		var sexInfoList = [//性别
			{id:1, name:'男'},
			{id:2, name:'女'}
		];
		var residenceTypeInfoList = [//户口性质
			{id:1, name:'农业'},
			{id:2, name:'非农业'}
		];
		return {
			position: function(id) { return $common.getTranslation(positionInfoList, id); },
			status: function(id) { return $common.getTranslation(statusInfoList, id); },
			role: function(id) { return $common.getTranslation(roleInfoList, id); },
			sex: function(id) { return $common.getTranslation(sexInfoList, id); },
			residenceType: function(id) { return $common.getTranslation(residenceTypeInfoList, id); },
			positionInfo: positionInfoList,
			statusInfo: statusInfoList,
			roleInfo: roleInfoList,
			sexInfo: sexInfoList,
			residenceTypeInfo: residenceTypeInfoList,
		};
	}]);
});
