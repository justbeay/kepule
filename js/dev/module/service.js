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
	
	.factory("$remote", ["$config", "$http", function($config, $http) {
		function dealError(errorCallback, data, status, headers, config){
			if(status == 400 && typeof errorCallback != "function"){
				alert(data);
    		}else if(typeof errorCallback == "function"){
				errorCallback(data, status, headers, config);
			}
		}
		function get(url, successCallback, errorCallback){
	    	return $http.get(url).success(function(data, status, headers, config){
	    		if(typeof successCallback == "function"){
	    			successCallback(data, status, headers, config);
	    		}
	    	}).error(function(data, status, headers, config){
	    		dealError(errorCallback, data, status, headers, config);
	    	});
	    };
		function post(url, requestData, successCallback, errorCallback) {
			return $http.post(url, requestData).success(function(data, status, headers, config){
	    		if(typeof successCallback == "function"){
	    			successCallback(data, status, headers, config);
	    		}
	    	}).error(function(data, status, headers, config){
	    		dealError(errorCallback, data, status, headers, config);
	    	});
		};
		
		return {
			post: post,
			get: get
		};
	}])

	.factory("$restful", ["$config", "$http", function($config, $http) {
		function dealError(errorCallback, data, status, headers, config){
			if(status == 400 && typeof errorCallback != "function"){
				alert(data);
    		}else if(typeof errorCallback == "function"){
				errorCallback(data, status, headers, config);
			}
		}

		function get(url, successCallback, errorCallback){
	    	return $http.get(url).success(function(data ,status, headers, config){
	    		if(typeof successCallback == "function"){
	    			successCallback(data, status, headers, config);
	    		}
	    	}).error(function(data, status, headers, config){
	    		dealError(errorCallback, data, status, headers, config);
	    	});
	    }
	    
		function post(url, requestData, successCallback, errorCallback) {
			return $http.post(url, requestData).success(function(data ,status, headers, config){
	    		if(typeof successCallback == "function"){
	    			successCallback(data, status, headers, config);
	    		}
	    	}).error(function(data, status, headers, config){
	    		dealError(errorCallback, data, status, headers, config);
	    	});
		}
	    
		function put(url, requestData, successCallback, errorCallback) {
			return $http.put(url, requestData).success(function(data ,status, headers, config){
	    		if(typeof successCallback == "function"){
	    			successCallback(data, status, headers, config);
	    		}
	    	}).error(function(data, status, headers, config){
	    		dealError(errorCallback, data, status, headers, config);
	    	});
		}
	    
		function del(url, successCallback, errorCallback) {
			return $http.put(url).success(function(data ,status, headers, config){
	    		if(typeof successCallback == "function"){
	    			successCallback(data, status, headers, config);
	    		}
	    	}).error(function(data, status, headers, config){
	    		dealError(errorCallback, data, status, headers, config);
	    	});
		}
		
		return {
			post: post,
			get: get,
			put: put,
			delete: del
		};
	}])
});
