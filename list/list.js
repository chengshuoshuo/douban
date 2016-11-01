(function() {


    var listModule = angular.module('doubanApp.listModule', ['toubanApp.service']);
    listModule.config(['$routeProvider',function($routeProvider){
        $routeProvider.
        when('/:category/:page?',{
            templateUrl:'list/list.html',
            controller:'ListController'
        })
    }])
    listModule.controller('ListController', ['$timeout', '$scope', '$http', 'JsonpService','$route','$routeParams','$rootScope','appConfig', function($timeout, $scope, $http, JsonpService,$route,$routeParams,$rootScope,appConfig) {
        $rootScope.category=$routeParams.category;
        // $scope.subjects = subjects;
        console.log($routeParams.category);

        // $rootScope.search = function  () {
        //     $route.updateParams({category:'search',q:$rootScope.input});
        // }
        console.log($rootScope.input)
        var count=appConfig.pageCount;
        //当前页码
        var currentPage=parseInt($routeParams.page || 1);
        $scope.currentPage=currentPage;
        var start=(currentPage  -1)*count;

        //跨域请求豆瓣数据
        JsonpService.jsonp(appConfig.listUrl+$routeParams.category, { count: count, start: start,q:$routeParams.q}, function(res) {
            console.log(res);
            $scope.subjects = res.subjects;
            //数据标题
            $scope.title=res.title;
            //数据总条数
            $scope.total = res.total;
            $scope.totalPage=Math.ceil($scope.total/count);

             $scope.pageConfig = {total:$scope.totalPage,current:currentPage,show:6,click:function  (index) {  
                console.log(index);
                $route.updateParams({page:index})
                $route.reload();
            }};

            $scope.$apply();

            $scope.hundlePage=function(page){
                page=Math.min(Math.max(page,1),$scope.totalPage);
                $route.updateParams({page:page})
            }
        });

    }])

})()
