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

		function checkField(displayName, value, noblank, pattern){
			if(!value) {
				if(noblank==true) {
					return {
						flag: "error", 
						msg: displayName+"不能为空"
					}
				}else{
					return {
						flag: "tip",
						msg: "请输入"+displayName
					};
				}
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

		function parseToDate(str, format){
			var d = new Date();
			var t = Date.parse(str, format);
			if(isNaN(t)) return null;
			d.setTime(t);
			return d;
		}

		return {
			getTranslation: getTranslation,
			checkField: checkField,
			parseToDate: parseToDate
		};
	});
});
