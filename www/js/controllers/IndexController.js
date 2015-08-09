(function(){
	angular.module('starter')
	.controller('IndexController', ['localStorageService', '$scope', '$state', IndexController]);
	
	function IndexController(localStorageService, $scope, $state){

		$scope.login = function(){

			var username = $scope.username;
			localStorageService.set('username', username);
			$state.go('app');

		};

	}

})();