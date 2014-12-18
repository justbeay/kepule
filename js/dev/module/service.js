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
	
	.factory("$remote", ["$rootScope", "$config", "$http", "$cookies", "$location", function($rootScope, $config, $http, $cookies, $location) {
		function dealError(errorCallback, data, status, headers, config){
			if(status == 400){
				if(data == "需要登录才能操作"){
					$cookies.isLogin = '';
					$cookies._loginId = '';
					$cookies.loginId = '';
					$cookies.loginRole = '';
					$rootScope.loginInfo = {};
					$location.path('login');
				}else if(typeof errorCallback != "function"){
					alert(data);
				}else{
					errorCallback(data, status, headers, config);
				}
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

	.factory("$restful", ["$rootScope", "$config", "$http", "$cookies", "$location", function($rootScope, $config, $http, $cookies, $location) {
		function dealError(errorCallback, data, status, headers, config){
			if(status == 400){
				if(data == "需要登录才能操作"){
					$cookies.isLogin = '';
					$cookies._loginId = '';
					$cookies.loginId = '';
					$cookies.loginRole = '';
					$rootScope.loginInfo = {};
					$location.path('login');
				}else if(typeof errorCallback != "function"){
					alert(data);
				}else{
					errorCallback(data, status, headers, config);
				}
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
