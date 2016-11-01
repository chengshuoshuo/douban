(function () {
	
	var doubanApp=angular.module('doubanApp',['ngRoute','doubanApp.hotModule','doubanApp.top250Module','doubanApp.willModule']);
	doubanApp.config(['$routeProvider',function($routeProvider){
		$routeProvider.
		when('/hot/:page?',{
			templateUrl:'hot/hot.html',
			controller:'HotController',
		}).
		when('/will',{
			templateUrl:'will/will.html',
			controller:'WillController',
		}).
		when('/top250',{
			templateUrl:'top250/top250.html',
			controller:'Top250Controller',
		}).
		otherwise({
			redirectTo:'hot',
		})
	}])

})();