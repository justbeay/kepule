define(["angular", "config"], function(angular) {
	angular.module('ngService', ["ngConfig"])
	
	.factory("$singleton", function() {
		return function(fn) {
			var flag ;
			function singleton () {
				if (flag) {
					return flag;
				}
				flag = fn.apply(this, arguments);
				return flag;
			}
			return singleton;
		};
	})
	
	.factory("$toggle", function() {
		return function (fun1, fun2) {
			if (typeof fun1 != "function" || typeof fun2 != "function") {
				return;
			}
			var toggle;
			return function() {
				toggle && fun1();
				!toggle && fun2();
				toggle = !toggle;
			};
		};
	})
	
	.factory("$scopeData", function() {
		var scopeData = {};
		
		return {
			set: function(key, object) {
				if (scopeData[key]) {
					scopeData[key] = object
					return;
				}
				scopeData[key] = object;
			},
			get: function(key) {
				return scopeData[key];
			}
		};
	})
	
	.factory("$remote", function($config, $http) {
		/** 返回校验 **/
		function returnCheck(data) {
			data = data || {};
			alert(data.returnMsg);
		};
		
		function get(action, callback){
	    	return $http.get(action).success(function(data ,status, headers, config){
	    		if(typeof callback == "function"){
	    			callback(data, status, headers, config);
	    		}
	    	});
	    };
	    
		function post(action,formData,callBack,failBack,errorBack) {
			var promise;
			if($config.post == "json") {
				if(action.indexOf('.json') != -1){
					action = "json/" + action;
					promise = get(action, callBack);
				}
			}else if($config.post == "do") {
				formData = formData || {};
				$.extend(formData, $config.clientHeader);
				promise = $http({method: 'POST', url: action, data:formData, transformResponse: function(data) {
					var jsonObj = angular.fromJson(data);
					return jsonObj;
				}}).
				success(function(data ,status, headers, config){
				    if (data && data.returnCode != null) {
				    	var returnCode = data.returnCode;
						if(returnCode != "AAAAAAA"){
							if(typeof failBack == 'function'){
								failBack(data, status, headers, config);
							} else {
								returnCheck(data);
							}
						} else {
							if(typeof callBack=='function') {
								callBack(data, status, headers, config);
							}
						}
					} else {
						if(typeof failBack == 'function'){
							failBack(data, status, headers, config);
						} else {
							returnCheck(data);
						}
					}
				}).error(function(data, status, headers, config) {
					if(typeof errorBack == 'function') {
						errorBack(data, status, headers, config);
					} else {
						alert("与服务器连接失败");
					}
				});
			}
			return promise;
		};
		
		return {
			post: post,
			get: get
		};
	})
});
