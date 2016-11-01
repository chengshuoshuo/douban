(function () {
	
	var doubanApp=angular.module('doubanApp',['ngRoute','doubanApp.detail','doubanApp.listModule']);
	doubanApp.config(['$routeProvider',function($routeProvider){
		$routeProvider.
		otherwise({
			redirectTo:'/in_theaters',
		})
	}])
	doubanApp.constant('appConfig',{
		listUrl:'https://api.douban.com/v2/movie/',
		detaUrl:"https://api.douban.com/v2/movie/subject/",
		pageCount:5
	})
    doubanApp.directive('search', ['$route','$routeParams','$location','$timeout',function($route,$routeParams,$location,$timeout){
        // Runs during compile
        return {
            // scope:{},
            replace:true,
            template: '<form  ng-submit="search()" class="navbar-form navbar-right">\
                    <input ng-model="input" type="text" class="form-control" placeholder="Search...">\
                </form>',
            link: function($scope, iElm, iAttrs, controller) {
                
                $scope.search = function  () {

                    if ($routeParams.category) {
                        console.log($routeParams.category);
                        console.log('列表页');
                        $route.updateParams({category:'search',q:$scope.input});
                    }else{

                        // console.log($routeParams);
                        $location.path('search');
                        console.log($location);
                        console.log('详情页');
                        console.log($routeParams.category);
                        $timeout(function  () {
                            $route.updateParams({category:'search',q:$scope.input});
                        },0)
                        
                    }
                    
                    
                }
            }
        };
    }]);


    doubanApp.directive('page',function(){
    	return{
    		replace:true,
    		template:'<ul class="pagination"></ul>',
    		link:function($scope,iElm,iAttrs,controller){
    			$scope.$watch('pageConfig', function(n) {
                    if (n) {
                        var total = n.total;
                        var show = n.show;
                        var current = n.current;
                        console.log(n);
                        var region = Math.floor(show / 2); // 5

                        //左右俩边数字的个数
                        var begin = current - region;

                        //开始值最小是1
                        begin = Math.max(1, begin);

                        var end = begin + show;
                        //
                        if (end > total) { // 31 > 30
                            end = total + 1; // end = 31
                            begin = end - show //31 - 7 = 24     24,25,26,27,28,29,30
                            begin = Math.max(1, begin);
                        }
                        var pagination = iElm[0];
                        for (var i = begin; i < end; i++) {
                            var li = document.createElement('li');
                            li.innerHTML = '<a>' + i + '</a>';
                            if (i == current) {
                                //增加一个样式
                                li.classList.add('active');
                            }
                            li.index = i;
                            pagination.appendChild(li);

                            li.onclick = function  () {
                                // alert(this.index);
                                //调用方法
                                n.click(this.index)
                            }
                        }

                    }
                })
    		}
    	}
    })

})();