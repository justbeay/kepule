define(["angular"], function(angular) {
	angular.module('ngCommon', [])
	
	.factory("$common", function() {
		function getTranslation(dictInfo, id){
			for(var i=0; i<dictInfo.length; i++) {
				if(dictInfo[i].id == id) {
					return dictInfo[i].name;
				}
			}
			return id;
		}

		function mustInputCheck(displayName, value, pattern){
			if(!value) { 
				return {
					flag: "error", 
					msg: displayName+"不能为空"
				};
			} else {
				if(pattern && !value.trim().match(pattern)){
					return {
						flag: "error",
						msg: displayName+"格式不正确"
					}
				} else {
					return {
						flag: "tip",
						msg: "请输入"+displayName
					}
				}
			}
		}

		return {
			getTranslation: getTranslation,
			mustInputCheck: mustInputCheck
		};
	});
});
