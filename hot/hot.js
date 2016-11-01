(function() {

    /**
     * hotModule Module
     *
     * Description
     */
    var hotModule = angular.module('doubanApp.hotModule', ['toubanApp.service']);
    hotModule.controller('HotController', ['$timeout', '$scope', '$http', 'JsonpService','$route','$routeParams','$rootScope', function($timeout, $scope, $http, JsonpService,$route,$routeParams,$rootScope) {
        $rootScope.category='in_theaters';
        // $scope.subjects = subjects;
        var count=5;
        //当前页码
        var currentPage=parseInt($routeParams.page || 1);
        $scope.currentPage=currentPage;
        var start=(currentPage  -1)*count;

        //跨域请求豆瓣数据
        JsonpService.jsonp('https://api.douban.com/v2/movie/in_theaters', { count: count, start: start}, function(res) {
            console.log(res);
            $scope.subjects = res.subjects;
            //数据标题
            $scope.title=res.title;
            //数据总条数
            $scope.total = res.total;
            $scope.totalPage=Math.ceil($scope.total/count);

            $scope.$apply();

            $scope.hundlePage=function(page){
                page=Math.min(Math.max(page,1),$scope.totalPage);
                $route.updateParams({page:page})
            }
        });

        /*
        setTimeout(function() {
            $scope.name = 'zhangsan';
            //告诉 angular 刷新界面上的数据
            $scope.$apply();
        }, 3000)

        //angular 会自动同步界面上的数据
        $timeout(function() {
            $scope.name = 'zhangsan';
        }, 3000);
        */
    }])

})()
