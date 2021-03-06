angular.module('dutyModule', [])
.controller('dutyFormController',['$rootScope','$scope','$state','$stateParams','DutyService',
          
    function($rootScope,$scope,$state,$stateParams,DutyService){
		
    $scope.showSaveAndAddButton = $stateParams.operate == 'add' ?true:false;
	
	$scope.operate = $stateParams.operate;
	
	$scope.getInitData = function(){
		if($scope.operate=='edit'){
			$scope.getDetail();
		}
	}
	$scope.getDetail = function(){

		DutyService.getDutyById($stateParams.dutyId,sucesscb,errorcb);	
		
		function sucesscb(data)
		{
			$scope.duty =data;
		};

		function errorcb(data)
		{
			alert('加载失败');
		};
	}
	
	$scope.saveDuty = function(duty){
		if($scope.operate=='add')
		{
		  $scope.addDuty(duty);
		  
		}else if($scope.operate=='edit'){
			
			$scope.updateDuty(duty);
		}
	}
	
	$scope.addDuty=function(duty){
		DutyService.insertDuty(duty,sucesscb,errorcb);
		function sucesscb(data)
		{
			console.log(data);
			$state.go('main.list.duty.list');
		}
		function errorcb()
		{
			alert('添加失败!');
		}
	}
	$scope.updateDuty=function(duty){
		
		DutyService.updateDuty(duty,sucesscb,errorcb);
		function sucesscb(data)
		{
			//console.log(data);
			$state.go('main.list.duty.list');
		}
		function errorcb()
		{
			alert('添加失败!');
		}
	}
	$scope.saveAndAddDuty=function(duty){
		
		DutyService.insertDuty(duty,sucesscb,errorcb);
		function sucesscb(data)
		{
			if(data.insert){
				$state.go('main.list.duty.form',{operate:'add'});
				$scope.duty='';
			}else{
				alert('添加失败!');
			}
			
		}
		function errorcb()
		{
			alert('添加失败!');
		}
	}
	$scope.returnList=function(){
		$state.go('main.list.duty.list');
	}
}]);