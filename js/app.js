(function(require, define) {
	/**
	 * dev开发 pro生产
	 */
	var mode = "dev";
	
	require.config({
	    baseUrl: "js/" + mode,
        shim: {
            angular: {
                exports: "angular",
                deps: ["jquery"]
            },
            "angular-route": {
                deps: ["angular"]
            }
        },
		paths: {
			/**
			 * lib
			 */
			es5: "lib/es5/es5-shim.min",
			json3: "lib/json3/lib/json3.min",
			spin: "lib/spin/spin",
			jquery: "lib/jquery/dist/jquery.min",
			angular: "lib/angular/angular.min",
            "angular-route": "lib/angular-route/angular-route.min",
			/**
			 * angular module
			 */
			base: "module/base",
			component: "module/component",
			config: "module/config",
			service: "module/service",
			/**
			 * controller
			 */
			applyLoan: "controller/applyLoan/applyLoan",
			loanList: "controller/myLoan/loanList",
			loanNotes: "controller/applyLoan/loanNotes"
		}
	});

	require(["angular", "base"], function(angular, base) {
		angular.bootstrap(document, ["ngView"]);
	});
	
})(require, define);