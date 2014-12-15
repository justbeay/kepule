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
            },
            "angular-cookies": {
                deps: ["angular"]
            },
            'cryptojs-core': {
	            exports: "CryptoJS"
	        },
	        'cryptojs-hmac': {
	            deps: ['cryptojs-core'],
	            exports: "CryptoJS"
	        },
	        'cryptojs-sha256': {
	            deps: ['cryptojs-core', 'cryptojs-hmac'],
	            exports: "CryptoJS"
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
            "angular-cookies": "lib/angular-cookies/angular-cookies.min",
            "cryptojs-core": "lib/crypto/build/components/core-min",
            "cryptojs-hmac": "lib/crypto/build/components/hmac-min",
            "cryptojs-sha256": "lib/crypto/build/components/sha256-min",
			/**
			 * angular module
			 */
			base: "module/base",
			component: "module/component",
			config: "module/config",
			service: "module/service",
			dict: "module/dict",
			common: "module/common",
			/**
			 * controller
			 */
			applyLoan: "controller/applyLoan/applyLoan",
			loanList: "controller/myLoan/loanList",
			loanNotes: "controller/applyLoan/loanNotes",
			login: "controller/user/login",
			todoList: "controller/todoList/todoList",
			searchTodo: "controller/todoList/searchTodo",
			addTodo: "controller/todoList/addTodo",
			editTodo: "controller/todoList/editTodo",
			viewTodo: "controller/todoList/viewTodo",
			userList: "controller/user/userList",
			addUser: "controller/user/addUser",
			editUser: "controller/user/editUser",
			viewUser: "controller/user/viewUser",
			groupList: "controller/group/groupList",
			addGroup: "controller/group/addGroup",
			editGroup: "controller/group/editGroup",
			viewGroup: "controller/group/viewGroup",
			deleteGroup: "controller/group/deleteGroup"
		}
	});

	require(["angular", "base"], function(angular, base) {
		angular.bootstrap(document, ["ngView"]);
	});
	
})(require, define);