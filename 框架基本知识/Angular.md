Angular
=======

如何在浏览器上创造良好的动态应用程序，之前的做法像JQuery，它是一个类库，全局变量。JavaScript代码在需要的时候可以引用它。又或者像durandal，ember这样的框架，它们完全掌控了你的代码。
AngularJS通过directive给页面创建新的语法特性，如`ng-repeat, form-validation` 等等。

### Data-binding
以前用模板语言编写的网页是将模板和Model组合在一起，然后生成View。但是之后视图的变化或者Model数据的变化就需要另外自己写代码去实现了。但是AngularJS中，无论是视图还是Model数据发生了变化，它们都能自动地更新对方的数据。因为视图只是模型层的一个映射，控制器和视图是完全分离的。

### Controller
控制器通过`ng-controller`指令链接到DOM元素上。Angular会使用指定的这个Controller的构造函数初始化一个Controller对象。一个新的子作用域会被创建出来并且可以通过injectable参数$scope来访问。

### Dependency Injection

Angular的注入器系统（injector）负责组件的创建，解决它们的依赖以及将它们提供给其他组件调用。

```
angular.module('myModule',[])
.factory('serviceId',['depService', function(depService) {
}])
.directive('directiveName',['depService', function(depService){
}])
.filter('filterName',['depService',function(depService){
}]);
```

service, directive, filter 都是通过一个工厂函数来创建的。


```
someModule.controller('MyController',[$scope', 'dep1', 'dep2', function($scope,dep1,dep2){

}]);
```

controller的工厂函数可以引用多个DI。

为什么要用DI？

有三种方式可以让一个组件获取对它依赖的引用：
1. 组件内部创建依赖，比如new Service()。
2. 组件可以通过全局变量去查询依赖。
3. 组件可以在需要的时候让依赖通过参数传递进来。

前面两种方式就会写把依赖在组件内容写死，这样也就无法做自定义了。比如在自动化测试的时候需要把mock依赖传进来，但是其他情况下却不需要这么做。
每一个angular程序都有一个injector，injector用来创建并查找依赖的service locator（服务定位模式）。

### Directive
directive是一种DOM元素上的标记，用来告诉AngularJS的Compiler将特定的行为链接到DOM元素之上，或者干脆直接转换DOM元素和它的自元素。
有四种directive的声明方式：
* element names（E）
* attributes（A）
* class names（C）
* comments（M）

若要创建能够操作DOM视图的directive 可以使用link函数。
```
function link(scope, element, attrs, controller, transcludeFn) { ...}
```

### Component

在Angular中，Component是一个特殊的directive。
```
angular.module('heroApp',[])
.controller('MainCtrl', function MainCtrl(){
    this.hero = {
        name: 'Spawn'
    }
}

angular.module('heroApp').component('heroDetail', {
    templateUrl: 'heroDetail.html',
    bindings: {
        hero: '='
    }
});
    
```

### Providers

一个应用程序里面应该有许多的对象组合在一起分工合作，这些对象需要被链接在一起才能正常工作。在AngularJS里面，这些工作是由injector service来完成的。
Injector会创建两个类型的对象，services和specialized objects。Injector必须要知道如何去创建这些对象。

```
myApp.provider('unicornLauncher', function UnicornLauncherProvider() {
    var useTinfoilShielding = false;
    
    this.useTinfoilShielding = function(value) {
        useTinfoilShielding = !!value;
    }
    
    this.$get = ["apiToken", function unicornLauncherFactory(apiToken) {
        return new unicornLauncher(apiToken, useTinfoilShielding);
    }];
    
});
```
