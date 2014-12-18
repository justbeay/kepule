define(["cryptojs-sha256", "xlsx"], function(crypto, xlsx) {
	return ["addUserCtrl", ["$scope", "$rootScope", "$config", "$dict", "$location", "$http", "$restful", "$common", function($scope, $rootScope, $config, $dict, $location, $http, $restful, $common) {
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
		$scope.checkUploadFile = function(){
			if(!$scope.uploadFile){
				return {
					flag: "error",
					msg: "上传文件不能为空"
				};
			}else{
				var fileExt = $scope.uploadFile.name.split('.').length>=2 ? $scope.uploadFile.name.split('.')[1] : '';
				if(fileExt!='xlsx'){
					return {
						flag: "error",
						msg: "上传文件必须为xlsx格式"
					};
				}else{
					getUserListFromFile();
					return {
						flag: "tip",
						msg: "请指定上传文件"
					}
				}
			}
		};
		$scope.checkLoginId = function(){ return $common.checkField("登录名", $scope.loginId, true); }
		$scope.checkName = function() { return $common.checkField("姓名", $scope.name, true); };
		$scope.checkPassword = function() { return $common.checkField("密码", $scope.password, true); };
		$scope.checkPasswordAgain = function() {
			if(!$scope.passwordAgain) {
				return {
					flag: "error",
					msg: "重复秘密不能为空"
				};
			} else {
				if($scope.passwordAgain != $scope.password){
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

		function parseDictValue(dict, value){
			if(!dict) return null;
			for(var i=0; i<dict.length; i++){
				if(dict[i].name == value){
					return dict[i].id;
				}
			}
			return null;
		}

		function updateUserInfo(userInfo, cellValue, column){
			switch(column){
			case $rootScope.template.addUser.loginId:
				userInfo.loginId = cellValue;
				break;
			case $rootScope.template.addUser.password:
				userInfo.password = cellValue;
				break;
			case $rootScope.template.addUser.status:
				userInfo.status = parseDictValue($dict.statusInfo, cellValue);
				break;
			case $rootScope.template.addUser.email:
				userInfo.email = cellValue.match(/^[a-zA-Z0-9_-]+@[a-z0-9]+\.[a-z]{2,3}(\.[a-z]{2,3})?$/)
							? cellValue : null;
				break;
			case $rootScope.template.addUser.group:
				userInfo.group = parseDictValue($scope.groupInfoList, cellValue);
				break;
			case $rootScope.template.addUser.role:
				userInfo.role = parseDictValue($dict.roleInfo, cellValue);
				break;
			case $rootScope.template.addUser.position:
				userInfo.position = parseDictValue($dict.positionInfo, cellValue);
				break;
			case $rootScope.template.addUser.sex:
				userInfo.sex = parseDictValue($dict.sexInfo, cellValue);
				break;
			case $rootScope.template.addUser.idNo:
				userInfo.idNo = cellValue;
				break;
			case $rootScope.template.addUser.birthday:
				userInfo.birthday = $common.parseToDate(cellValue, 'yyyy-MM-dd');
				break;
			case $rootScope.template.addUser.nativeplace:
				userInfo.nativeplace = cellValue;
				break;
			case $rootScope.template.addUser.residenceType:
				userInfo.residenceType = parseDictValue($dict.residenceTypeInfo, cellValue);
				break;
			case $rootScope.template.addUser.nation:
				userInfo.nation = cellValue;
				break;
			case $rootScope.template.addUser.marital:
				userInfo.marital = parseDictValue([{id:true, name:"已婚"}, {id: false, name:"未婚"}], cellValue);
				break;
			case $rootScope.template.addUser.political:
				userInfo.political = cellValue;
				break;
			case $rootScope.template.addUser.education:
				userInfo.education = cellValue;
				break;
			case $rootScope.template.addUser.graduated:
				userInfo.graduated = cellValue;
				break;
			case $rootScope.template.addUser.major:
				userInfo.major = cellValue;
				break;
			case $rootScope.template.addUser.graduationTime:
				userInfo.graduationTime = cellValue;
				break;
			case $rootScope.template.addUser.experience:
				userInfo.experience = cellValue;
				break;
			case $rootScope.template.addUser.contractBeginDate:
				userInfo.contractBeginDate = $common.parseToDate(cellValue, 'yyyy-MM-dd');
				break;
			case $rootScope.template.addUser.contractEndDate:
				userInfo.contractEndDate = $common.parseToDate(cellValue, 'yyyy-MM-dd');
				break;
			case $rootScope.template.addUser.phoneno:
				userInfo.phoneno = cellValue;
				break;
			case $rootScope.template.addUser.address:
				userInfo.address = cellValue;
				break;
			default: break;
			}
			return userInfo;
		}
		function validateUserInfo(userInfo, row){
			var requiredFields = ["loginId", "name", "password", "status", "email", "group", "role", "position"];
			$scope.validation = {};
			for(var key in userInfo){
				if(userInfo[key] == null){
					$scope.validation.row = row;
					$scope.validation.error = "format";
					$scope.validation.key = key;
					return false;
				}else if(userInfo[key] == ""){
					for(var i=0; i<requiredFields.length; i++){
						if(requiredFields[i] == key){
							$scope.validation.row = row;
							$scope.validation.error = "required";
							$scope.validation.key = key;
							return false;
						}
					}
				}
			}
			return true;
		}
		function getUserListFromFile(){
			var fileName = $scope.uploadFile.name;
			var reader = new FileReader();
			reader.onload = function(e) {
				var data = e.target.result;
				var workbook = xlsx.read(data, {type: 'binary'});
				var sheet_name_list = workbook.SheetNames;
				sheet_name_list.forEach(function(sheet_name) {
					var worksheet = workbook.Sheets[sheet_name];
					var range = worksheet['!ref'].split(':'); // 获取sheet表格的范围
					var maxRow = parseInt(range[1].substr(1));
					var maxCol = range[1].charCodeAt(0)-'A'.charCodeAt(0)+1;
					var startRow = $rootScope.template.addUser._rowBegin;
					$scope.userInfoList = new Array();
					for(var i=startRow; i<=maxRow; i++){
						userInfo = {};
						for(var j=1; j<=maxCol; j++){
							var cell = String.fromCharCode(j+'A'.charCodeAt(0)-1)+i;
							var value = worksheet[cell] ? (worksheet[cell].v+'').trim() : '';
							updateUserInfo(userInfo, value, j);
						}
						if(!validateUserInfo(userInfo, i)) break;
						$scope.userInfoList.push(userInfo);
					}
				});
			};
			reader.readAsBinaryString($scope.uploadFile);
		}
		$scope.back = function() {
			$location.path("userList");
		};
		$scope.submitViaFile = function() {
			if($scope.loginInfo.loginRole != '9'){
				alert('Permission denied');
				return;
			}
			if($scope.validation.key){
				alert("第" +$scope.validation.row + "行" + $scope.validation.key + "字段" +
					($scope.validation.error=="format" ? "格式有误" : "不能为空") + "，请检查");
			}else{
				for(var i=0; i<$scope.userInfoList.length; i++){
					var userInfo = $scope.userInfoList[i];
					console.log(userInfo);
					$restful.post("/api/user", userInfo, function(data){  //url request for production
//					$restful.post("/test/todo/addUser.php", $scope.UserInfo, function(data){  //url request for testing
						alert('用户 '+userInfo.name+' 添加成功');
					}, function(data){
						alert('用户 '+userInfo.name+' 添加失败: '+(data ? data : ''));
					});
				}
			}
		};
		$scope.submitViaInput = function() {
			if($scope.loginInfo.loginRole != '9'){
				alert('Permission denied');
				return;
			}
			var password = crypto.SHA256($scope.password).toString();
			password = crypto.HmacSHA256(password, $config.encrySeed).toString();

			$scope.UserInfo = {
				loginId: $scope.loginId,
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
			$restful.post("/api/user", $scope.UserInfo, function(data){  //url request for production
//			$restful.post("/test/todo/addUser.php", $scope.UserInfo, function(data){  //url request for testing
				alert('用户添加成功');
				$location.path('userList');
			});
		};
	}]];
});