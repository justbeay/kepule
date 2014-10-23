define(["angular", "config", "service", "component"], function(angular) {
	return angular.module('ngView', ["ngConfig", "ngService", "ngComponent"])

	.config(
	    ["$routeProvider", "$httpProvider", "$controllerProvider",  function($routeProvider, $httpProvider, $controllerProvider) {
		    var interceptor = ['$q', function($q) {
		    	var $loading = $("#loadingFrame").contents().find("#loading");
		    	function ajax_before() {
		    		$("#loadingFrame").show();
		    		$loading.show();
	        	}
		    	function ajax_after() {
		    		$("#loadingFrame").hide();
		    		$loading.hide();
	        	}
		    	
		    	var promises;
				return function(promise) {
					promises = $q.all(promises? [promise].concat([promises]): [promise]);
					ajax_before();
					return promise.then(function(response) {
						promises.then(function() {
							ajax_after();
						});
						return response;
					}, function(response) {
						ajax_after();
						return $q.reject(response);
					});
				};
		    }];
		    $httpProvider.responseInterceptors.push(interceptor);
		    
		    var lazyCtrl = function(ctrlName) {
		    	return ["$q", "$rootScope", function($q, $rootScope) {
					var deferred = $q.defer();
					require(["base", ctrlName], function(base, ctrl) {
						$controllerProvider.register.apply(base, ctrl);
						deferred.resolve();
						$rootScope.$digest();
					});
					return deferred.promise;
				}];
		    };
		    
		    $routeProvider.when("/welcome", {
				templateUrl: "pages/welcome.html",
				controller: "WelcomeCtrl"
			});
		    $routeProvider.when("/loanList", {
				templateUrl: "pages/myLoan/loanList.html",
				controller: "LoanListCtrl",
				resolve: {
					ctrl: lazyCtrl("loanList")
				}
			});
		    $routeProvider.when("/applyLoan", {
				templateUrl: "pages/applyLoan/applyLoan.html",
				controller: "ApplyLoanCtrl",
				resolve: {
					ctrl: lazyCtrl("applyLoan")
				}
			});
		    $routeProvider.when("/loanNotes", {
				templateUrl: "pages/applyLoan/loanNotes.html",
				controller: "LoanNotesCtrl",
				resolve: {
					ctrl: lazyCtrl("loanNotes")
				}
			});

	        $routeProvider.otherwise({redirectTo: '/welcome'});
	    }]
	)

	/** 初始化ngView对象，初始化定义$rootScope相关方法 **/
	.run(['$rootScope', '$config', "$route", "$remote",
	function($rootScope, $config, $route, $remote) {
		
		$rootScope.post2SRV = function(action,formData,callBack,failBack) {
			return $remote.post(action,formData,function(data) {
	            data = $transLate(data);
	            callBack && callBack(data);
	        },failBack,function(data) {
				alert("与服务器连接失败");
			});
	    };
	    
		/**页面跳转统一方法*/
		var flag;
		$rootScope.locate = function(url) {
	    	setTimeout(function() {
	    		flag = true;
	    		if (window.location.hash == url) {
	    	    	$route.reload();
	    	    	$rootScope.$apply();
	    		} else {
	    			window.location.href=url;
	    		}
	    	}, 1);
	    };
	    
	    $rootScope.$on("$locationChangeStart", function(event, next, current) {
	    	/*if (!flag) {
	    		event.preventDefault();
	    		flag = false;
	    		return;
	    	}
	    	flag = false;*/
	    });
	}])

	.controller("BaseCtrl", ["$scope", "$scopeData", function ($scope, $scopeData) {
	}])

	.controller("WelcomeCtrl", ["$scope", "$scopeData", function ($scope, $scopeData) {
	}])
	
	;
	
});
