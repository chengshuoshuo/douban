(function () {
	
	/**
	* hotModule Module
	*
	* Description
	*/
	var top250Module = angular.module('doubanApp.top250Module', []);
	top250Module.controller('Top250Controller', ['$scope','$rootScope', function($scope,$rootScope){
		$rootScope.category='top250';
	}])

})()