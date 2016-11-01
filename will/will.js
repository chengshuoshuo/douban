(function () {
	
	/**
	* hotModule Module
	*
	* Description
	*/
	var willModule = angular.module('doubanApp.willModule', []);
	willModule.controller('WillController', ['$scope','$rootScope', function($scope,$rootScope){
		$rootScope.category='coming_soon';
	}])

})()