define(["cryptojs-sha256"], function(crypto) {
	return ["editUserCtrl", ["$scope", "$rootScope", "$scopeData", "$dict", "$config", "$location", "$http", "$restful", "$common", 
	function($scope, $rootScope, $scopeData, $dict, $config, $location, $http, $restful, $common) {
		var id = $scopeData.get("id");

		$scope.groupInfoList = [];
		$scope.userPositionInfoList = $dict.positionInfo;
		$scope.userStatusInfoList = $dict.statusInfo;
		$scope.userRoleInfoList = $dict.roleInfo;
		$scope.userSexInfoList = $dict.sexInfo;
		$scope.userResidenceTypeInfoList = $dict.residenceTypeInfo;
		$restful.get("/api/group", function(data) {  //url request for production
//		$restful.get("/test/todo/groupList.php", function(data) {  //url request for testing
			for(var i=0; i<data.length; i++) {
				data[i].id = data[i]._id;
				data[i].name = data[i].type;
				$scope.groupInfoList.push(data[i]);
			}
		});

		$restful.get("/api/user/"+id, function(data){  //url request for production
//		$restful.get("/test/todo/viewUser.php?id="+id, function(data){  //url request for testing
			$scope.id = data._id;
			$scope.loginId = data.loginId;
			$scope.name = data.name;
			$scope.status = data.status;
			$scope.email = data.email;
			$scope.group = data.group._id;
			$scope.role = data.role;
			$scope.position = data.position;
			$scope.sex = data.sex;
			$scope.idNo = data.idNo;
			$scope.birthday = data.birthday;
			$scope.nativeplace = data.nativeplace;
			$scope.residenceType = data.residenceType;
			$scope.nation = data.nation;
			$scope.marital = data.marital.toString();
			$scope.political = data.political;
			$scope.education = data.education;
			$scope.graduated = data.graduated;
			$scope.major = data.major;
			$scope.graduationTime = data.graduationTime;
			$scope.experience = data.experience;
			$scope.contractBeginDate = data.contractBeginDate;
			$scope.contractEndDate = data.contractEndDate;
			$scope.phoneno = data.phoneno;
			$scope.address = data.address;
		});

		$scope.checkPassword = function() {
			return {
				flag: "tip",
				msg: "请输入密码"
			}
		};
		$scope.checkPasswordAgain = function() {
			if(!$scope.passwordAgain && !!$scope.password) {
				return {
					flag: "error",
					msg: "重复密码不能为空"
				};
			} else {
				if((!!$scope.password && $scope.passwordAgain!=$scope.password) 
					|| (!$scope.password && !!$scope.passwordAgain)){
					return {
						flag: "error",
						msg: "两次密码输入不一致"
					};
				}else{
					return {
						flag: "tip",
						msg: "请再次输入密码"
					}
				}
			}
		};
		$scope.checkName = function() { return $common.checkField("姓名", $scope.name, true); };
		$scope.checkStatus = function() { return $common.checkField("用户状态", $scope.status, true); };
		$scope.checkEmail = function() { return $common.checkField("电子邮件地址", $scope.email, true, /^[a-zA-Z0-9_-]+@[a-z0-9]+\.[a-z]{2,3}(\.[a-z]{2,3})?$/); };
		$scope.checkGroup = function() { return $common.checkField("项目组", $scope.group, true); };
		$scope.checkRole = function() { return $common.checkField("用户角色", $scope.role, true); };
		$scope.checkPosition = function() { return $common.checkField("岗位", $scope.position, true); };
		$scope.checkSex = function(){ return $common.checkField("性别", $scope.sex); }
		$scope.checkIdNo = function(){ return $common.checkField("证件号", $scope.idNo); }
		$scope.checkBirthday = function(){ return $common.checkField("生日", $scope.birthday); }
		$scope.checkNativeplace = function(){ return $common.checkField("籍贯", $scope.nativeplace); }
		$scope.checkResidenceType = function(){ return $common.checkField("户口性质", $scope.residenceType); }
		$scope.checkNation = function(){ return $common.checkField("民族", $scope.nation); }
		$scope.checkMarital = function(){ return $common.checkField("婚否", $scope.marital); }
		$scope.checkPolitical = function(){ return $common.checkField("政治面貌", $scope.political); }
		$scope.checkEducation = function(){ return $common.checkField("学历", $scope.education); }
		$scope.checkGraduated = function(){ return $common.checkField("毕业院校", $scope.graduated); }
		$scope.checkMajor = function(){ return $common.checkField("专业", $scope.major); }
		$scope.checkGraduationTime = function(){ return $common.checkField("毕业时间", $scope.graduationTime); }
		$scope.checkExperience = function(){ return $common.checkField("工作年限", $scope.experience); }
		$scope.checkContractBeginDate = function(){ return $common.checkField("合同起始日期", $scope.contractBeginDate); }
		$scope.checkContractEndDate = function(){ return $common.checkField("合同终止日期", $scope.contractEndDate); }
		$scope.checkPhoneno = function(){ return $common.checkField("手机号码", $scope.phoneno); }
		$scope.checkAddress = function(){ return $common.checkField("住址", $scope.address); }
		
		$scope.back = function() {
			$location.path("userList");
		};
		$scope.submit = function() {
			if($rootScope.loginInfo.loginRole != '9'){
				alert('Permission denied');
				return;
			}
			var password = crypto.SHA256($scope.password).toString();
			password = crypto.HmacSHA256(password, $config.encrySeed).toString();

			$scope.UserInfo = {
				name: $scope.name,
				password: password,
				status: $scope.status,
				email: $scope.email,
				group: $scope.group,
				role: $scope.role,
				position: $scope.position,
				sex: $scope.sex,
				idNo: $scope.idNo,
				birthday: $scope.birthday,
				nativeplace: $scope.nativeplace,
				residenceType: $scope.residenceType,
				nation: $scope.nation,
				marital: $scope.marital=='true',
				political: $scope.political,
				education: $scope.education,
				graduated: $scope.graduated,
				major: $scope.major,
				graduationTime: $scope.graduationTime,
				experience: $scope.experience,
				contractBeginDate: $scope.contractBeginDate,
				contractEndDate: $scope.contractEndDate,
				phoneno: $scope.phoneno,
				address: $scope.address
			};
			$restful.put("/api/user/"+id, $scope.UserInfo, function(data){  //url request for production
//			$restful.post("/test/todo/editUser.php", $scope.UserInfo, function(data){  //url request for testing
				alert('用户添加成功');
				$location.path('userList');
			});
		};
	}]];
});