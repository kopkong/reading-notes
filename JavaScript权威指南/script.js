/**
 * Created by colin on 2017/6/27.
 */

const assert = require('assert');

assert(2 + '1' === '21');
assert('2' + 1 === '21', 'not equal to 21');
assert([] + '1');
assert({} + {});
assert({} + '1');

// 赋值运算符
var i = j = k = 1;
assert(i===1);

// 严格模式
(function fun(a,b){
    'use strict';
    // console.log(arguments);
    // console.log(arguments.caller);
    // console.log(arguments.callee);
})(1,2,3);

// Object create
var obj1 = Object.create(null);
// var obj2 = Object.create(); 这个会报错。
var obj3 = Object.create({});

// inherit
var parent = { x : 'parent.x', z: 'parent.z'};
var child = Object.create(parent);
parent.y = 'parent.y'; child.y = 'child.y';
child.x  = 'child.x';

assert(child.z === 'parent.z');

// 定义属性
var objP = {x:1};
Object.defineProperties(objP, {
    x   : { value: 'x', writable: false, configurable: false},
    y   : { value: 'y', writable: true, configurable: true, enumerable: true},
    fun : { value: function(){
        return this.x + this.y;
    }, configurable: false, enumerable: false}
});

objP.x = 10;
objP.fun = 100;
objP.y = 'yy';
// console.log(objP);
assert(Object.getOwnPropertyDescriptor(objP,'fun').writable === false);
assert(objP.fun() === 'xyy');

console.log(Object.prototype.toString.call(new Date()));
console.log(Object.prototype.toString.call(new Array()));

// define functions
// B(111);
var B = function(b){
    console.log(b);
};

(function() {
    // 模块代码
    // 这个模块所使用的所有变量都是局部变量
    // 而不是污染全局命名空间
    var v = 'localVar';
    console.log(v);
}());

function constfuncs() {
    var funcs = [];
    for(var i = 0; i < 10; i++){
        funcs[i] = function() { return i;}
    }
    return funcs;
}

var funcs = constfuncs();
console.log(funcs[5]());

var scope = "global";
function consFunction(){
    var scope = "local";
    return new Function("return scope"); // 无法在这里捕获局部作用域
}
// consFunction()(); // 这里返回的是global

// constructor
var F = function() {};
var o = new F();

assert( F.prototype.constructor === F);
assert( o.constructor === F);

var Animal = function(name){
    this.name = name;
};

Animal.prototype.eat = function(food) {
    console.log(this.name + ' is eating ' + food);
};

Animal.prototype.run = function() {
    console.log(this.name + ' is running');
};

Object.defineProperties(Animal,{
    MAX_SIZE: {
        value: 100, configurable: false, writable: false
    },
    GET_CAT: {
        value: new Animal('Cat'), configurable: false, writable: false
    }
});

Animal.GEN_CAT = function(){
    return new Animal('Cat');
};

var cat = Animal.GET_CAT;
cat.eat('fish');
cat.run();
assert( cat instanceof Animal);

var cat2 = Animal.GET_CAT;
// console.log(cat === cat2);

var cat3 = new Animal('Cat');
// console.log(cat === cat3);

var cat4 = Animal.GEN_CAT();
// console.log(cat === cat4);

var s = new String('  aaa  ');

// String.prototype.trim
String.prototype.trim = function(){
    return this.replace(/^\s+|\s+$/g,'');
};

// console.log(s.trim().length);
// console.log(s.length);

console.log([].constructor);
console.log(new Date().constructor);

var Set = (function namespace(){
    function Set() { // 这是构造函数
        this.values = {};
        this.n = 0;
    }

    // 为原型添加方法
    Set.prototype.size = function(){ return this.n;};
    Set.prototype.add  = function(){ this.n++;};

    // 私有函数
    function val(v){
        console.log(v);
    }

    return Set;
}());

var Global = {};

(function myModule(globalObject){
    function myModule(){
        this.name = 'myModule';
    }

    myModule.prototype.method = function(){};

    globalObject['myModule'] = myModule;

}(Global));

console.log(Global);

// 解构
let [x,y] = [1,2]; // x = 1, y =2
function returnTwoValue(a,b){
    return [a+b, a-b];
}
let result = returnTwoValue(10,5); // result = [15, 5]

console.log(result);
